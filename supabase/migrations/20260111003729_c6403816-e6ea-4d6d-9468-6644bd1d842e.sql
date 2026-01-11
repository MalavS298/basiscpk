-- Add service_date column to submissions table
ALTER TABLE public.submissions 
ADD COLUMN service_date DATE NOT NULL DEFAULT CURRENT_DATE;