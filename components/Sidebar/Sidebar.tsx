'use client';
import React, { ElementRef, useCallback, useEffect, useRef } from 'react';

import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { cn } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  setIsCollapsed,
  setIsResetting,
  setSidebarWidth,
} from '@/redux/sidebar/sidebarSlice';
import { selectSidebar } from '@/redux/sidebar/sidebarSelectors';

import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { ConvexError } from 'convex/values';

import {
  ChevronsLeft,
  MenuIcon,
  NotebookPen,
  PlusCircle,
  Search,
  Settings,
} from 'lucide-react';
import SidebarSwitcher from '@/components/Sidebar/SidebarSwitcher';
import NewNoteButton from '../NewNoteButton';
import Hint from '../Hint';
import SidebarItem from './SidebarItem';
import { toast } from 'sonner';
import DocumentList from './DocumentList';

export default function Sidebar() {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const create = useMutation(api.documents.create);

  const dispatch = useAppDispatch();
  const sidebar = useAppSelector(selectSidebar);
  const { sidebarWidth, navbarLeft, navbarWidth, isResetting, isCollapsed } =
    sidebar;

  const isResizingRef = useRef(false),
    sidebarRef = useRef<ElementRef<'aside'>>(null),
    navbarRef = useRef<ElementRef<'div'>>(null);

  const setStyle = ({
    sidebarWidth,
    navbarLeft,
    navbarWidth,
  }: {
    sidebarWidth: string;
    navbarLeft: string;
    navbarWidth: string;
  }) => {
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = sidebarWidth;
      navbarRef.current.style.setProperty('left', navbarLeft);
      navbarRef.current.style.setProperty('width', navbarWidth);
    }
  };

  useEffect(() => {
    setStyle({ sidebarWidth, navbarLeft, navbarWidth });
  }, [sidebarWidth, navbarLeft, navbarWidth]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      dispatch(
        setSidebarWidth({
          sidebarWidth: `${newWidth}px`,
          navbarLeft: `${newWidth}px`,
          navbarWidth: `cacl(100% - ${newWidth}px)`,
        })
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      dispatch(setIsCollapsed(false));
      dispatch(setIsResetting(true));

      dispatch(
        setSidebarWidth({
          sidebarWidth: isMobile ? '100%' : '240px',
          navbarLeft: isMobile ? '100%' : '240px',
          navbarWidth: isMobile ? '0' : 'calc(100% - 240px)',
        })
      );
      setTimeout(() => dispatch(setIsResetting(false)), 300);
    }
  }, [isMobile, dispatch]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      dispatch(setIsCollapsed(true));
      dispatch(setIsResetting(true));

      dispatch(
        setSidebarWidth({
          sidebarWidth: '0',
          navbarLeft: '0',
          navbarWidth: '100%',
        })
      );
      setTimeout(() => dispatch(setIsResetting(false)), 300);
    }
  }, [dispatch]);

  useEffect(() => {
    isMobile ? collapse() : resetWidth();
  }, [isMobile, resetWidth, collapse]);

  useEffect(() => {
    if (isMobile) collapse();
  }, [isMobile, collapse, pathname]);

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
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div className='absolute top-3 right-2 flex flex-row items-start gap-x-2'>
          <div>
            <Hint label='Close Sidebar'>
              <div
                role='button'
                onClick={collapse}
                className={cn(
                  'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 opacity-0 group-hover/sidebar:opacity-100 transition',
                  isMobile && 'opacity-100'
                )}
              >
                <ChevronsLeft className='h-6 w-6' />
              </div>
            </Hint>
          </div>
          <Hint
            side='right'
            label='Create a New Note'
          >
            <div>
              <NewNoteButton
                className='flex items-center justify-center h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 opacity-100'
                icon={<NotebookPen className='h-5 w-5' />}
              />
            </div>
          </Hint>
        </div>

        <div>
          <SidebarSwitcher />
          <Hint
            label='Search and quickly jump to a page'
            side='right'
          >
            <div>
              <SidebarItem
                label='Search'
                icon={Search}
                isSearch
                onClick={() => {}}
              />
            </div>
          </Hint>
          <Hint
            label='Search and quickly jump to a page'
            side='right'
          >
            <div>
              <SidebarItem
                label='Settings'
                icon={Settings}
                onClick={() => {}}
              />
            </div>
          </Hint>
          <Hint
            side='right'
            label='Create a New Note'
          >
            <div>
              <SidebarItem
                label='New page'
                icon={PlusCircle}
                onClick={handleCreateDocument}
              />
            </div>
          </Hint>
        </div>
        <div className='mt-4'>
          <DocumentList />
        </div>
        <div
          role='button'
          onMouseDown={handleMouseDown}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && (
            <MenuIcon
              role='button'
              className='h-6 w-6 text-muted-foreground'
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
}
