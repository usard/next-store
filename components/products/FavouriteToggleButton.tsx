import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';

function FavouriteToggleButton({productId}:{productId:string}) {
  return (
    <Button size='icon' variant='outline' className='p-2'>
      <FaHeart />
    </Button>
  )
}

export default FavouriteToggleButton;