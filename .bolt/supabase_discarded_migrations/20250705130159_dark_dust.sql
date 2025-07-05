-- Create profiles table
CREATE TABLE profiles (
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
CREATE TABLE schools (
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
CREATE TABLE user_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  name text,
  type text,
  file_url text,
  status text DEFAULT 'valid',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for schools
CREATE POLICY "Anyone can view schools"
  ON schools FOR SELECT
  USING (true);

-- Only allow admins to modify schools (you'll need to implement admin checks)
CREATE POLICY "Only admins can insert schools"
  ON schools FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE email = 'admin@example.com'));

CREATE POLICY "Only admins can update schools"
  ON schools FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE email = 'admin@example.com'));

-- Create RLS policies for user_documents
CREATE POLICY "Users can view their own documents"
  ON user_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON user_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON user_documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON user_documents FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to handle updated_at column
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER handle_updated_at_profiles
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Create function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();