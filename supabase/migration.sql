-- Execute once in the Supabase SQL editor. This keeps PII in base tables and
-- exposes public tracking only through a hash-bound, privacy-safe RPC.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone_number text,
  state_code text,
  created_at timestamptz not null default now()
);

create table if not exists public.grievances (
  id uuid primary key default gen_random_uuid(),
  tracking_hash text not null unique check (tracking_hash ~ '^CPG-[A-Z0-9]+$'),
  title text not null check (char_length(title) between 1 and 160),
  description text not null check (char_length(description) between 1 and 10000),
  assigned_department text not null,
  status text not null default 'RECEIVED',
  is_anonymous boolean not null default true,
  user_id uuid references auth.users(id) on delete set null,
  detected_language text not null check (detected_language in ('en', 'hi', 'kn', 'tm')),
  created_at timestamptz not null default now(),
  check ((is_anonymous and user_id is null) or not is_anonymous)
);

create index if not exists grievances_tracking_hash_idx on public.grievances (tracking_hash);
alter table public.profiles enable row level security;
alter table public.grievances enable row level security;

drop policy if exists "profile owner reads own profile" on public.profiles;
create policy "profile owner reads own profile" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "profile owner writes own profile" on public.profiles;
create policy "profile owner writes own profile" on public.profiles for all to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Direct reads are private. The hash lookup function below never exposes a
-- user ID, so anonymous tickets cannot be joined to profiles.
drop policy if exists "grievance owner reads own non anonymous records" on public.grievances;
create policy "grievance owner reads own non anonymous records" on public.grievances for select to authenticated using (not is_anonymous and user_id = auth.uid());
drop policy if exists "public can submit safely masked grievances" on public.grievances;
create policy "public can submit safely masked grievances" on public.grievances for insert to anon, authenticated with check ((is_anonymous and user_id is null) or (not is_anonymous and user_id = auth.uid()));

create or replace function public.get_grievance_by_tracking_hash(lookup_hash text)
returns table (tracking_hash text, title text, description text, assigned_department text, status text, is_anonymous boolean, detected_language text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select g.tracking_hash, g.title, g.description, g.assigned_department, g.status, g.is_anonymous, g.detected_language, g.created_at
  from public.grievances g where g.tracking_hash = upper(trim(lookup_hash));
$$;

revoke all on public.grievances from anon, authenticated;
grant insert on public.grievances to anon, authenticated;
grant execute on function public.get_grievance_by_tracking_hash(text) to anon, authenticated;
