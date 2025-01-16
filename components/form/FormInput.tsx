import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export type formInputProps = {
    type: string,
    defaultValue:string,
    labelText: string,
    name: string

}

function FormInput({type, defaultValue, labelText, name}: formInputProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name} className='text-md capitalize'>{labelText}</Label>
        <Input 
            name={name}
            type={type} 
            defaultValue={defaultValue}
        />
    </div>
  )
}

export default FormInput;