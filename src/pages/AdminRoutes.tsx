import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminProtectedRoute from './admin/AdminProtectedRoute';
import AdminImpactCounters from './admin/AdminImpactCounters';
import AdminPartners from './admin/AdminPartners';
import AdminAgribusinessGallery from './admin/AdminAgribusinessGallery';
import AdminImpactStories from './admin/AdminImpactStories';
import AdminNewsUpdates from './admin/AdminNewsUpdates';
import AdminEvents from './admin/AdminEvents';
import AdminApplications from './admin/AdminApplications';
// import other admin pages as you build them

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="impact-counters" element={<AdminImpactCounters />} />
        <Route path="partners" element={<AdminPartners />} />
        <Route path="agribusiness-gallery" element={<AdminAgribusinessGallery />} />
        <Route path="impact-stories" element={<AdminImpactStories />} />
        <Route path="news" element={<AdminNewsUpdates />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="applications" element={<AdminApplications />} />
        {/* Add more admin routes here */}
        <Route path="*" element={<Navigate to="impact-counters" replace />} />
      </Route>
    </Routes>
  );
}
