

## Security Fixes Plan

### Finding 1: Leaked Password Protection Disabled
This is a configuration setting, not a code change. I will use the `configure_auth` tool to enable leaked password protection, which checks passwords against known breach databases (HaveIBeenPwned) and rejects compromised passwords.

### Finding 2: Profiles Readable by All Authenticated Users
The current SELECT policy on the `profiles` table uses `true`, exposing all user data to any logged-in user. Since this app doesn't appear to be a social network, I'll update the RLS policy to restrict reads to the user's own profile:

**Migration SQL:**
```sql
DROP POLICY "Users can view all profiles" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
```

### Summary
- Enable leaked password protection via auth configuration
- Restrict profile SELECT policy to own row only

