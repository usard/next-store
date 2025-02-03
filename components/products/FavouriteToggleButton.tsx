import React, {useState} from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from '../ui/button';
import { auth } from '@clerk/nextjs/server';
import FavouriteToggleForm from './FavouriteToggleForm';
import { fetchFavoriteId } from '@/utils/actions';
import { CardSignInButton } from '../form/Buttons';


async function FavouriteToggleButton({productId}:{productId:string}) {
  const {userId} = auth();
  if (!userId) return <CardSignInButton><FaRegHeart/></CardSignInButton>;
  const favoriteId = await fetchFavoriteId(productId)   

  return (
    <FavouriteToggleForm favoriteId={favoriteId} productId={productId} /> 
  
  )
}

export default FavouriteToggleButton;