'use client';
import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import { ArrowRight } from 'lucide-react';

import { useConvexAuth } from 'convex/react';
import { SignInButton } from '@clerk/nextjs';

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Organize your thoughts and boost productivity with the ultimate
        note-taking solution – <span className='underline'>Synapse</span>.
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        Synapse is the connected connected workspace where <br />
        better and faster work happens.
      </h3>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading ? (
        <Link href='/documents'>
          <Button>
            Enter Synapse
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </Link>
      ) : (
        <SignInButton>
          <Button size='lg'>
            Get Started
            <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
