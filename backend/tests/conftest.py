import os
import sys
import pytest
import tempfile
import shutil

# Ensure backend directory is in PYTHONPATH so tests can import from backend packages
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

# Create a temporary directory for config and credentials files during tests
temp_dir = tempfile.mkdtemp()
test_config = os.path.join(temp_dir, "event_config.json")
test_creds = os.path.join(temp_dir, "credentials_config.json")

# Override core.config paths before other backend imports occur
import core.config
core.config.CONFIG_FILE = test_config
core.config.CREDENTIALS_FILE = test_creds

import api.routes
api.routes.CONFIG_FILE = test_config
api.routes.CREDENTIALS_FILE = test_creds

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

def pytest_sessionfinish(session, exitstatus):
    """Cleanup temporary directory after all tests finish."""
    shutil.rmtree(temp_dir, ignore_errors=True)

