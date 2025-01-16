import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator, 
  DropdownMenuLabel } 
from '@/components/ui/dropdown-menu';

import { BiMenuAltLeft } from "react-icons/bi";
import { Button } from '../ui/button';
import { links} from '@/utils/links';
import Link from 'next/link';
import { SignedIn, SignedOut, SignOutButton, SignInButton  } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';





function LinksDropdown() {
  const {userId} = auth();
  const isAdmin = userId === process.env.ADMIN_USER;
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
          <BiMenuAltLeft />

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>  {/* will align this container to the beginning of menu icon on the page */}
          <SignedIn>
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
            {
              isAdmin
                 &&   
              <DropdownMenuItem key={'dashboard'}>
                  <Link href={'/admin/sales'}> 
                    dashboard
                  </Link>
              </DropdownMenuItem>
            }
            <div>
              <DropdownMenuItem key='sign-out'>
                <SignOutButton />  
              </DropdownMenuItem>  
            </div>  
          </SignedIn>
          <SignedOut>
            <div>
              <DropdownMenuItem>
                <SignInButton />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href='/signup'>signup</Link>
              </DropdownMenuItem>
            </div>
          </SignedOut>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown;