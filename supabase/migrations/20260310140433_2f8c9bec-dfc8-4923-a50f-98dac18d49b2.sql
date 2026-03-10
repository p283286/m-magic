
-- Create portfolio_items table (public read, admin write)
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  img TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Everyone can read portfolio items (public website)
CREATE POLICY "Portfolio items are publicly readable"
ON public.portfolio_items FOR SELECT USING (true);

-- Create user_roles table for admin role management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own roles
CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Only admins can insert/update/delete portfolio items
CREATE POLICY "Admins can insert portfolio items"
ON public.portfolio_items FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update portfolio items"
ON public.portfolio_items FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete portfolio items"
ON public.portfolio_items FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Timestamp update function and trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_items_updated_at
BEFORE UPDATE ON public.portfolio_items
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default portfolio items
INSERT INTO public.portfolio_items (title, category, sort_order) VALUES
  ('舞台魔術表演', '舞台表演', 1),
  ('企業晚宴近距離魔術', '近距離魔術', 2),
  ('兒童魔術教學工作坊', '教學課程', 3),
  ('大型幻術表演', '舞台表演', 4),
  ('生日派對魔術表演', '派對表演', 5),
  ('街頭魔術表演', '街頭魔術', 6),
  ('白鴿魔術表演', '舞台表演', 7),
  ('撲克牌近距離魔術', '近距離魔術', 8),
  ('企業晚會魔術演出', '近距離魔術', 9),
  ('青少年魔術課程', '教學課程', 10),
  ('商場魔術活動', '舞台表演', 11),
  ('婚禮魔術表演', '派對表演', 12);
