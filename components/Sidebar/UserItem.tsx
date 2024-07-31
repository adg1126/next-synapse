'use client';
import React from 'react';

import { cn } from '@/lib/utils';

import { UserItemProps } from '@/types';

import { ChevronDown, ChevronRight } from 'lucide-react';

export default function UserItem({
  id,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpanded,
  label,
  icon: Icon,
  onClick,
}: UserItemProps) {
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

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
          className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
          onClick={() => {}}
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
    </div>
  );
}
