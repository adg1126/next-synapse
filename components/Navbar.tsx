'use client';
import React from 'react';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';

export default function Navbar() {
  const scrolled = useScrollTop({ threshold: 10 });

  return (
    <div
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        <div>Login</div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
