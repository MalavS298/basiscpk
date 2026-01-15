-- Add service_type column to submissions table
ALTER TABLE public.submissions 
ADD COLUMN service_type text NOT NULL DEFAULT 'synchronous';