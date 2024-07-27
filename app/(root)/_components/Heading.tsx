'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Heading() {
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
      <Button>
        Enter Synapse
        <ArrowRight className='h-4 w-4 ml-2' />
      </Button>
    </div>
  );
}
