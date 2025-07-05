import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useProfile, Profile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export function ProfileForm() {
  const { profile, loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const { error } = await updateProfile(formData);
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="animate-pulse">Loading profile...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="Your email address"
                disabled
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                value={formData.age || ''}
                onChange={handleChange}
                placeholder="Your age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                name="nationality"
                value={formData.nationality || ''}
                onChange={handleChange}
                placeholder="Your nationality"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education_level">Education Level</Label>
              <select
                id="education_level"
                name="education_level"
                value={formData.education_level || ''}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target_city">Target City in France</Label>
              <Input
                id="target_city"
                name="target_city"
                value={formData.target_city || ''}
                onChange={handleChange}
                placeholder="City you want to study in"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target_program">Target Program</Label>
              <Input
                id="target_program"
                name="target_program"
                value={formData.target_program || ''}
                onChange={handleChange}
                placeholder="Program you want to study"
              />
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_work_experience"
                checked={formData.has_work_experience || false}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('has_work_experience', checked as boolean)
                }
              />
              <Label htmlFor="has_work_experience">I have work experience</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_gap_year"
                checked={formData.has_gap_year || false}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('has_gap_year', checked as boolean)
                }
              />
              <Label htmlFor="has_gap_year">I have a gap year in my education</Label>
            </div>
          </div>
          
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}