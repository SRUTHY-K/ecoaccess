from unittest.mock import patch, MagicMock
from services.ai_service import translate_and_analyze_feedback, chat_copilot, detect_waste_gemini

@patch("services.ai_service.client")
def test_translate_and_analyze_feedback(mock_client):
    # Mocking successful Gemini response
    mock_response = MagicMock()
    mock_response.text = '{"translation": "No ramps near North parking lot...", "sentiment": "negative", "urgency": "high", "category": "Accessibility"}'
    mock_client.models.generate_content.return_value = mock_response

    result = translate_and_analyze_feedback("No hay rampas cerca del estacionamiento norte...")
    assert result["translation"] == "No ramps near North parking lot..."
    assert result["sentiment"] == "negative"
    assert result["urgency"] == "high"
    assert result["category"] == "Accessibility"

@patch("services.ai_service.client")
@patch("services.ai_service.query_rag_manual")
def test_chat_copilot(mock_query_rag, mock_client, clean_local_db):
    mock_query_rag.return_value = "ACCESSIBILITY RULE 4.2.1: Use auxiliary ramps."
    
    mock_response = MagicMock()
    mock_response.text = "According to policy, you must reroute passengers to auxiliary ramp structures."
    mock_client.models.generate_content.return_value = mock_response

    result = chat_copilot("What to do if elevators break?", "Some context")
    assert "reroute passengers" in result["text"]
    assert result["citations"] == ["AlloyDB pgvector Index", "Vertex AI Copilot"]
    assert result["ragSnippet"] == "ACCESSIBILITY RULE 4.2.1: Use auxiliary ramps."

@patch("services.ai_service.client")
def test_detect_waste_gemini(mock_client):
    mock_response = MagicMock()
    mock_response.text = '{"contaminationDetected": true, "contaminationDetail": "Plastic in compost", "fillLevel": 85, "status": "overflowing"}'
    mock_client.models.generate_content.return_value = mock_response

    result = detect_waste_gemini(b"fake_image_bytes", "image/png")
    assert result["contaminationDetected"] is True
    assert result["contaminationDetail"] == "Plastic in compost"
    assert result["fillLevel"] == 85
    assert result["status"] == "overflowing"
