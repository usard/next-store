import React from 'react'
import { Card, CardContent} from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function LoadingContainer() {
  return (
    <div className='mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <LoadingProduct />
      <LoadingProduct />
      <LoadingProduct /> 
    </div>
  )
}


export function LoadingProduct() {
  return (
    <Card>
      <CardContent className='p-4'>
        <Skeleton className='h-48 ' />
        <Skeleton className='h-8 mt-2 w-3/4'/>
        <Skeleton className='h-4 mt-2 w-1/2'/>
      </CardContent>
    </Card>
  )
}
export default LoadingContainer;