import React from 'react';
import { CartItem } from '@prisma/client';
import { FirstColumn, SecondColumn, ThirdColumn, FourthColumn } from './CartItemColumns';
import { CartItemWithProduct } from '@/utils/types';
import { Card } from '../ui/card';
import {Mode} from '@/components/singleProduct/SelectProductAmount';

function CartItemsList({items}:{items:CartItemWithProduct[]}) {
  return (
    <section>
      {
        items.map((item:CartItemWithProduct,index)=> {
          const {id,quantity}= item;
          const {name,image,company, price} = item.product;
          return (
              <Card className='grid grid-cols-4 p-8' key={item.id}>
                <FirstColumn image={image} name={name}/>
                <SecondColumn name={name} company={company} /> 
                <ThirdColumn quantity={quantity} key={id} cartItemId={id}/> 
                <FourthColumn amount={price} /> 
              </Card>
          )
        })  
      }
    </section>
  )
}

export default CartItemsList