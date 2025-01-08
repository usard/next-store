'use client';

import React from 'react';
import { Button } from '../ui/button';
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import {useTheme} from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function DarkMode() {
  const {setTheme} = useTheme();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button >
             <MdOutlineLightMode className='dark:hidden' />
             <FaRegMoon className='hidden dark:block'/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>System</DropdownMenuItem>
          <DropdownMenuItem onClick={()=> setTheme('light')}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>setTheme('dark')}>Dark</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

export default DarkMode