import os

# PostgreSQL/AlloyDB Client imports
try:
    import psycopg2
    HAS_PSYCOPG2 = True
except ImportError:
    HAS_PSYCOPG2 = False
    print("psycopg2-binary not available. Running RAG index in local memory mode.")

# In-memory vector store fallback for RAG
vector_db = []

def get_db_connection():
    """Establishes connection to AlloyDB/PostgreSQL if env variables are present."""
    if not HAS_PSYCOPG2:
        return None
    db_host = os.environ.get("DB_HOST")
    db_user = os.environ.get("DB_USER")
    db_pass = os.environ.get("DB_PASSWORD")
    db_name = os.environ.get("DB_NAME", "postgres")
    db_port = os.environ.get("DB_PORT", "5432")
    
    if not db_host:
        return None
    try:
        conn = psycopg2.connect(
            host=db_host,
            user=db_user,
            password=db_pass,
            dbname=db_name,
            port=db_port
        )
        return conn
    except Exception as e:
        print(f"Error connecting to AlloyDB/PostgreSQL: {e}")
        return None

def init_db():
    """Initializes pgvector table for document chunks in AlloyDB."""
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            # Enable vector extension
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
            # Create rules table
            cur.execute("""
                CREATE TABLE IF NOT EXISTS sustainability_rules (
                    id VARCHAR(50) PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    text TEXT NOT NULL,
                    embedding vector(768)
                );
            """)
            conn.commit()
            print("AlloyDB pgvector database initialized.")
    except Exception as e:
        print(f"Error initializing pgvector database: {e}")
    finally:
        conn.close()

# Try to initialize DB if connection is present on load
init_db()
