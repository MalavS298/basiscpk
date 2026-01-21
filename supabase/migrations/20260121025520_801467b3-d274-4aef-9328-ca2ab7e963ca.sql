-- Add policy to allow admins to create submissions for any user
CREATE POLICY "Admins can create submissions for any user" 
ON public.submissions 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));