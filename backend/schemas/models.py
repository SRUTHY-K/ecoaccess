from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    query: str
    context: str

class FeedbackRequest(BaseModel):
    text: str

class EventConfig(BaseModel):
    eventTitle: str
    eventSubtitle: str
    baseBudget: float
    mapNodes: list

class CredentialsConfig(BaseModel):
    apiMode: str
    apiKey: str = ""
    gcpProjectId: str = ""
    gcpLocation: str = ""
    showLogViewer: Optional[bool] = True

class LogEntryRequest(BaseModel):
    level: str
    component: str
    action: str
    details: str
    error: Optional[str] = None

