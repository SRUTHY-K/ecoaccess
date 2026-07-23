import json
from google.genai import types
from core.config import client
from services.rag_service import query_rag_manual

def translate_and_analyze_feedback(feedback_text: str) -> dict:
    """Uses real Gemini-2.5-Flash to translate, analyze sentiment/urgency, and categorize feedback."""
    prompt = f"""
    Analyze the following spectator feedback:
    "{feedback_text}"
    
    Please perform:
    1. Translate to English (if it is not English).
    2. Sentiment analysis (output 'positive', 'negative', or 'neutral').
    3. Urgency classification (output 'high', 'medium', or 'low').
    4. Categorize it (must be one of: 'Accessibility', 'Energy', 'Inclusivity', 'Waste').
    
    Format the output strictly as a JSON object with keys:
    "translation", "sentiment", "urgency", "category"
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Translation error: {e}")
        from core.config import get_credentials
        if get_credentials().get("apiMode") != "mock":
            raise e
        return {
            "translation": feedback_text,
            "sentiment": "neutral",
            "urgency": "medium",
            "category": "Inclusivity"
        }

def chat_copilot(query: str, system_context: str) -> dict:
    """Chats with Gemini using contextual RAG information and system event config."""
    # Find matching context from AlloyDB/RAG vector index
    rag_context = query_rag_manual(query)
    
    full_prompt = f"""
    Event Configuration Context:
    {system_context}
    
    Matched RAG Manual Context:
    {rag_context if rag_context else "No direct manual references found."}
    
    Operator Query:
    "{query}"
    """
    
    system_instruction = """
    You are Say-Bo, the EcoAccess Spectator and Event Assistant for the APAC Cricket Stadium.
    
    You must detect natural greetings and identity queries, and respond conversationally following these rules:
    1. GREETINGS (e.g. 'hi', 'hello', 'hey'): Welcome the user warmly and ask how you can help locate concessions (Food Kiosk), charging hubs (Solar Charging Station), restrooms (Restrooms), or calculate route directions on the grid map.
    2. IDENTITY/PURPOSE (e.g. 'who are you', 'what is your purpose'): Explain your role as the EcoAccess Spectator Assistant for APAC Stadium and prompt the user to check node locations or calculate directions.
    3. OUT-OF-SCOPE QUERIES: If the query is unrelated to stadium logistics, energy grid, waste, or accessibility (e.g. general knowledge, jokes, unrelated talk), politely acknowledge it, but immediately divert the conversation back to the active GIS nodes on the grid (Main Entrance Gate, Food Kiosk, Restrooms, Shuttle Pick-up, Solar Charging Station, Main Exit Gate).
    4. SHUTTLE SCHEDULES: If asked about shuttle departures or schedules (e.g. 'shuttle time departures', 'when do they leave', 'shuttle schedule'), inform attendees that shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.
    5. FOOD KIOSK & CARTS: If asked about food kiosk options, food, or eating, remind attendees to keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk. Mention that drinks and snacks as well as vegan-friendly options are available.
    6. DIRECTIONS & CALCULATIONS: When an attendee asks for directions, how to navigate, 'where is', or 'where are' in the chat, prompt them for their closest checkpoint location from all directory options (Main Entrance Gate, Main Exit Gate, Solar Charging Station, Shuttle Pick-up, Audio Headsets, Restrooms, Info & Help Desk, Food Kiosk, Main Venue Zone), and calculate step-by-step distance in meters and cardinal directions (North, South, East, West).
    7. AUDIO HEADSETS: If asked about audio headsets or batteries, say: "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee."
    8. SOLAR CHARGING STATION: If asked about solar charging or phone charging, say: "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you."
    9. BINS / LITTER / RUBBISH: If bins, litter, or rubbish are entered in chat, say: "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean."
    10. MULTILINGUAL RESPONSES: Detect the language of the user's query or context (English, Spanish, Japanese, Chinese, or German). Always generate your final response in that target language so users in all roles receive fully localized answers.
    11. In-scope stadium queries: Answer accurately using the context provided.
    """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction
            )
        )
        return {
            "text": response.text,
            "citations": ["AlloyDB pgvector Index", "Vertex AI Copilot"] if rag_context else ["Vertex AI Copilot"],
            "ragSnippet": rag_context
        }
    except Exception as e:
        print(f"Chat error: {e}")
        from core.config import get_credentials
        if get_credentials().get("apiMode") != "mock":
            raise e
        query_lower = query.lower()
        
        # Free Mock Knowledge Base (Backend Fallback)
        mock_db = [
            {
                "keywords": ['elevator', 'gate 6', 'access', 'wheelchair', 'mobility', 'barrier'],
                "reply": "Accessibility Alert: Elevator E-4 near Gate 6 is currently offline. Accessibility paths have been rerouted to auxiliary ramps. A repair crew is dispatched and on-route.",
                "citation": "AlloyDB: elevator_status_register (offline)",
                "snippet": "ACCESSIBILITY RULE 4.2.1: In the event of primary elevator failure at gates serving mobility zones, operators must reroute passengers to auxiliary ramp structures within 10 minutes and dispatch repairs immediately."
            },
            {
                "keywords": ['audio', 'headset', 'headsets', 'earphone', 'earphones', 'hearing', 'sound assistance'],
                "reply": "Audio Headsets: To hire audio headsets or for battery queries - please proceed to the main help and information desk for rental. Please note: To promote care - any loss or damages are 100% on the attendee.",
                "citation": "AlloyDB RAG: audio_headset_rental_policy",
                "snippet": "AUDIO HEADSET POLICY: Headsets and battery servicing are managed at the Main Info & Help Desk. Attendees are 100% responsible for loss or damage during rental."
            },
            {
                "keywords": ['solar', 'charge', 'charger', 'charging', 'phone charge', 'power bank', 'plug'],
                "reply": "Solar Charging Station: Please understand and to consider all attendee's - there is a 10 minute allocation for the Solar Charging Station and attendees are required to stay with their device for the duration of use. Please do not leave your device unattended. The Venue is not resposible for theft, loss or damage when on site. Thank you.",
                "citation": "AlloyDB RAG: solar_charging_station_policy",
                "snippet": "SOLAR CHARGING POLICY: 10-minute maximum allocation per device. Unattended devices are strictly prohibited. Venue is not liable for theft, loss, or damage."
            },
            {
                "keywords": ['shuttle', 'transit', 'bus', 'transport', 'egress', 'leave', 'leaving', 'departure', 'departures', 'schedule', 'time', 'when do'],
                "reply": "Shuttles are scheduled to leave every half an hour, and at peak times, they are scheduled to leave once at full capacity.",
                "citation": "AlloyDB RAG: shuttle_departure_schedule",
                "snippet": "SHUTTLE TRANSIT SCHEDULE: Electric shuttles depart every 30 minutes during standard operations and immediately upon reaching full capacity during peak spectator traffic."
            },
            {
                "keywords": ['food', 'kiosk', 'cart', 'carts', 'eat', 'snack', 'snacks', 'drink', 'drinks', 'vegan', 'concession', 'concessions', 'meal', 'hungry', 'dining'],
                "reply": "For food kiosk options, keep a lookout for the mobile food carts on the move throughout the stadium, or head to the main kiosk! Drinks and snacks as well as vegan-friendly options are available.",
                "citation": "AlloyDB RAG: food_kiosk_concessions",
                "snippet": "FOOD CONCESSION POLICY: In addition to the static Food Kiosk, mobile eco-friendly food carts travel continuously throughout stadium concourses. Drinks, snacks, and vegan options are available."
            },
            {
                "keywords": ['directions', 'direction', 'route', 'path', 'how do i get to', 'where is', 'where are', 'navigate', 'way to', 'walk to', 'location of', 'find'],
                "reply": "🗺️ **Say-Bo Navigation & Directions Helper**:\nTo calculate your exact walking distance and step-by-step compass directions, please select or specify your current closest checkpoint location from our stadium directory:\n\n📍 **Available Checkpoint Locations:**\n• 🚪 Main Entrance Gate\n• 🚪 Main Exit Gate\n• ☀️ Solar Charging Station\n• 🚌 Shuttle Pick-up\n• 🎧 Audio Headsets\n• ♿ Restrooms\n• ℹ️ Info & Help Desk\n• 🍎 Food Kiosk\n• 🏟️ Main Venue Zone\n\n👉 You can also tap the **🗺️ Get Directions** button above to calculate exact distance metrics and cardinal steps (North, South, East, West) in real-time!",
                "citation": "Say-Bo RAG: compass_navigation_calculator",
                "snippet": "NAVIGATION SYSTEM RULE 1.1: When spectators request directions, prompt for their closest checkpoint landmark from all active directory nodes and calculate Euclidean distance in meters alongside cardinal orientation."
            },
            {
                "keywords": ['bin', 'bins', 'litter', 'rubbish', 'waste', 'trash', 'garbage', 'recycle', 'recycling', 'compost', 'dispose', 'disposal'],
                "reply": "Multiple bins are located around the stadium with recycling and organic waste options with signage to help you decide how to dispose, thank you for being mindful and helping the event and planet stay clean.",
                "citation": "AlloyDB RAG: waste_bin_recycling_guide",
                "snippet": "WASTE DISPOSAL POLICY: Recycled and organic bins are distributed venue-wide with signage guides to assist attendee disposal."
            },
            {
                "keywords": ['translate', 'feedback', 'japanese', 'spanish', 'german', 'language'],
                "reply": "Feedback translation and sentiment analysis runs automatically on incoming posts. Tapping 'Translate' uses Gemini 2.5 Flash to convert feedback, classify sentiment, and route urgent accessibility reports within 5 minutes.",
                "citation": "AlloyDB: feedback_translation_policy (offline)",
                "snippet": "TRANSLATION POLICY 1.8.4: All spectator reports submitted in non-English formats must be translated semantically to identify safety or mobility barriers."
            },
            {
                "keywords": ['budget', 'fund', 'cost', 'money'],
                "reply": "Under the current configuration, execution budget remaining is balanced against capital upgrades. Major expenses are allocated to electric shuttle dispatch ($6.5M) and solar battery upgrades ($5.0M).",
                "citation": "AlloyDB: budget_ledger_register (offline)",
                "snippet": "STRATEGIC CAPITAL CODE: Sustainability capital upgrades are capped at $30M total budget. Efficiency must be balanced above 70%."
            }
        ]

        # Find keyword match
        match = None
        for item in mock_db:
            if any(kw in query_lower for kw in item["keywords"]):
                match = item
                break

        if match:
            return {
                "text": match["reply"],
                "citations": [match["citation"]],
                "ragSnippet": match["snippet"]
            }
            
        greetings_list = ['hi', 'hello', 'hey', 'greetings', 'yo', 'good morning', 'good afternoon', 'good evening']
        identity_list = ['who are you', 'what is your name', 'say-bo', 'saybo', 'what do you do', 'purpose', 'help', 'info']
        
        is_greeting = any(query_lower.startswith(g) or f" {g} " in f" {query_lower} " for g in greetings_list)
        is_identity = any(id_word in query_lower for id_word in identity_list)

        if is_greeting:
            return {
                "text": "Hello! I am here and ready to guide you. As your stadium assistant, I can help you find universal restrooms, locate solar charging hubs, calculate walking directions, or check transit schedules. How can I assist you today?",
                "citations": ["Say-Bo Welcome Router"],
                "ragSnippet": "SAY-BO CONVERSATIONAL INTERACTION: Greetings route users directly back to stadium-specific accessibility and carbon indicators."
            }
        elif is_identity:
            return {
                "text": "I am Say-Bo, your EcoAccess Spectator Assistant. My focus is to help you navigate the APAC Stadium sustainably and inclusively. Would you like to check accessible directions on the grid, view solar charging nodes, or look up electric shuttle updates?",
                "citations": ["Say-Bo Purpose Manual"],
                "ragSnippet": "SAY-BO CONVERSATIONAL INTERACTION: Purpose queries are redirected back to the active GIS grid layout context."
            }
        else:
            return {
                "text": "I understand your request, but as your virtual stadium navigator, I am focused on the venue's logistics. Let's get back on track: would you like to calculate directions from the Main Entrance Gate, locate the Food Kiosk, or find the nearest Restrooms?",
                "citations": ["Say-Bo Stadium GIS Context"],
                "ragSnippet": "SAY-BO CONVERSATIONAL INTERACTION: Out-of-scope requests are redirected back to the active GIS grid layout context."
            }

def detect_waste_gemini(image_bytes: bytes, mime_type: str) -> dict:
    """Uses Gemini 2.5 Flash multimodal vision to detect bin fullness and contamination."""
    prompt = """
    Analyze this image of a waste bin or recycling container to audit contamination and capacity:
    
    1. CONSTITUTION GUIDELINES:
       - Organic compost bins should ONLY contain food scraps, soils, compostable paper, or raw plants. Landfill trash, plastic bags, wrappers, utensils, or metal cans inside a compost bin constitute CONTAMINATION.
       - Recycling bins should contain dry recyclables (paper, plastic bottles, clean aluminum cans). Food waste, liquids, or greasy items constitute CONTAMINATION.
       
    2. CAPACITY ESTIMATE:
       - Estimate the fill level relative to the top rim of the container. 
       - Empty = 0%, half-full = 50%, flush with the rim = 90-100%, overflowing = >100%. 
       - Even if items are loosely piled, assess the volume capacity block.
    
    Format the output strictly as a JSON object with the following keys and data types:
    - "contaminationDetected": boolean (true/false)
    - "contaminationDetail": string (brief description of contaminants found, or empty if none)
    - "fillLevel": integer (0 to 110 estimating capacity)
    - "status": string ("normal", "contamination_warning" if contaminationDetected is true, or "overflowing" if fillLevel >= 80)
    
    Do not output any surrounding markdown code blocks, just raw JSON.
    """
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type=mime_type
                ),
                prompt
            ],
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)
    except Exception as e:
        print(f"Gemini vision error: {e}")
        from core.config import get_credentials
        if get_credentials().get("apiMode") != "mock":
            raise e
        # Default realistic fallback simulating a full, contaminated bin in mock mode
        return {
            "contaminationDetected": True,
            "contaminationDetail": "Plastic container and wrapper debris found in organic waste bin",
            "fillLevel": 95,
            "status": "contamination_warning"
        }
