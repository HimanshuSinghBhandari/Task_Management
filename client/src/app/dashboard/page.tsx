// app/dashboard/page.tsx
"use client"

import { useEffect, useState } from 'react';
import Sidebar from "@/components/sidebar/sidebar";
import DashHomePage from "@/components/dashboard/dash-board";
import ProtectedRoute from '@/components/protectedroute/protected-route';

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <div className="ml-60 flex-grow">
          <DashHomePage />
        </div>
      </div>
    </ProtectedRoute>
  );
}