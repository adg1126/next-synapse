import React from 'react';
import Image from 'next/image';

import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function Logo() {
  return (
    <div className='flex items-center gap-x-2'>
      <Image
        className='block dark:hidden'
        src='/logo.svg'
        alt='logo'
        width={40}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
      />
      <Image
        className='hidden dark:block'
        src='/logo-dark.svg'
        alt='logo'
        width={40}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
      />
      <p className={cn('font-semibold', font.className)}>Synapse</p>
    </div>
  );
}
