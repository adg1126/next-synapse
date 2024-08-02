'use client';
import React from 'react';

import { DashboardNavbarProps } from '@/types';

import { MenuIcon } from 'lucide-react';
import CustomBreadcrumb from './Breadcrumb/CustomBreadcrumb';

export default function DashboardNavbar({
  isCollapsed,
  onResetWidth,
}: DashboardNavbarProps) {
  return (
    <nav className='bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4'>
      {isCollapsed && (
        <MenuIcon
          role='button'
          onClick={onResetWidth}
          className='h-6 w-6 text-muted-foreground'
        />
      )}
      <div className='flex items-center justify-between w-full'>
        <CustomBreadcrumb />
      </div>
    </nav>
  );
}
