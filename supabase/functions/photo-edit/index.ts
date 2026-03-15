import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { imageBase64, tool, instruction } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    if (!imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Image is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const toolPrompts: Record<string, string> = {
      enhance: 'Please enhance this image. Improve the clarity, sharpness, color vibrancy, contrast, and overall quality to make it look professional and polished. Output the enhanced image.',
      upscale: 'Please upscale this image to higher quality. Sharpen details, reduce noise, and improve overall resolution quality. Output the improved image.',
      colorize: 'Please colorize this black and white / grayscale image with realistic, natural colors. Maintain the original composition and details. Output the colorized image.',
      restore: 'Please restore this old or damaged photo. Fix any scratches, tears, fading, noise, or artifacts. Improve the overall quality while preserving the original look. Output the restored image.',
      'remove-bg': 'Please remove the background from this image. Keep only the main subject and make the background pure white. Output the image with background removed.',
      'auto-edit': 'Analyze this photo carefully. Identify any issues like poor lighting, color imbalance, noise, blur, low contrast, overexposure, underexposure, or any other quality problems. Then automatically fix ALL detected issues to produce the best possible version of this photo. Apply professional-grade corrections. Output the improved image.',
      'custom': instruction || 'Please enhance this image quality. Output the improved image.',
    };

    const prompt = tool === 'custom' && instruction 
      ? `Please edit this image according to these instructions: ${instruction}. Output the edited image.`
      : toolPrompts[tool] || toolPrompts['auto-edit'];

    console.log('Processing with tool:', tool, 'prompt length:', prompt.length);

    // Ensure the image URL is properly formatted for the API
    let imageUrl = imageBase64;
    if (!imageUrl.startsWith('data:')) {
      imageUrl = `data:image/png;base64,${imageUrl}`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3.1-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: { url: imageUrl }
              }
            ]
          }
        ],
        modalities: ['text', 'image']
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment and try again.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Usage limit reached. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI processing failed: ${response.status} - ${errorText.substring(0, 200)}`);
    }

    const data = await response.json();
    console.log('Response keys:', Object.keys(data));
    console.log('Message keys:', data.choices?.[0]?.message ? Object.keys(data.choices[0].message) : 'no message');
    
    // Log the full message structure to understand the format
    const msg = data.choices?.[0]?.message;
    if (msg) {
      console.log('Message content type:', typeof msg.content);
      if (Array.isArray(msg.content)) {
        console.log('Content parts:', msg.content.map((p: any) => ({ type: p.type, hasUrl: !!p.image_url?.url, hasInlineData: !!p.inline_data })));
      }
      if (msg.images) {
        console.log('Images array length:', msg.images.length);
      }
    }

    // Try multiple response formats to find the edited image
    let editedImage: string | null = null;
    let description = '';

    if (msg) {
      // Format 1: images array (OpenAI-style)
      if (msg.images && Array.isArray(msg.images) && msg.images.length > 0) {
        const img = msg.images[0];
        if (img.image_url?.url) editedImage = img.image_url.url;
        else if (img.url) editedImage = img.url;
        else if (typeof img === 'string') editedImage = img;
      }

      // Format 2: content as array of parts (Gemini-style)
      if (!editedImage && Array.isArray(msg.content)) {
        for (const part of msg.content) {
          if (part.type === 'image_url' && part.image_url?.url) {
            editedImage = part.image_url.url;
          } else if (part.type === 'image' && part.image_url?.url) {
            editedImage = part.image_url.url;
          } else if (part.inline_data) {
            editedImage = `data:${part.inline_data.mime_type || 'image/png'};base64,${part.inline_data.data}`;
          } else if (part.type === 'text' && part.text) {
            description += part.text;
          }
        }
      }

      // Format 3: content is a string (text only response - try to extract base64)
      if (!editedImage && typeof msg.content === 'string') {
        description = msg.content;
        // Check if content itself contains base64 image data
        const b64Match = msg.content.match(/data:image\/[^;]+;base64,[A-Za-z0-9+/=]+/);
        if (b64Match) {
          editedImage = b64Match[0];
        }
      }
    }

    if (!editedImage) {
      console.error('No image found in response. Full message:', JSON.stringify(msg).substring(0, 1000));
      return new Response(
        JSON.stringify({ 
          error: 'The AI could not generate an edited image. Try a different tool or a clearer image.',
          description: description || 'No image was returned'
        }),
        { status: 422, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl: editedImage, description: description || 'Image processed successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing image:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to process image' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
