'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '../ui/breadcrumb';

import CustomBreadcrumbItem from './CustomBreadcrumbItem';
import { Id } from '@/convex/_generated/dataModel';

export default function CustomBreadcrumb() {
  const { documentId } = useParams();

  return (
    <Breadcrumb>
      <BreadcrumbList className='flex flex-row-reverse items-center'>
        {documentId.length && (
          <>
            <CustomBreadcrumbItem id={documentId as Id<'documents'>} />
            <BreadcrumbItem className='hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-sm p-1 font-normal'>
              <Link href='/documents'>Documents</Link>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
