-- Create profiles table linked to auth.users
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  age text,
  email text,
  nationality text,
  education_level text,
  target_city text,
  target_program text,
  has_work_experience boolean DEFAULT false,
  has_gap_year boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create schools table
CREATE TABLE public.schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  city text NOT NULL,
  description text,
  website text,
  programs text[],
  ranking text,
  tuition_fees jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create user_documents table
CREATE TABLE public.user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  name text,
  type text,
  file_url text,
  status text DEFAULT 'valid',
  created_at timestamptz DEFAULT now()
);

-- Add Row-Level Security (RLS) policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_documents ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- RLS policies for schools (public read access)
CREATE POLICY "Anyone can view schools"
ON public.schools
FOR SELECT
USING (true);

-- RLS policies for user_documents
CREATE POLICY "Users can view their own documents"
ON public.user_documents
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
ON public.user_documents
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
ON public.user_documents
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
ON public.user_documents
FOR DELETE
USING (auth.uid() = user_id);

-- Create function to handle updated_at column
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER handle_updated_at_profiles
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Create function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample schools data
INSERT INTO public.schools (name, city, description, programs, website) VALUES
('Sorbonne University', 'Paris', 'One of the oldest and most prestigious universities in France', ARRAY['Arts', 'Humanities', 'Sciences', 'Medicine'], 'https://www.sorbonne-universite.fr/'),
('PSL University', 'Paris', 'Research university formed by the merger of several institutions', ARRAY['Sciences', 'Engineering', 'Arts', 'Humanities'], 'https://www.psl.eu/'),
('École Polytechnique', 'Paris', 'Leading French engineering school', ARRAY['Engineering', 'Computer Science', 'Mathematics'], 'https://www.polytechnique.edu/'),
('Sciences Po', 'Paris', 'Specialized in social sciences and international affairs', ARRAY['Political Science', 'Economics', 'Law', 'International Relations'], 'https://www.sciencespo.fr/'),
('HEC Paris', 'Paris', 'One of the world''s top business schools', ARRAY['Business', 'Management', 'Finance'], 'https://www.hec.edu/'),
('Université de Lyon', 'Lyon', 'Major center of higher education and research', ARRAY['Sciences', 'Humanities', 'Law', 'Medicine'], 'https://www.universite-lyon.fr/'),
('INSA Lyon', 'Lyon', 'Engineering school with strong industry connections', ARRAY['Engineering', 'Architecture', 'Urban Planning'], 'https://www.insa-lyon.fr/'),
('Université de Toulouse', 'Toulouse', 'Research-intensive university with aerospace focus', ARRAY['Aerospace Engineering', 'Computer Science', 'Economics'], 'https://www.univ-toulouse.fr/'),
('ISAE-SUPAERO', 'Toulouse', 'Leading aerospace engineering school', ARRAY['Aerospace Engineering', 'Systems Engineering'], 'https://www.isae-supaero.fr/'),
('Université de Bordeaux', 'Bordeaux', 'Multidisciplinary research university', ARRAY['Wine Science', 'Health Sciences', 'Law'], 'https://www.u-bordeaux.fr/'),
('Université de Strasbourg', 'Strasbourg', 'University with strong European focus', ARRAY['European Studies', 'International Law', 'Life Sciences'], 'https://www.unistra.fr/'),
('Université Grenoble Alpes', 'Grenoble', 'University in the heart of the Alps', ARRAY['Computer Science', 'Physics', 'Environmental Sciences'], 'https://www.univ-grenoble-alpes.fr/');