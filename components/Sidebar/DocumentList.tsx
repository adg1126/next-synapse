'use client';
import React, { useState } from 'react';

import { DocumentListProps } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import SidebarItem from './SidebarItem';
import { FileIcon } from 'lucide-react';

const MAX_LEVEL = 50;

export default function DocumentList({
  parentDocumentId,
  level = 0,
}: DocumentListProps) {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getDocuments, {
    parentDocument: parentDocumentId,
  });

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        {level === 0 && (
          <div className='py-2'>
            <SidebarItem.Skeleton
              width='40%'
              level={level}
            />
          </div>
        )}
        <SidebarItem.Skeleton
          width='50%'
          level={level}
          withIcon
        />
        <SidebarItem.Skeleton
          width='60%'
          level={level}
          withIcon
        />
        <SidebarItem.Skeleton
          width='60%'
          level={level}
          withIcon
        />
        <SidebarItem.Skeleton
          width='80%'
          level={level}
          withIcon
        />
        <SidebarItem.Skeleton
          withIcon
          level={level + 1}
          width='50%'
        />
        <SidebarItem.Skeleton
          withIcon
          level={level + 2}
          width='80%'
        />
        <SidebarItem.Skeleton
          withIcon
          level={level + 2}
          width='70%'
        />
        <SidebarItem.Skeleton
          withIcon
          width='80%'
          level={level}
        />
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : '' }}
        className={cn(
          'hidden text-sm font-medium text-muted-foreground/80',
          expanded && 'last:block',
          level === 0 && 'hidden'
        )}
      >
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <SidebarItem
            id={document._id}
            onClick={() => handleRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => handleExpand(document._id)}
            expanded={expanded[document._id]}
            maxLevel={MAX_LEVEL}
          />
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
}
