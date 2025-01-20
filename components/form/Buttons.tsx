'use client';
import { useFormStatus } from "react-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa";


type actionType = 'edit' | 'delete';
export const IconButton = ({actionType}:{actionType: actionType}) => {
  const {pending } = useFormStatus();

  const renderIcon = () => {
    if (actionType === 'edit') {
      return <CiEdit />
    }
    if (actionType === 'delete') {
      return <RiDeleteBin5Line />
    }
  }

  return (
    <Button type='submit' variant='outline' className="text-black">
      {pending ?<Loader2 /> : renderIcon()}
    </Button>
  )
}

export const CardSignInButton = () => {

  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className="p-2 cursor-pointer"
        asChild
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  )

}

export const CardSubmitButton = ({isFavorite}:{isFavorite: boolean}) => {
  const {pending} = useFormStatus();
  return ( 
    <Button 
      type='submit'
      variant='outline'
      size='icon'
    >
      {pending ? <Loader2 className="animate-spin" />: isFavorite? <FaHeart />: <FaRegHeart />}
    </Button> 
   )
}

