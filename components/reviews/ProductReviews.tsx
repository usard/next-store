import { fetchProductReviews } from '@/utils/actions';
import React from 'react';
import ReviewCard from './ReviewCard';


async function ProductReviews({productId}:{productId:string}) {
    const reviews = await fetchProductReviews(productId);
    console.log('reviews :', reviews)
  return (
    <div className='grid md:grid-cols-2'>
        {
            reviews.map((review, index) => {
                return <ReviewCard review={review} />
            })                                                                                  
        }
    </div>
  )
}

export default ProductReviews