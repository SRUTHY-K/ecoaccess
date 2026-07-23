import asyncio
import os
from google.antigravity import Agent, LocalAgentConfig, from_file

async def main():
    # 1. Configure the agent
    config = LocalAgentConfig(
        api_key="AIzaSyDe29mwVBumLArOmN2tZdursewHA9nuQMQ",
        model="gemini-2.5-flash",
        system_instructions="You are a helpful companion AI. You can answer general questions, and if the user asks about an image or photo, you can analyze test_image.jpg."
    )

    print("🤖 Initializing your smart multimodal agent...")
    async with Agent(config) as agent:
        print("💬 Agent ready! Ask a text question, or type 'describe the image'. (Type 'exit' to quit)\n")
        
        while True:
            # Get user input in terminal
            loop = asyncio.get_event_loop()
            user_message = await loop.run_in_executor(None, input, "You: ")
            
            if user_message.lower().strip() == 'exit':
                print("Goodbye!")
                break
                
            if not user_message.strip():
                continue
                
            print("Agent: ", end="", flush=True)
            
            # Check if user is asking about the image
            trigger_words = ["image", "photo", "picture", "visual", "look", "describe"]
            is_asking_about_image = any(word in user_message.lower() for word in trigger_words)
            
            if is_asking_about_image and os.path.exists("test_image.jpg"):
                # Load image and send both to the agent
                image_part = from_file("test_image.jpg")
                response = await agent.chat([user_message, image_part])
            else:
                # Text-only chat
                response = await agent.chat(user_message)
                
            # Stream response
            async for token in response:
                print(token, end="", flush=True)
            print("\n")

if __name__ == "__main__":
    asyncio.run(main())
