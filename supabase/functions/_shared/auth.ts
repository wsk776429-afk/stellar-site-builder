import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/**
 * Verifies the caller's JWT server-side.
 * Returns the authenticated user id, or a 401 Response to return to the client.
 */
export async function requireUser(
  req: Request,
  corsHeaders: Record<string, string>,
): Promise<{ userId: string } | { response: Response }> {
  const unauthorized = () =>
    new Response(JSON.stringify({ error: 'Unauthorized. Please sign in to continue.' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return { response: unauthorized() };

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  if (!supabaseUrl || !anonKey) {
    return {
      response: new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }),
    };
  }

  const supabase = createClient(supabaseUrl, anonKey);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return { response: unauthorized() };

  return { userId: data.user.id };
}
