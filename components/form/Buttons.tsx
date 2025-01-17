'use client';
import { useFormStatus } from "react-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

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
