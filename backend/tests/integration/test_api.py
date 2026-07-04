from unittest.mock import patch

def test_get_config(client):
    response = client.get("/api/config")
    assert response.status_code == 200
    data = response.json()
    assert "eventTitle" in data
    assert "eventSubtitle" in data
    assert "mapNodes" in data

def test_save_config(client):
    payload = {
        "eventTitle": "Integration Test Title",
        "eventSubtitle": "Integration Test Subtitle",
        "baseBudget": 50.0,
        "mapNodes": [{"id": "node-t1", "name": "Test Node", "x": 10, "y": 20, "type": "stadium", "alert": "none"}]
    }
    response = client.post("/api/config", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "success"}

@patch("api.routes.predict_carbon_emissions_bq")
def test_get_carbon_prediction(mock_predict, client):
    mock_predict.return_value = 12000.5
    response = client.get("/api/predictions/carbon?renewables=50&transit=50&recycling=50&attendance=60000")
    assert response.status_code == 200
    assert response.json() == {"carbonFootprint": 12000.5}
    mock_predict.assert_called_once_with(50, 50, 50, 60000)

@patch("api.routes.forecast_energy_demand_bq")
def test_get_energy_forecast(mock_forecast, client):
    mock_forecast.return_value = [{"time": "22:00", "value": 410.0}]
    response = client.get("/api/predictions/energy")
    assert response.status_code == 200
    assert response.json() == {"forecast": [{"time": "22:00", "value": 410.0}]}

@patch("api.routes.chat_copilot")
def test_handle_chat(mock_chat, client):
    mock_chat.return_value = {"text": "Hello world", "citations": ["Copilot"]}
    payload = {"query": "How is waste managed?", "context": "Eco context"}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    assert response.json() == {"text": "Hello world", "citations": ["Copilot"]}

@patch("api.routes.translate_and_analyze_feedback")
def test_handle_translate(mock_translate, client):
    mock_translate.return_value = {"translation": "Everything is fine"}
    payload = {"text": "Tout va bien"}
    response = client.post("/api/translate", json=payload)
    assert response.status_code == 200
    assert response.json() == {"translation": "Everything is fine"}

@patch("api.routes.add_document_to_rag")
def test_handle_upload(mock_add_doc, client):
    response = client.post(
        "/api/upload-manual",
        data={"title": "Custom Guideline", "text": "This is a custom guideline text."}
    )
    assert response.status_code == 200
    assert "success" in response.json()["status"]
    mock_add_doc.assert_called_once()

