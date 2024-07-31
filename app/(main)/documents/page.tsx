'use client';
import React from 'react';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';

import { buttonVariants } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import NewNoteButton from '@/components/NewNoteButton';

export default function Documents() {
  const { user } = useUser();

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        height={300}
        width={300}
        alt='empty'
        className='w-auto h-auto'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Synapse
      </h2>
      <NewNoteButton
        className={buttonVariants()}
        label='Create a note'
        icon={<PlusCircle className='h-4 w-4 mr-2' />}
      />
    </div>
  );
}
