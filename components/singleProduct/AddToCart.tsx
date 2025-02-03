'use client'
import React, {useState} from 'react';
import { useAuth } from '@clerk/nextjs';
import { Button } from '../ui/button'
import { CardSignInButton } from '../form/Buttons';
import SelectProductAmount from './SelectProductAmount';
import {Mode} from './SelectProductAmount';
import FormContainer from '../form/FormContainer';
import { addToCartAction } from '@/utils/actions';
import SubmitBtn from '../form/SubmitBtn';

function AddToCart({productId}:{productId:string}) {
  const {userId} = useAuth();
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <SelectProductAmount  mode={Mode.SingleProduct} amount={quantity} setAmount={setQuantity} />
     { userId?
        <FormContainer action={addToCartAction}>
          <input type="hidden" name='productId' value={productId} />
          <input type="hidden" name='amount' value={quantity} />
         
          <SubmitBtn btnText='add to cart' variant='default' />
        </FormContainer>
        :
        <CardSignInButton>
          <Button  className='bg-green-500 w-24' size='icon' >
              Add to cart
          </Button>
        </CardSignInButton>
      }
    </div>
  )
}

export default AddToCart;