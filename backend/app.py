from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from dotenv import load_dotenv
from PIL import Image
import shutil
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI(
    title="SkinLens API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "SkinLens API Running"
    }


@app.post("/analyze")
async def analyze_skin(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = Image.open(file_path)

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

    Do not diagnose diseases.
    Focus only on visible skin characteristics.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[prompt, image]
    )

    return {
        "analysis": response.text
    }