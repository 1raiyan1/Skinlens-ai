# SkinLens AI

AI-powered skin analysis application that allows users to upload a selfie and receive personalized skincare insights using Google Gemini Vision.

## Features

* Upload facial images from device gallery
* AI-powered skin analysis
* Detects visible skin characteristics:

  * Skin type
  * Acne severity
  * Redness
  * Dark spots
  * Visible pores
* Personalized skincare recommendations
* FastAPI backend
* React Native (Expo) frontend
* Google Gemini Vision integration

## Tech Stack

### Frontend

* React Native
* Expo
* TypeScript
* Expo Image Picker

### Backend

* FastAPI
* Python
* Google Gemini API
* Pillow

## Project Structure

```text
skinlens-ai/
│
├── backend/
│   ├── app.py
│   ├── analyze_skin.py
│   ├── uploads/
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── assets/
│   └── package.json
│
├── docs/
│
└── README.md
```

## Setup

### Backend

Create virtual environment:

```bash
python -m venv venv
```

Activate:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install fastapi uvicorn python-multipart pillow python-dotenv google-genai
```

Create `.env`:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run server:

```bash
uvicorn app:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Frontend

Install dependencies:

```bash
npm install
```

Run Expo:

```bash
npx expo start
```

## API Endpoint

### Analyze Skin

```http
POST /analyze
```

Request:

```multipart
file=<image>
```

Response:

```json
{
  "analysis": {
    "skin_type": "Oily",
    "acne_severity": "Moderate",
    "redness": "High",
    "dark_spots": "Mild",
    "recommendations": [
      "Niacinamide",
      "Salicylic Acid",
      "SPF 50"
    ]
  }
}
```

## Disclaimer

SkinLens is intended for educational and informational purposes only.

The application does not provide medical diagnoses and should not be considered a substitute for professional medical advice. Users should consult a qualified dermatologist for diagnosis and treatment of skin conditions.

## Roadmap

* Improved UI/UX
* Structured JSON responses
* Progress tracking
* Scan history
* User authentication
* Cloud storage
* Product recommendations
* Dermatologist integration

## Author

Ahmed Raiyan

Built with React Native, FastAPI, and Google Gemini Vision.
