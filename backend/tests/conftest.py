import os
import sys
import pytest

# Ensure backend directory is in PYTHONPATH so tests can import from backend packages
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient

@pytest.fixture
def client():
    from main import app
    return TestClient(app)

@pytest.fixture(autouse=True)
def clean_local_db():
    """Fixture to clear vector_db before each test."""
    from core.database import vector_db
    vector_db.clear()
    yield
    vector_db.clear()
