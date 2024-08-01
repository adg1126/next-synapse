'use client';
import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { api } from '@/convex/_generated/api';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectModal } from '@/redux/modal/modalSelectors';
import { setModalOpen } from '@/redux/modal/modalSlice';
import { ModalProvider } from '@/providers/modal-provider';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { FileIcon } from 'lucide-react';

export default function SearchCommand() {
  const router = useRouter(),
    { user } = useUser(),
    documents = useQuery(api.documents.getDocuments);

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => selectModal(state, 'search'));

  const handleSearchModalOpen = useCallback(
    (newVal: boolean) => {
      dispatch(setModalOpen({ modalName: 'search', modalOpen: newVal }));
    },
    [dispatch]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSearchModalOpen(!isOpen);
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleSearchModalOpen, isOpen]);

  const handleSelect = (id: string) => {
    router.push(`/documents/${id}`);
    handleSearchModalOpen(false);
  };

  return (
    <ModalProvider>
      <CommandDialog
        open={isOpen}
        onOpenChange={() => handleSearchModalOpen(!isOpen)}
      >
        <CommandInput placeholder={`Search ${user?.fullName}'s Synapse...`} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Documents'>
            {documents?.map((doc) => (
              <CommandItem
                key={doc._id}
                value={`${doc._id}-${doc.title}`}
                title={doc.title}
                onSelect={handleSelect}
              >
                {doc.icon ? (
                  <p className='mr-2 text-[18px]'>{doc.icon}</p>
                ) : (
                  <FileIcon className='mr-2 h-4 w-4' />
                )}
                <span>{doc.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </ModalProvider>
  );
}
