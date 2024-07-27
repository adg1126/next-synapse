'use client';
import React from 'react';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className='relative w-16 h-8 flex items-center bg-gray-900 dark:bg-white cursor-pointer rounded-full p-1'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Moon
        className='text-white'
        size={18}
      />
      <div
        className={`right-[2px] dark:left-[2px] absolute bg-white dark:bg-black w-6 h-6 rounded-full shadow-md transform transition-transform duration-300`}
      />
      <Sun
        className='ml-auto text-black'
        size={18}
        strokeWidth={2}
      />
    </div>
  );
}
