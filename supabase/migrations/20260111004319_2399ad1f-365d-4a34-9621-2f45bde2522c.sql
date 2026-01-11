-- Create newsletters table
CREATE TABLE public.newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- Everyone can view newsletters (public read)
CREATE POLICY "Anyone can view newsletters"
ON public.newsletters FOR SELECT
USING (true);

-- Only admins can create newsletters
CREATE POLICY "Admins can create newsletters"
ON public.newsletters FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update newsletters
CREATE POLICY "Admins can update newsletters"
ON public.newsletters FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete newsletters
CREATE POLICY "Admins can delete newsletters"
ON public.newsletters FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));