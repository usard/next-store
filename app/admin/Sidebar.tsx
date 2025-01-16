'use client'
import React from 'react';
import { adminLinks } from '@/utils/links';
import Link  from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';


function Sidebar({className}:{className: string}) {
    const path = usePathname();
   
  return (
    <aside className={className}>
        <div className='border-r-2'>
            { 
                adminLinks.map((link, index)=>{
                    const activePage = path === link.href
                    return (
                            <Button key={link.text} asChild variant={activePage? 'default': 'ghost'} className='py-2 my-2 font-normal text-sm'>
                                <Link  href={link.href} className='text-xl'>{link.text}</Link>
                            </Button>
                            )
                })
            }
        </div>
    </aside>
  )
}

export default Sidebar;