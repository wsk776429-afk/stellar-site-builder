import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { prompt, style, quality } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build the enhanced prompt with style
    let enhancedPrompt = prompt;
    if (style && style !== 'default') {
      const styleModifiers: Record<string, string> = {
        realistic: 'photorealistic, highly detailed, professional photography',
        digital: 'digital art style, vibrant colors, detailed illustration',
        oil: 'oil painting style, brush strokes visible, classical art',
        watercolor: 'watercolor painting style, soft edges, flowing colors',
        '3d': '3D rendered, ray tracing, realistic lighting, CGI quality',
      };
      if (styleModifiers[style]) {
        enhancedPrompt = `${prompt}, ${styleModifiers[style]}`;
      }
    }

    // Add quality modifiers
    if (quality === '4k' || quality === 'ultra') {
      enhancedPrompt += ', ultra high resolution, 4K quality, extremely detailed';
    }

    console.log('Generating image with prompt:', enhancedPrompt);

    // Determine size based on quality
    let size = '1024x1024';
    if (quality === '4k') {
      size = '1024x1024'; // DALL-E 3 max size
    } else if (quality === 'ultra') {
      size = '1024x1024';
    }

    // Use the dedicated images/generations endpoint
    const response = await fetch('https://ai.gateway.lovable.dev/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancedPrompt,
        n: 1,
        size: size,
        quality: quality === 'ultra' ? 'hd' : 'standard'
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

    const data = await response.json();
    console.log('AI response received:', JSON.stringify(data).substring(0, 200));

    // Extract the generated image URL from the response
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      console.error('No image in response:', JSON.stringify(data));
      throw new Error('No image was generated. Please try a different prompt.');
    }

    return new Response(
      JSON.stringify({ 
        imageUrl,
        description: 'Image generated successfully'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error generating image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
