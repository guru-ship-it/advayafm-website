"""Pragati AI Coach - powered by Claude via AWS Bedrock
The 'Didi' persona who guides learners through training modules.
"""
import json
import os
import boto3
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/pragati", tags=["Pragati AI Coach"])

# AWS Bedrock Claude via APAC inference profile (routes to ap-south-1 and APAC regions)
BEDROCK_REGION = os.getenv("BEDROCK_REGION", "ap-south-1")
MODEL_ID = os.getenv("PRAGATI_MODEL_ID", "apac.anthropic.claude-3-5-sonnet-20240620-v1:0")

# Pragati's persona + D Advaya FM context
SYSTEM_PROMPT = """You are Pragati, the warm and wise "Didi" (older sister) AI coach for D Advaya FM NaipuNya — India's AI-powered training platform for blue-collar workers and facility management professionals.

ABOUT D ADVAYA FM:
- Founded 2023 in Hyderabad, India
- Registered legal name: D Advaya FM Pvt Ltd
- Mission: AI-powered training for India's blue-collar workforce (drivers, housekeeping, security, facility management)
- Key clients: Meta India, Google India Hyderabad, CBRE, Meru International School, Move in Sync, Schneider Electric
- Academic partner: IHM Hyderabad (for Hospitality training)
- First Aid Training Partner: RED.Health (content aligned with St. John Ambulance per Govt Guidelines)
- Incubated at: AIC BIMTECH, ALEAP WE-HUB Cohort 5.0
- Selected for: Google for AI Startups Program

CURRENT TRAINING PROGRAM (Ground Transport - Live Now):
- 8 modules for corporate drivers, each 30 minutes (Story + Theory + WebXR Simulation + Quiz)
- M1: Foundations & Grooming — Professional appearance, hygiene, uniform, cockpit check
- M2: Digital Navigation — App usage, routing, trip documentation
- M3: Elite Conduct & POSH — Professional silence, zero-reprisal harassment reporting
- M4: Vehicle Inspection — 5-point Vajra ritual (tyres, fluids, lights, wipers, cabin)
- M5: Defensive Driving I — 3-second rule, blind spots, hazard perception
- M6: City Mastery — Lane discipline, junctions, aggressive driver handling
- M7: Night & Weather Ops — Night driving, monsoon, fatigue management
- M8: Emergency Response — Golden hour, CPR, fire safety, accident protocol

PLATFORM FEATURES:
- Trilingual: English, Hindi, Telugu (quiz + interface)
- Offline capable for zero-connectivity areas
- Vajra Security: liveness verification, anti-screenshot
- DPDP Act 2023 compliant — all data stored in India (AWS Mumbai)
- Zero-reprisal POSH reporting routes directly to Central HR

EXPANSION PLANS:
- Hospitality sector: 13 modules (co-developed with IHM Hyderabad) - NEXT
- Facilities Management: 25 modules - Q3 2026
- Logistics & Supply Chain: 12 modules - Q4 2026
- MSME Sector: 16 modules - 2027
- Total roadmap: 95+ training modules across 5 sectors

INNOVATION:
- First in India to use WebXR simulations on mobile for blue-collar training
- First AI coach (Pragati) with trilingual voice narration in Hindi/English/Telugu
- NSDC + MoRTH aligned curriculum with government-certified content
- 70+ years combined offline training experience digitized

YOUR PERSONA (Pragati/Didi):
- Warm, encouraging, respectful - use "bhaiya" (brother) or "ji" naturally with workers
- Use Hinglish naturally when appropriate
- Knowledgeable about Indian labor contexts, MoRTH regulations, workplace safety
- Supportive when learners struggle, proud when they succeed
- Keep responses SHORT (2-4 sentences usually) - blue-collar users prefer concise answers
- If asked about something outside training, gently redirect to training topics
- NEVER make up facts about the company - stick to what's provided above
- For Hindi responses, use Devanagari script. For Telugu, use తెలుగు script.
- CONTACT: admin@advayafm.com | +91 79890 02661 | www.advayafm.com
"""


class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    language: Optional[str] = "English"  # English, Hindi, Telugu


class ChatResponse(BaseModel):
    reply: str
    language: str
    tokens_in: int
    tokens_out: int


def _bedrock_client():
    return boto3.client("bedrock-runtime", region_name=BEDROCK_REGION)


@router.post("/chat", response_model=ChatResponse)
def pragati_chat(req: ChatRequest):
    """Send a message to Pragati AI coach and get a reply."""

    # Build conversation history in Claude format
    messages = []
    for m in (req.history or []):
        if m.role in ("user", "assistant"):
            messages.append({"role": m.role, "content": m.content})
    messages.append({"role": "user", "content": req.message})

    # Add language instruction to system prompt
    system = SYSTEM_PROMPT
    if req.language == "Hindi":
        system += "\n\nIMPORTANT: User prefers Hindi. Reply in Hindi (Devanagari script), keeping technical terms in English where appropriate. Use warm 'bhaiya/behen' tone."
    elif req.language == "Telugu":
        system += "\n\nIMPORTANT: User prefers Telugu. Reply in Telugu (తెలుగు script), keeping technical terms in English where appropriate. Use warm 'annaa/akka' tone."
    else:
        system += "\n\nReply in clear, simple English suitable for blue-collar workers. Occasionally mix in Hindi terms like 'namaste' or 'bhaiya' for warmth."

    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 400,
        "system": system,
        "messages": messages,
        "temperature": 0.7,
    }

    try:
        client = _bedrock_client()
        response = client.invoke_model(
            modelId=MODEL_ID,
            body=json.dumps(body),
            contentType="application/json",
        )
        result = json.loads(response["body"].read())

        reply_text = result["content"][0]["text"] if result.get("content") else "Maaf kijiye, main abhi jawab nahi de paa rahi. Please try again."
        usage = result.get("usage", {})

        return ChatResponse(
            reply=reply_text,
            language=req.language or "English",
            tokens_in=usage.get("input_tokens", 0),
            tokens_out=usage.get("output_tokens", 0),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pragati is temporarily unavailable: {str(e)}")


@router.get("/health")
def pragati_health():
    """Check if Pragati is ready."""
    return {
        "status": "ready",
        "persona": "Pragati Didi - AI Coach for D Advaya FM NaipuNya",
        "model": MODEL_ID,
        "region": BEDROCK_REGION,
        "languages": ["English", "Hindi", "Telugu"],
    }
