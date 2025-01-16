import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export type imageInputProps = {
  name: string,
  labelText: string,
}
function ImageInput({name, labelText}:imageInputProps) {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize text-md'>{labelText}</Label>
      <Input id={name} name={name} type='file' required accept='image/*' />
    </div>
  )
}

export default ImageInput