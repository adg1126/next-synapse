'use client';
import React from 'react';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { ConvexError } from 'convex/values';
import { cn } from '@/lib/utils';

import { toast } from 'sonner';

export default function NewNoteButton({
  label,
  hintLabel,
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
      className={cn(className)}
      onClick={handleCreateDocument}
    >
      {icon}
      {label}
    </div>
  );
}
