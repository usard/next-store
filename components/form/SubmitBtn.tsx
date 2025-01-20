'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';


type submitBtnProps = {
    className?:string,
    btnText?: string,
    size?: 'default' | 'lg' | 'sm' ,
    variant:'default' | 'destructive' | 'outline' | 'secondary' | 'ghost',
}
function SubmitBtn({btnText, className, size, variant}:submitBtnProps) {
     const {pending} = useFormStatus()
     btnText= btnText? btnText: 'submit';
     
  return (
    <Button className={className} disabled={pending} size={size} variant={variant} type='submit'>
        { pending ? (
            <>
              <Loader2 className="animate-spin" /> 'Please wait'
            </>
          ) : btnText
        }

    </Button>
  )
}

export default SubmitBtn