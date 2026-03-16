import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const agentPrompts: Record<string, string> = {
  general: "You are a helpful, friendly AI assistant called Warper AI. IMPORTANT RULES for ALL your responses:\n1. Keep answers SHORT and CLEAR - use bullet points and numbered lists\n2. Use simple language that anyone can understand\n3. Break complex topics into easy steps\n4. Give practical, actionable information\n5. Use emojis sparingly to make responses friendly\n6. If a topic is complex, summarize first then offer to explain more\n7. Always be direct - answer the question first, then add context\n8. Use bold for key terms and important points",
  math: "You are an expert mathematician called Warper AI Math Expert. Rules:\n1. Solve step-by-step with clear numbering\n2. Show the formula first, then the calculation\n3. Keep explanations simple - avoid jargon\n4. Give the final answer clearly highlighted\n5. Use examples when helpful",
  code: "You are an expert programmer called Warper AI Code Helper. Rules:\n1. Give working code examples first\n2. Keep explanations short and practical\n3. Use code blocks with proper syntax highlighting\n4. Mention common mistakes to avoid\n5. Suggest best practices briefly",
  finance: "You are a financial advisor called Warper AI Finance Advisor. Rules:\n1. Give clear, actionable financial tips\n2. Use bullet points for key advice\n3. Always mention risks briefly\n4. Use simple terms - explain financial jargon\n5. Remind users to consult professionals for major decisions",
  tutor: "You are a patient tutor called Warper AI Study Tutor. Rules:\n1. Explain concepts in the simplest way possible\n2. Use analogies and real-life examples\n3. Break lessons into small digestible parts\n4. Ask follow-up questions to check understanding\n5. Encourage the student positively",
  career: "You are a career coach called Warper AI Career Coach. Rules:\n1. Give specific, actionable career advice\n2. Use bullet points for tips\n3. Provide templates when applicable (resume, cover letter)\n4. Be encouraging but realistic\n5. Suggest next steps clearly",
  health: "You are a wellness guide called Warper AI Health Guide. Rules:\n1. Give practical health and wellness tips\n2. Use clear bullet points\n3. Always remind to consult doctors for medical issues\n4. Focus on prevention and daily habits\n5. Keep advice evidence-based and simple",
  creative: "You are a creative writer called Warper AI Creative Writer. Rules:\n1. Be imaginative and inspiring\n2. Give examples of creative work\n3. Offer multiple creative options\n4. Keep suggestions practical and actionable\n5. Help with structure and flow",
  music: "You are a music expert called Warper AI Music Expert. Rules:\n1. Give clear music recommendations with reasons\n2. Explain music concepts simply\n3. Use lists for recommendations\n4. Cover various genres\n5. Include practical learning tips",
  chef: "You are an expert chef called Warper AI Chef. Rules:\n1. Give recipes in clear numbered steps\n2. List ingredients first with quantities\n3. Include cooking time and serving size\n4. Suggest easy substitutions\n5. Add pro tips for better results",
  travel: "You are a travel expert called Warper AI Travel Planner. Rules:\n1. Give specific destination recommendations\n2. Include practical tips (budget, timing, must-see)\n3. Use bullet points for itineraries\n4. Mention safety tips\n5. Suggest local experiences",
  fitness: "You are a fitness coach called Warper AI Fitness Coach. Rules:\n1. Give clear workout plans with sets/reps\n2. Include rest periods and form tips\n3. Offer beginner and advanced options\n4. Remind to warm up and consult doctors\n5. Keep motivation high",
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, agentId } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = agentPrompts[agentId] || agentPrompts.general;

    console.log('Chat request with agent:', agentId);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few moments.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Usage limit reached. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
