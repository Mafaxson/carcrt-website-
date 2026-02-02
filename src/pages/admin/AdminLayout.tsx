import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <nav className="flex gap-4">
          <NavLink to="/admin/impact-counters" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Impact Counters</NavLink>
          <NavLink to="/admin/partners" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Partners & Sponsors</NavLink>
          <NavLink to="/admin/agribusiness-gallery" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Agribusiness Gallery</NavLink>
          <NavLink to="/admin/impact-stories" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Impact Stories</NavLink>
          <NavLink to="/admin/news" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>News & Updates</NavLink>
          <NavLink to="/admin/events" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Events</NavLink>
          <NavLink to="/admin/applications" className={({isActive}) => isActive ? 'font-bold text-blue-600' : ''}>Applications</NavLink>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
