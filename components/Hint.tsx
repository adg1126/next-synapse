import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { TooltipProps } from '@/types';

export default function Hint({
  label,
  subtitle,
  children,
  side,
  align,
  sideOffset,
  alignOffset,
}: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className='text-white bg-black border-black'
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
        >
          <p className='font-semibold'>{label}</p>
          <span className='text-muted-foreground font-semibold text-sm'>
            {subtitle}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
