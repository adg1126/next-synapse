'use client';
import React from 'react';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';

import { NewNoteButtonProps } from '@/types';

import { toast } from 'sonner';

export default function NewNoteButton({
  label,
  className,
  icon,
}: NewNoteButtonProps) {
  const create = useMutation(api.documents.create);

  const handleCreateDocument = () => {
    const promise = create({ title: 'Untitled' });

    promise
      .then(() => {
        toast.success('Document created');
      })
      .catch((err) => {
        const errorMessage =
          err instanceof ConvexError
            ? (err.data as { message: string }).message
            : 'Unexpected error occurred';

        toast.error(errorMessage);
      });
  };

  return (
    <div
      role='button'
      className={className}
      onClick={handleCreateDocument}
    >
      {icon}

      <span className='truncate'>{label}</span>
    </div>
  );
}
