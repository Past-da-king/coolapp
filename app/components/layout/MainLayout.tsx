import React from 'react';
import Sidebar from '../sidebar/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-[#EBEBEB] p-4">
      <Sidebar />
      <main className="flex-1 bg-white rounded-2xl shadow-lg ml-4 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
