
import React from 'react';
import Link  from 'next/link';
import { Button } from '../ui/button';
import { LuShoppingCart } from "react-icons/lu";


function CartButton() {
  return (
    <Button asChild variant='outline' className='relative'>
      <Link href='/cart'>
        <LuShoppingCart />
        <span className='absolute w-6 h-6 -top-3 -right-3 flex items-center justify-center rounded-full bg-primary text-xs'>7</span>
      </Link>
    </Button>
  )
}

export default CartButton;