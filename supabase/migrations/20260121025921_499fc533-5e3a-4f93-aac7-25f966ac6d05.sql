-- Add policy to allow admins to delete any submission
CREATE POLICY "Admins can delete any submission" 
ON public.submissions 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));