// 'use client';
import React, {useState} from 'react';
import { FaHeart } from 'react-icons/fa';
import { Button } from '../ui/button';
import { auth } from '@clerk/nextjs/server';
import FavouriteToggleForm from './FavouriteToggleForm';
import { fetchFavoriteId } from '@/utils/actions';;


async function FavouriteToggleButton({productId}:{productId:string}) {
  const {userId} = auth();
  const favoriteId = await fetchFavoriteId(productId)

  if(!userId) {return <></>}
  

  return (
    <FavouriteToggleForm favoriteId={favoriteId} productId={productId} /> 
  )
}

export default FavouriteToggleButton;