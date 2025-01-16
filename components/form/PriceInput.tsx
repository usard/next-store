import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type priceInputProps = {
    name: string,
    labelText: string,
    defaultValue: number,

}

function PriceInput({name, labelText, defaultValue}:priceInputProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='text-md capitalize'>{labelText}</Label>
        <Input type='number' min={0} max={defaultValue || 100000} name={name} />
    </div>
  )
}

export default PriceInput;