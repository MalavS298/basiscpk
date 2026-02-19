
-- Create meeting_details table to store notes and attendees for a meeting
CREATE TABLE public.meeting_details (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id uuid NOT NULL REFERENCES public.meetings(id) ON DELETE CASCADE,
  notes text,
  attendee_ids uuid[] NOT NULL DEFAULT '{}',
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.meeting_details ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can manage meeting details"
  ON public.meeting_details
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Authenticated users can view meeting details
CREATE POLICY "Authenticated users can view meeting details"
  ON public.meeting_details
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Trigger to keep updated_at current
CREATE OR REPLACE FUNCTION public.update_meeting_details_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_meeting_details_updated_at
  BEFORE UPDATE ON public.meeting_details
  FOR EACH ROW
  EXECUTE FUNCTION public.update_meeting_details_updated_at();
