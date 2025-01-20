import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useFormState } from 'react-dom';
import { describe } from 'node:test';


export type textAreaProps = {
    className?:string,
    name: string,
    labelText: string,
    defaultValue: string
}

function TextAreaInput({name, labelText, defaultValue}:textAreaProps) {
  return (
    <div className='mb-2'>
        <Label htmlFor={name}  className='capitalize' >{labelText} </Label>
        <Textarea id={name} name={name} rows={5} defaultValue={defaultValue} />
    </div>
  )
}

export default TextAreaInput