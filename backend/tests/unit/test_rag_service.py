from unittest.mock import patch
from services.rag_service import add_document_to_rag, query_rag_manual
from core.database import vector_db

@patch("services.rag_service.generate_text_embedding")
def test_add_document_local_memory_fallback(mock_embedding, clean_local_db):
    mock_embedding.return_value = [0.1] * 768
    
    add_document_to_rag("doc-x", "Title X", "Accessibility policy text")
    assert len(vector_db) == 1
    assert vector_db[0]["id"] == "doc-x"
    assert vector_db[0]["title"] == "Title X"
    assert vector_db[0]["text"] == "Accessibility policy text"
    assert vector_db[0]["embedding"] == [0.1] * 768

@patch("services.rag_service.generate_text_embedding")
def test_query_rag_manual_local_memory(mock_embedding, clean_local_db):
    # Setup mock vectors with known similarity profile
    # doc1 is aligned on index 0
    doc1_vec = [1.0] + [0.0] * 767
    # doc2 is aligned on index 1
    doc2_vec = [0.0, 1.0] + [0.0] * 766
    
    vector_db.extend([
        {"id": "doc1", "title": "Doc A", "text": "Content A", "embedding": doc1_vec},
        {"id": "doc2", "title": "Doc B", "text": "Content B", "embedding": doc2_vec}
    ])
    
    # Query aligned to doc1 (cosine similarity = 1.0)
    mock_embedding.return_value = [1.0] + [0.0] * 767
    match = query_rag_manual("query matching A")
    assert "DOC A: Content A" in match
    
    # Query with low similarity (< 0.25 threshold)
    mock_embedding.return_value = [0.0, 0.0, 1.0] + [0.0] * 765
    match_low = query_rag_manual("completely different query")
    assert match_low == ""
