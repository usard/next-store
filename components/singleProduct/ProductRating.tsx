import { Rating } from '@mui/material';
import React from 'react';
import { getProductRating } from '@/utils/actions';

async function ProductRating({id}:{id:string}) {
  const {rating, count} = await getProductRating(id )
  return (
    <div className='flex items-center gap-x-1'>
      <Rating value={Number(rating)} readOnly />
      <span>{`(${count})`}</span>
    </div>
  )
}

export default ProductRating;