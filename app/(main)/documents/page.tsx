'use client';
import React from 'react';
import Image from 'next/image';

import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Documents() {
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const handleCreateDocument = () => {
    const promise = create({ title: 'Untitled' });

    promise
      .then(() => {
        toast.success('Document created');
      })
      .catch(() => {
        toast.error('Failed to create document');
      });
  };

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
      <Button onClick={handleCreateDocument}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  );
}
