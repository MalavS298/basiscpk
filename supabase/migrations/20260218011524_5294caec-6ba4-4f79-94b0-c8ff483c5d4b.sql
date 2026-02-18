
CREATE TABLE public.meetings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  start_time timestamp with time zone NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 60,
  zoom_meeting_id text,
  join_url text,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage meetings"
  ON public.meetings
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- All authenticated users can view meetings
CREATE POLICY "Authenticated users can view meetings"
  ON public.meetings
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
