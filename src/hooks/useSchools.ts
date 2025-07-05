import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface School {
  id: string;
  name: string;
  city: string;
  description: string | null;
  website: string | null;
  programs: string[] | null;
  ranking: string | null;
  tuition_fees: any | null;
  created_at: string | null;
  subjects?: string[] | null;
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchSchools() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .order('name');

        if (error) throw error;
        setSchools(data || []);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  return { schools, loading, error };
}

export function useSchoolsByCity(city: string | null) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!city) {
      setSchools([]);
      setLoading(false);
      return;
    }

    async function fetchSchoolsByCity() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('city', city)
          .order('name');

        if (error) throw error;
        setSchools(data || []);
      } catch (err) {
        console.error('Error fetching schools by city:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolsByCity();
  }, [city]);

  return { schools, loading, error };
}

export function useSchoolDetail(id: string | null) {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setSchool(null);
      setLoading(false);
      return;
    }

    async function fetchSchoolDetail() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setSchool(data);
      } catch (err) {
        console.error('Error fetching school details:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchoolDetail();
  }, [id]);

  return { school, loading, error };
}

export function useSchoolSearch(searchTerm: string | null) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length === 0) {
      setSchools([]);
      setLoading(false);
      return;
    }

    async function searchSchools() {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%`)
          .order('name');

        if (error) throw error;
        setSchools(data || []);
      } catch (err) {
        console.error('Error searching schools:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(searchSchools, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return { schools, loading, error };
}