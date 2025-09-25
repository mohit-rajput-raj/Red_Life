'use client';

import { SidebarDemo } from '@/components/anmetedUI/sidebar-demo';
import { BreadcrumbWithCustomSeparator } from '@/components/breadCrumb/bread-crumb';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <SidebarDemo>
        <div className="flex-1 flex flex-col">
          <BreadcrumbWithCustomSeparator />
          <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      </SidebarDemo>
    </div>
  );
};

export default Layout;
