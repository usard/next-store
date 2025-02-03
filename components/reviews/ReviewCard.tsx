 'use client';
import {useState} from 'react'
import {Card, CardHeader, CardContent }from '../ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function ReviewCard({review}:{review:any}) {
const longComment = review.comment?.length >130 || false;
const [expanded, setExpanded] = useState(false);
const renderComment = (comment:string) => {
  if (longComment) {
    if (expanded) {
      return <>{comment} <Button type='button' variant='outline' onClick={()=> {setExpanded(!expanded)}}>show less</Button></>
    }
    else {
      return <>{comment.split('').slice(0,130).join('')+'...'} <Button type='button' variant='outline' onClick={()=>{setExpanded(!expanded)}}>show more</Button></>
    }
  }
  else {
    return <>{comment}</>
  }

}

  return (
    <Card>
      <CardHeader>
        <div className='flex gap-x-3 items-center'>
          <Image src={review?.authorImageUrl} alt={review.id} width={30} height={30} className='rounded-full' />
          <span className='font-semibold'>{review.authorName}</span>
        </div>
      </CardHeader>
      <CardContent className='relative'>
        <p>{renderComment(review.comment)}</p>
        {/* longComment && expanded? review.comment?.split('').slice(0,130)+'...' : review.comment */}
      </CardContent>
    </Card>
  )
}

export default ReviewCard