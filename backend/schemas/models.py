from pydantic import BaseModel

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
