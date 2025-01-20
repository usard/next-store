import React from 'react';
import { Skeleton } from '../ui/skeleton';

function LoadingTable({rows=5}:{rows?:number}) {
    const skeletonRows = Array.from({length: rows},(_,index)=>{
        return <Skeleton className='my-2 h-8 w-full rounded' />
    })
  return (<div>{skeletonRows}</div>)
}

export default LoadingTable;