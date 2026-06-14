from dotenv import load_dotenv
from google import genai
from PIL import Image
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

image = Image.open("uploads/test.jpg.png")

prompt = """
Analyze this facial image.

Return ONLY valid JSON.

{
  "skin_type":"",
  "acne_severity":"",
  "dark_spots":"",
  "redness":"",
  "pores":"",
  "recommendations":[]
}

Important:
- Do not diagnose diseases.
- Mention confidence levels when uncertain.
- Focus only on visible skin characteristics.
"""

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[prompt, image]
)

print(response.text)