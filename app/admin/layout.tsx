import React from 'react';
import { Separator } from '@/components/ui/separator';
import Sidebar from './Sidebar';

function Adminlayout({children}: {children: React.ReactNode}) {
  return (
    <section>
        <h2 className='text-2xl font-medium tracking-wider mt-8 capitalize text-muted-foreground'>dashboard</h2>
        <Separator className='my-2 mb-6' />
        <div className='grid grid-cols-12 gap-x-12'>
            <div className='col-span-2'>
                <Sidebar className='w-full'/>
            </div>
            <div className='col-span-10'>
                {children}
            </div>
        </div>
    </section>
  )
}

export default Adminlayout;