'use client';
import React from 'react';
import Link from 'next/link';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import { useConvexAuth } from 'convex/react';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

import Logo from './Logo';
import ThemeSwitch from './ThemeSwitch';
import { Button, buttonVariants } from './ui/button';
import Spinner from './Spinner';

export default function Navbar() {
  const scrolled = useScrollTop({ threshold: 10 }),
    { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        'z-50 bg-background fixed top-0 flex items-center w-full p-6',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='ml-auto justify-end w-full flex items-center gap-x-2'>
        {isLoading && (
          <div className='hidden sm:block'>
            <Spinner />
          </div>
        )}
        {!isAuthenticated && !isLoading && (
          <div className='hidden sm:flex flex-row gap-x-2'>
            <div className={buttonVariants({ size: 'sm', variant: 'outline' })}>
              <SignInButton />
            </div>
            <div className={buttonVariants({ size: 'sm' })}>
              <SignUpButton />
            </div>
          </div>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Link href='/'>
              <Button
                variant='ghost'
                size='sm'
              >
                Enter Synapse
              </Button>
            </Link>
            <UserButton />
          </>
        )}
        <ThemeSwitch />
      </div>
    </div>
  );
}
