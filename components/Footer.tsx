import React from 'react';
import Logo from '@/components/Logo';

export default function Footer() {
  return (
    <div className='flex items-center w-full p-6 bg-background z-50 justify-between'>
      <Logo />
      <p className='text-black font-semibold'>Synapse © 2024</p>
    </div>
  );
}
