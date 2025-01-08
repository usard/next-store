'use client';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator, 
  DropdownMenuLabel } from '@/components/ui/dropdown-menu';

import { BiMenuAltLeft } from "react-icons/bi";
import { Button } from '../ui/button';
import { links} from '@/utils/links';
import Link from 'next/link';




function LinksDropdown() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
          <BiMenuAltLeft />

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>  {/* will align this container to the beginning of menu icon on the page */}
          {
            links.map((link) => {
              return ( 
              <DropdownMenuItem key={link.id}>
                <Link href={link.href}> 
                  {link.text}
                </Link>
              </DropdownMenuItem>
              )
            })
          }        
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown;