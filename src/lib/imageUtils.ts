import { SUPABASE_URL } from '@/config/supabase';

export function getImageUrl(path: string): string {
  if (!path) return '';
  // If it's already a full URL, return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  // If path starts with /uploads or /lovable-uploads, use local public folder
  if (path.startsWith('/uploads') || path.startsWith('/lovable-uploads')) {
    return path;
  }
  // Otherwise, use Supabase public URL
  return `${SUPABASE_URL}/storage/v1/object/public/uploads/${path}`;
}
