import urllib.request
import json
import time

def test_endpoint(url, data=None, method="GET"):
    headers = {"Content-Type": "application/json"}
    req_data = json.dumps(data).encode("utf-8") if data else None
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            body = res.read().decode("utf-8")
            return json.loads(body)
    except Exception as e:
        print(f"Error testing {url}: {e}, heii")
        return None

def verify_all():
    print("Waiting 3 seconds for backend server to warm up...")
    time.sleep(3)
    
    # 1. Test Config
    print("\n--- Testing /api/config ---")
    config = test_endpoint("http://localhost:8000/api/config")
    if config:
        print(f"Success! Event Title: {config.get('eventTitle')}")
    else:
        print("Failed to fetch event configuration.")

    # 2. Test Carbon Prediction
    print("\n--- Testing BigQuery ML /api/predictions/carbon ---")
    carbon = test_endpoint("http://localhost:8000/api/predictions/carbon?renewables=50&transit=60&recycling=40&attendance=60000")
    if carbon:
        print(f"Success! BigQuery ML Carbon Footprint: {carbon.get('carbonFootprint')} t CO2e")
    else:
        print("Failed BigQuery ML Carbon prediction.")

    # 3. Test Energy Forecast
    print("\n--- Testing BigQuery ML ARIMA /api/predictions/energy ---")
    energy = test_endpoint("http://localhost:8000/api/predictions/energy")
    if energy:
        print("Success! BigQuery ML ARIMA Energy Demand Forecast:")
        print(energy.get("forecast")[:3])
    else:
        print("Failed BigQuery ML ARIMA Energy forecast.")

    # 4. Test RAG / Copilot Chat
    print("\n--- Testing Gemini + RAG /api/chat ---")
    chat_payload = {
        "query": "What is the procedure for an elevator breakdown at Gates serving mobility zones?",
        "context": "EcoAccess Command Center venue context."
    }
    chat_res = test_endpoint("http://localhost:8000/api/chat", data=chat_payload, method="POST")
    if chat_res:
        print("Success! Gemini response:")
        print(chat_res.get("text")[:200] + "...")
        print("RAG Snippet matched:")
        print(chat_res.get("ragSnippet"))
    else:
        print("Failed Chat endpoint.")

    # 5. Test Multilingual Translation
    print("\n--- Testing Translation /api/translate ---")
    translate_payload = {
        "text": "No hay rampas cerca del estacionamiento norte, tuve que dar una vuelta enorme en mi silla de ruedas."
    }
    trans_res = test_endpoint("http://localhost:8000/api/translate", data=translate_payload, method="POST")
    if trans_res:
        print("Success! Translated feedback:")
        print(json.dumps(trans_res, indent=2))
    else:
        print("Failed translation analysis.")

if __name__ == "__main__":
    verify_all()
