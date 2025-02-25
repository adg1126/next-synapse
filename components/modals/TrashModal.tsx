'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';
import { ConvexError } from 'convex/values';

import { useAppDispatch } from '@/hooks/redux';
import { setModalOpen } from '@/redux/modal/modalSlice';

import { toast } from 'sonner';
import Spinner from '../Spinner';
import { Search, Trash, Undo2 } from 'lucide-react';
import { Input } from '../ui/input';
import ConfirmModal from './ConfirmModal';
import { buttonVariants } from '../ui/button';
import Hint from '../Hint';

export default function TrashModal() {
  const router = useRouter(),
    params = useParams();

  const dispatch = useAppDispatch();

  const documents = useQuery(api.documents.getArchived),
    restore = useMutation(api.documents.restore),
    remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState('');

  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleReroute = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const handleRestoreDocument = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<'documents'>
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });

    promise
      .then(() => {
        toast.success('Document restored');
      })
      .catch((err) => {
        const errorMessage =
          err instanceof ConvexError
            ? (err.data as { message: string }).message
            : 'Failed to restore document.';

        toast.error(errorMessage);
      });
  };

  const handleRemoveDocument = (documentId: Id<'documents'>) => {
    const promise = remove({ id: documentId });

    promise
      .then(() => {
        toast.success('Document deleted');
      })
      .catch((err) => {
        const errorMessage =
          err instanceof ConvexError
            ? (err.data as { message: string }).message
            : 'Failed to delete document.';

        toast.error(errorMessage);
      });

    if (params.documentId === documentId) {
      router.push('/documents');
    }
  };

  const handleDeleteModalOpen = (newVal: boolean) => {
    dispatch(setModalOpen({ modalName: 'delete', modalOpen: newVal }));
  };

  if (documents === undefined) {
    return (
      <div className='h-full flex items-center justify-center p-4'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='text-sm'>
      <div className='relative w-full 1 p-2'>
        <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
          <Search
            className='h-4 w-4'
            color='grey'
          />
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='h-7 px-2 focus-visible:ring-transparent bg-secondary'
          placeholder='Search pages in the Trash'
        />
      </div>
      <div className='mt-2 px-1 pb-1'>
        <p className='hidden last:block text-xs text-center pb-2'>
          No documents found
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role='button'
            className='text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between'
          >
            <span
              className='truncate pl-2 w-full'
              onClick={() => {
                handleReroute(doc._id);
              }}
            >
              {doc.title}
            </span>
            <div className='flex items-center'>
              <div
                onClick={(e) => handleRestoreDocument(e, doc._id)}
                role='button'
                className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              >
                <Hint
                  side='bottom'
                  label='Restore'
                >
                  <Undo2 className='h-4 w-4 text-muted-foreground' />
                </Hint>
              </div>
              <ConfirmModal
                header='Delete document?'
                description='This will delete the document and all of the documents nested inside it.'
                onConfirm={() => {
                  handleRemoveDocument(doc._id);
                }}
                onCancel={() => handleDeleteModalOpen(false)}
                confirmButtonClassName={buttonVariants({
                  variant: 'destructive',
                })}
              >
                <div
                  role='button'
                  className='rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  onClick={() => handleDeleteModalOpen(true)}
                >
                  <Hint
                    side='bottom'
                    label='Delete from trash'
                  >
                    <Trash className='h-4 w-4 text-muted-foreground' />
                  </Hint>
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
