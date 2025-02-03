'use client';
import React, {Suspense, useState} from 'react';
import {Rating, Skeleton } from '@mui/material';
import {  mutateReviewRatingAction, createReviewAction } from '@/utils/actions';
import TextAreaInput from '../form/TextAreaInput';
import FormContainer from '../form/FormContainer';
import SubmitBtn from '../form/SubmitBtn';
import { usePathname } from 'next/navigation';
import { IconButton } from '@/components/form/Buttons';
import {Button} from '@/components/ui/button';

const LoadingRating = () => {
    return <Skeleton  className='h-20 w-40'/>
}


export default function ReviewRating({productId,rating, comment}:{productId:string, rating:number, comment:string}){
    const pathName = usePathname();
    // const mutateReviewRating = mutateReviewRatingAction.bind(null,{productId, pathName});
    return (
        <FormContainer action={mutateReviewRatingAction}>
            <input type="hidden" name='productId' value={productId} />
            <input type="hidden" name='path' value={pathName} />
            <Rating
                name="rating"
                onChange={(event, newValue) => {
                    console.log('new value :', newValue)
                }}
                defaultValue={rating}
                />
            <TextAreaInput name='comment' labelText="comment" defaultValue={comment} />
            <SubmitBtn btnText='submit' variant='default' /> 
        </FormContainer>
        )}