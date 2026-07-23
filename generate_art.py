import asyncio
from google.antigravity import Agent, LocalAgentConfig

async def main():
    # Configure the agent to use the image generation model
    config = LocalAgentConfig(
        api_key="AIzaSyDe29mwVBumLArOmN2tZdursewHA9nuQMQ",
        model="gemini-3.1-flash-image-preview"  # The image generator model
    )

    print("🎨 Initializing AI artist...")
    async with Agent(config) as agent:
        prompt = "A futuristic glowing medical clinic, neon lights, 3d render, high quality"
        print(f"✍️ Generating image for: '{prompt}'...")
        
        # Call the image generator
        image_response = await agent.generate_image(prompt)
        
        # Save it to your computer
        print("💾 Saving generated image to disk as 'glowing_clinic.jpg'...")
        with open("glowing_clinic.jpg", "wb") as f:
            f.write(image_response.bytes)
            
        print("🎉 Successfully saved! Check your folder.")

if __name__ == "__main__":
    asyncio.run(main())
