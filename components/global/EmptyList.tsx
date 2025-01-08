import { cn } from '@/lib/utils';
import React from 'react';

function EmptyList({heading='Not Found...', className}:
  {
    heading?: string, 
    className?: string
  }) {
  return (
    <h2 className={cn('text-xl', className)}>{heading}</h2>
  )
}

export default EmptyList;