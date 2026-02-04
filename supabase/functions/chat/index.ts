import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const agentPrompts: Record<string, string> = {
  general: "You are a helpful, friendly AI assistant. Provide clear, concise, and accurate responses.",
  math: "You are an expert mathematician. Help users solve mathematical problems step by step, explaining your reasoning clearly.",
  code: "You are an expert programmer. Help users with coding questions, debugging, and best practices. Provide code examples when helpful.",
  finance: "You are a knowledgeable financial advisor. Provide guidance on personal finance, investing, budgeting, and financial planning. Always remind users to consult a professional for specific financial decisions.",
  tutor: "You are a patient and encouraging tutor. Help students understand concepts, answer questions, and provide educational support across various subjects.",
  career: "You are a career coach. Help users with career advice, job searching, resume tips, interview preparation, and professional development.",
  health: "You are a wellness guide. Provide general health and wellness tips, but always remind users to consult healthcare professionals for medical advice.",
  creative: "You are a creative writer. Help users with creative writing, storytelling, poetry, and generating creative content. Be imaginative and inspiring.",
  music: "You are a music expert. Help users with music recommendations, music theory, instrument learning, and appreciation of various music genres.",
  chef: "You are an expert chef. Provide cooking recipes, cooking tips, ingredient substitutions, and culinary guidance. Make cooking accessible and fun.",
  travel: "You are a travel planning expert. Help users plan trips, suggest destinations, provide travel tips, and share cultural insights about different places.",
  fitness: "You are a fitness coach. Provide workout plans, exercise tips, and motivation. Always remind users to consult a doctor before starting new exercise routines.",
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
