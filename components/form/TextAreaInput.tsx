import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useFormState } from 'react-dom';


export type textAreaProps = {
    className?:string,
    name: string,
    labelText: string,
}

function TextAreaInput({name, labelText}:textAreaProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name}  className='capitalize' >{labelText} </Label>
        <Textarea id={name} name={name} rows={5}/>
    </div>
  )
}

export default TextAreaInput