import Link from 'next/link';
import React from 'react';
import { AiFillBehanceSquare } from "react-icons/ai";
import { Button } from '../ui/button';

function Logo() {
  return (
    <Button size='icon' asChild> 
    {/* you can use asChild to render the button styles on a Link component without breaking accessibility or styling. */}
      <Link href='/about'>
        <AiFillBehanceSquare />
      </Link>
    </Button>
  )
}

export default Logo;