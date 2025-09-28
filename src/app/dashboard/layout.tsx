'use client';

import { SidebarDemo } from '@/components/anmetedUI/sidebar-demo';
import { BreadcrumbWithCustomSeparator } from '@/components/breadCrumb/bread-crumb';
import pool from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import { Separator } from '@radix-ui/react-separator';
import { notFound } from 'next/navigation';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  
    
  return (
    <div className="flex h-screen w-full">
      <SidebarDemo>
        <div className="flex-1 flex flex-col">
          <BreadcrumbWithCustomSeparator />
          <hr className="my-2" />

          <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      </SidebarDemo>
    </div>
  );
};

export default Layout;
