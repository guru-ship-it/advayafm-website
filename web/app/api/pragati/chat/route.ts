import { NextRequest, NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BEDROCK_REGION = process.env.BEDROCK_REGION || 'ap-south-1';
const MODEL_ID = process.env.PRAGATI_MODEL_ID || 'apac.anthropic.claude-3-5-sonnet-20240620-v1:0';

const SYSTEM_PROMPT = `You are Pragati, the warm and wise "Didi" (older sister) AI coach for D Advaya FM NaipuNya — India's AI-powered training platform for blue-collar workers and facility management professionals.

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
- First AI coach (Pragati) with trilingual narration in Hindi/English/Telugu
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
- CONTACT: admin@advayafm.com | +91 79890 02661 | www.advayafm.com`;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

// CORS: allow Flutter WebView (file:// origin = "null") to call this endpoint.
const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function withCors<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...(init ?? {}),
    headers: { ...(init?.headers ?? {}), ...CORS_HEADERS },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const { message, history = [], language = 'English' } = await req.json();

    if (!message || typeof message !== 'string') {
      return withCors({ error: 'message is required' }, { status: 400 });
    }

    let system = SYSTEM_PROMPT;
    if (language === 'Hindi') {
      system +=
        "\n\nIMPORTANT: User prefers Hindi. Reply in Hindi (Devanagari script), keeping technical terms in English where appropriate. Use warm 'bhaiya/behen' tone.";
    } else if (language === 'Telugu') {
      system +=
        "\n\nIMPORTANT: User prefers Telugu. Reply in Telugu (తెలుగు script), keeping technical terms in English where appropriate. Use warm 'annaa/akka' tone.";
    } else {
      system +=
        "\n\nReply in clear, simple English suitable for blue-collar workers. Occasionally mix in Hindi terms like 'namaste' or 'bhaiya' for warmth.";
    }

    const messages = [
      ...history
        .filter((m: ChatMessage) => m && (m.role === 'user' || m.role === 'assistant'))
        .slice(-10)
        .map((m: ChatMessage) => ({ role: m.role, content: m.content })),
      { role: 'user', content: message },
    ];

    const client = new BedrockRuntimeClient({ region: BEDROCK_REGION });
    const cmd = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 400,
        system,
        messages,
        temperature: 0.7,
      }),
    });

    const resp = await client.send(cmd);
    const body = JSON.parse(new TextDecoder().decode(resp.body));
    const reply: string =
      body?.content?.[0]?.text ||
      'Maaf kijiye, main abhi jawab nahi de paa rahi. Please try again.';

    return withCors({
      reply,
      language,
      tokens_in: body?.usage?.input_tokens || 0,
      tokens_out: body?.usage?.output_tokens || 0,
    });
  } catch (err: any) {
    console.error('Pragati error:', err);
    return withCors(
      { error: 'Pragati is temporarily unavailable', detail: err?.message },
      { status: 500 }
    );
  }
}
