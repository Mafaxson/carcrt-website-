import { SUPABASE_URL } from '@/config/supabase';

export function getImageUrl(path: string): string {
  if (!path) return '';
  
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Use Supabase Storage for images
  // Images are stored in the 'uploads' bucket
  // Path format: /uploads/filename.jpg
  return `${SUPABASE_URL}/storage/v1/object/public/uploads${path.startsWith('/uploads') ? path.replace('/uploads', '') : path}`;
}
