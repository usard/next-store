'use client';
import React from 'react';
import { Button } from '../ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import FormContainer from '../form/FormContainer';
import { favoriteToggleAction } from '@/utils/actions';
import { usePathname } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { CardSubmitButton } from '../form/Buttons';


type favoriteToggleFormProps = {
  favoriteId: string|null,
  productId: string,
}

function FavouriteToggleForm({favoriteId, productId}:favoriteToggleFormProps) {
  const {pending} = useFormStatus();
  const pathName = usePathname();
  const favoriteToggle = favoriteToggleAction.bind(null, {favoriteId, productId, pathName})
  console.log('pending :', pending)

  return (
    <FormContainer action={favoriteToggle} >
      <CardSubmitButton isFavorite={favoriteId? true: false}/>
    </FormContainer>
  )
}

export default FavouriteToggleForm;