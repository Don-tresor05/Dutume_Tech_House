import React from 'react';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const DashboardLayout = ({ user, onLogout, children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header user={user} onLogout={onLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;