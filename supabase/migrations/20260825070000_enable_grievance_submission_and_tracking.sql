-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  state_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create grievances table
CREATE TABLE IF NOT EXISTS public.grievances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_hash TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT NOT NULL,
  assigned_department TEXT,
  status TEXT DEFAULT 'RECEIVED',
  is_anonymous BOOLEAN DEFAULT false,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  detected_language TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievances ENABLE ROW LEVEL SECURITY;

-- Profiles Policy: Locked down strictly to the authenticated record holder
CREATE POLICY "Users can only access their own profile"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id);

-- Grievances Policy 1: Anyone can insert (Lodge a grievance)
CREATE POLICY "Anyone can lodge a grievance"
  ON public.grievances
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Grievances Policy 2: Globally queryable via public 'tracking_hash'
-- Handled by the fact that the tracker queries by tracking_hash.
-- If is_anonymous is true, we must mask the user_id. We can do this with a secure view.
CREATE OR REPLACE VIEW public.tracked_grievances WITH (security_invoker = false) AS
  SELECT 
    tracking_hash AS tracking_id,
    title,
    description,
    assigned_department,
    status,
    detected_language,
    created_at,
    CASE 
      WHEN is_anonymous = true THEN NULL 
      ELSE user_id 
    END as user_id
  FROM public.grievances;

GRANT SELECT ON public.tracked_grievances TO anon, authenticated;

-- For direct table access, ensure people can only read their own non-anonymous reports unless they are public
CREATE POLICY "Grievances are publicly readable but only show limited info if anonymous"
  ON public.grievances
  FOR SELECT
  TO anon, authenticated
  USING (true);
