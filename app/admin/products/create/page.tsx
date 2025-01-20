'use client'
import React from 'react';
import FormContainer from '@/components/form/FormContainer';
import { Separator } from '@/components/ui/separator';
import  FormInput  from '@/components/form/FormInput';
import PriceInput from '@/components/form/PriceInput';
import ImageInput from '@/components/form/ImageInput';
import TextAreaInput from '@/components/form/TextAreaInput';
import { productCreateAction } from '@/utils/actions';
import CheckboxInput from '@/components/form/CheckboxInput';
import SubmitBtn from '@/components/form/SubmitBtn';

function CreateProductsPage() {
  return (
    <section>
      <h1 className='text-2xl capitalize mb-2'> create product</h1>
      <div className='border border-muted p-8'>
        <FormContainer action={productCreateAction}>
            <div className='grid md:grid-cols-2 gap-2'>
              <FormInput  type='text' name='name' defaultValue='' labelText='product name'/>
              <FormInput  type='text' name='company' defaultValue='' labelText='company'/>
              <PriceInput name='price' defaultValue={0} labelText='price' />
              <ImageInput name='image' labelText='image'/>
            </div>
            <TextAreaInput className='mb-6' 
                  name='description' 
                  labelText='description' 
                  defaultValue=''
            />
            <div >
                <CheckboxInput labelText='featured' name='featured' />
            </div>
            <SubmitBtn variant='default'  size='lg' btnText='create product' className='mt-4 px-4'/>
        </FormContainer>
      </div>
    </section>
  )
}

export default CreateProductsPage