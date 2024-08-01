'use client';
import React from 'react';

import { cn } from '@/lib/utils';

import { SidebarItemProps } from '@/types';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ConvexError } from 'convex/values';

import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner';

export default function SidebarItem({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
  label,
  icon: Icon,
  onClick,
  maxLevel,
}: SidebarItemProps) {
  const create = useMutation(api.documents.create);
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onExpand?.();
  };

  const handleCreateChildDocument = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!id) return;
    const promise = create({ title: 'Untitled', parentDocument: id });

    promise
      .then(() => {
        toast.success('Document created');
        if (!expanded) {
          onExpand?.();
        }
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
      onClick={onClick}
      role='button'
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className={cn(
        'group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium',
        active && 'bg-primary/5 text-primary',
        label === 'New page' && level === 0 && 'hidden'
      )}
    >
      {!!id && (
        <div
          role='button'
          className={cn(
            'h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1',
            level >= maxLevel! && 'invisible'
          )}
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />
      )}
      <span className='truncate'>{label}</span>
      {!!id && (
        <div
          className={cn(
            'ml-auto flex items-center gap-x-2',
            level >= maxLevel! && 'invisible'
          )}
        >
          <div
            role='button'
            onClick={handleCreateChildDocument}
            className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:bg-neutral-600'
          >
            <Plus className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
}

SidebarItem.Skeleton = function SidebarItemSkeleton({
  level,
  width = '50%',
  withIcon = false,
}: {
  level?: number;
  width?: string;
  withIcon?: boolean;
}) {
  return (
    <div
      className='flex flex-row gap-x-2 py-[3px] px-3'
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : '12px',
        width: width,
      }}
    >
      {withIcon && (
        <Skeleton className='bg-neutral-300 h-4 w-4 animate-pulse' />
      )}
      <Skeleton className='bg-neutral-300 rounded-lg h-4 w-[calc(100%-16px)] animate-pulse' />
    </div>
  );
};
