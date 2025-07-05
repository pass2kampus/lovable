import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './useAuth';

export interface UserDocument {
  id: string;
  user_id: string;
  name: string | null;
  type: string | null;
  file_url: string | null;
  status: string | null;
  created_at: string | null;
}

export function useDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    async function fetchDocuments() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_documents')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchDocuments();
  }, [user]);

  const uploadDocument = async (file: File, name: string, type: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      setLoading(true);
      
      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { data: fileData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      // Save document metadata to database
      const { data, error: dbError } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          name,
          type,
          file_url: publicUrl,
          status: 'valid'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Update local state
      setDocuments(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      console.error('Error uploading document:', err);
      return { data: null, error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      setLoading(true);
      
      // Get the document to find the file path
      const { data: document, error: fetchError } = await supabase
        .from('user_documents')
        .select('file_url')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Delete from database
      const { error: dbError } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', id);
      
      if (dbError) throw dbError;
      
      // If there's a file URL, try to delete the file from storage
      if (document?.file_url) {
        // Extract the file path from the URL
        const fileUrl = document.file_url;
        const filePath = fileUrl.split('/').slice(-2).join('/'); // This assumes a specific URL format
        
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('documents')
          .remove([filePath]);
        
        if (storageError) {
          console.warn('Could not delete file from storage:', storageError);
        }
      }
      
      // Update local state
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      return { error: null };
    } catch (err) {
      console.error('Error deleting document:', err);
      return { error: err as Error };
    } finally {
      setLoading(false);
    }
  };

  return {
    documents,
    loading,
    error,
    uploadDocument,
    deleteDocument
  };
}