'use client';
import React, { useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectModal } from '@/redux/modal/modalSelectors';
import { setModalOpen } from '@/redux/modal/modalSlice';

import { Dialog, DialogHeader, DialogContent, DialogTitle } from '../ui/dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import ThemeSwitch from '../ThemeSwitch';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function SettingsModal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => selectModal(state, 'settings'));

  const handleSettingsModalOpen = useCallback(
    (newVal: boolean) => {
      dispatch(setModalOpen({ modalName: 'settings', modalOpen: newVal }));
    },
    [dispatch]
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === ',' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSettingsModalOpen(!isOpen);
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [handleSettingsModalOpen, isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => handleSettingsModalOpen(!isOpen)}
    >
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogHeader className='border-b pb-3'>
          <h2 className='text-lg font-medium'>My Settings</h2>
        </DialogHeader>
        <DialogDescription className='hidden'></DialogDescription>
        <div className='flex flex-col space-y-8'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col gap-y-1'>
              <Label>Appearance</Label>
              <span className='text-[0.8rem] text-muted-foreground'>
                Customize how Synapse looks on your device
              </span>
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
