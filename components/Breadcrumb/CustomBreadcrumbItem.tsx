'use client';
import React from 'react';
import { useParams } from 'next/navigation';

import { CustomBreadcrumbItemProps } from '@/types';

import { Id } from '@/convex/_generated/dataModel';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

import { BreadcrumbItem, BreadcrumbSeparator } from '../ui/breadcrumb';
import { Slash } from 'lucide-react';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Title from '../Title';

export default function CustomBreadcrumbItem({
  id,
}: CustomBreadcrumbItemProps) {
  const { documentId } = useParams();
  const documents = [
    useQuery(api.documents.getDocumentById, {
      documentId: id,
    }),
  ];

  if (documents.length === 0) {
    return;
  }

  return documents.map((doc, i) => (
    <React.Fragment key={i}>
      {/* <BreadcrumbItem
        className={cn(
          'hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm p-1',
          documentId === doc?._id && 'text-primary'
        )}
      >
        <Link href={`/documents/${doc?._id}`}>{doc?.title}</Link>
      </BreadcrumbItem> */}
      {documentId === doc?._id ? (
        <BreadcrumbItem
          className={
            'hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm p-1 text-primary font-medium'
          }
        >
          <Title initialData={doc} />
        </BreadcrumbItem>
      ) : (
        <BreadcrumbItem
          className={
            'hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm p-1 font-normal'
          }
        >
          <Link href={`/documents/${doc?._id}`}>{doc?.title}</Link>
        </BreadcrumbItem>
      )}
      <BreadcrumbSeparator>
        <Slash style={{ rotate: '-20deg' }} />
      </BreadcrumbSeparator>
      {doc?.parentDocument && (
        <CustomBreadcrumbItem id={doc?.parentDocument as Id<'documents'>} />
      )}
    </React.Fragment>
  ));
}
