import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@/hooks/useSession';

export default function AdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();

  if (loading) return <div>Loading...</div>;
  if (!session || session.user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
