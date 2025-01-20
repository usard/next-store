'use client';
import React, { useState } from 'react';
import ImageInput from './ImageInput';
import FormContainer from './FormContainer';
import SubmitBtn from './SubmitBtn';
import { updateProductAction, updateProductImageAction } from '@/utils/actions';
import Image from 'next/image';
// import { Button } from '../ui/button';



type updateImageProps = {
    src: string,
    children: React.ReactNode
}

function UpdateImage({src, children}:updateImageProps) {
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false)
    return ( 
            <div>
                <div>
                    <Image 
                        src={src} 
                        alt={src} 
                        priority 
                        height={200} 
                        width={200} 
                        className='h-[200px] w-[200px] rounded'
                    />
                    <button className='mt-2 text-sm p-2 bg-green-300 rounded' onClick={()=>{setIsUpdateFormVisible(prev=> !prev)}} type='button'>update image</button>
                </div>
                {
                    isUpdateFormVisible && (
                        <FormContainer action={updateProductImageAction} >
                            {children}
                            <ImageInput name='image' labelText='image' />
                            <SubmitBtn btnText='upload' variant='outline' size='lg' />
                        </FormContainer>
                    )
                }
            </div>
            )
}


export default UpdateImage;