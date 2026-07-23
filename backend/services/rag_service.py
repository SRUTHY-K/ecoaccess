import os
import math
from core.config import client
from core.database import get_db_connection, vector_db

def generate_text_embedding(text: str) -> list[float]:
    """Generates real vector embeddings using Google Cloud's text-embedding-004 model."""
    try:
        response = client.models.embed_content(
            model="text-embedding-004",
            contents=text,
        )
        return response.embeddings[0].values
    except Exception as e:
        print(f"Embedding error: {e}")
        # Return a dummy vector of 768 dimensions if API fails
        return [0.0] * 768

def add_document_to_rag(doc_id: str, title: str, text: str):
    """Generates embedding for a document chunk and saves it in AlloyDB or the local vector store."""
    embedding = generate_text_embedding(text)
    
    # Try inserting into AlloyDB/PostgreSQL
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute("""
                    INSERT INTO sustainability_rules (id, title, text, embedding)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (id) DO UPDATE 
                    SET title = EXCLUDED.title, text = EXCLUDED.text, embedding = EXCLUDED.embedding;
                """, (doc_id, title, text, embedding))
                conn.commit()
                print(f"Document '{title}' embedded and indexed in AlloyDB RAG index.")
                return
        except Exception as e:
            print(f"AlloyDB insert error, falling back to local memory: {e}")
        finally:
            conn.close()

    # Local fallback
    for item in vector_db:
        if item["id"] == doc_id:
            item["title"] = title
            item["text"] = text
            item["embedding"] = embedding
            return
            
    vector_db.append({
        "id": doc_id,
        "title": title,
        "text": text,
        "embedding": embedding
    })
    print(f"Document '{title}' embedded and indexed in local memory RAG index.")

def query_rag_manual(query: str, limit: int = 1) -> str:
    """Performs cosine-similarity search over AlloyDB pgvector or local memory store using real embeddings."""
    query_emb = generate_text_embedding(query)
    
    # Try querying AlloyDB/PostgreSQL
    conn = get_db_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                # Cosine distance operator <=> returns 1 - similarity. So similarity = 1 - (embedding <=> query_emb)
                cur.execute("""
                    SELECT title, text, 1 - (embedding <=> %s::vector) AS similarity
                    FROM sustainability_rules
                    ORDER BY similarity DESC
                    LIMIT %s;
                """, (query_emb, limit))
                row = cur.fetchone()
                if row:
                    title, text, similarity = row
                    if similarity > 0.25:
                        return f"{title.upper()}: {text}"
                    else:
                        print(f"AlloyDB match below similarity threshold: {similarity}")
                return ""
        except Exception as e:
            print(f"AlloyDB RAG search error, falling back to local memory: {e}")
        finally:
            conn.close()

    # Local memory fallback
    if not vector_db:
        return ""
    
    # Calculate cosine similarity
    matches = []
    for item in vector_db:
        dot_product = sum(a * b for a, b in zip(query_emb, item["embedding"]))
        norm_a = math.sqrt(sum(a * a for a in query_emb))
        norm_b = math.sqrt(sum(b * b for b in item["embedding"]))
        if norm_a == 0 or norm_b == 0:
            similarity = 0
        else:
            similarity = dot_product / (norm_a * norm_b)
        matches.append((similarity, item["text"], item["title"]))
        
    matches.sort(key=lambda x: x[0], reverse=True)
    best_match = matches[0]
    
    # Check threshold (e.g. 0.25)
    if best_match[0] > 0.25:
        return f"{best_match[2].upper()}: {best_match[1]}"
    return ""
