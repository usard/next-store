import React from 'react';
import { Separator } from '../ui/separator';

function SectionTitle({text}:{text:string}) {
  return (
    <div>
      <h2 className='text-3xl tracking-wider font-medium mb-8 capitalize'>
        {text}
      </h2>
      <Separator />
    </div>
  )
}

export default SectionTitle;