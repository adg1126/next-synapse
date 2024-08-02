'use client';
import React, { useRef, useState } from 'react';

import { TitleProps } from '@/types';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Title({ initialData }: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [isEditing, setIsEditing] = useState(false),
    [title, setTitle] = useState(initialData.title || 'Untitled');

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      id: initialData._id,
      title: e.target.value || 'Untitled',
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          value={title}
          className='h-7 px-2 focus-visible:ring-transparent'
        />
      ) : (
        <Button
          onClick={enableInput}
          variant='ghost'
          size='sm'
          className='font-normal h-auto p-1 hover:bg-neutral-300 dark:hover:bg-neutral-700'
        >
          <span className='truncate text-primary font-medium'>
            {initialData?.title}
          </span>
        </Button>
      )}
    </div>
  );
}
