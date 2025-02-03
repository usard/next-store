import { formatCurrency } from '@/utils/format'
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { Cart } from '@prisma/client';
import { Button } from '../ui/button';
import { Card, CardTitle } from '../ui/card';
import SubmitBtn from '../form/SubmitBtn';
import FormContainer from '../form/FormContainer';
import { createOrderAction } from '@/utils/actions';


function CartTotals({cart}:{cart:Cart}) {
 const {cartTotal, tax, shipping, orderTotal} = cart;
  return (
    <div>
        <Card className='p-4'>
            <CartTotalRow  label='cart total' amount={cartTotal} />   
            <CartTotalRow label='tax' amount={tax} />    
            <CartTotalRow  label='shipping' amount={shipping}/>
            <CardTitle className='text-2xl mt-6'>
                <CartTotalRow label='order total' amount={orderTotal} lastRow={true}/>  
            </CardTitle>
            {/* <Button type='button' className='w-full mt-4'>
              order now    
            </Button>   */}
            <FormContainer action={createOrderAction}>
                <SubmitBtn className='w-full mt-4 text-lg tracking-wide capitalize'  btnText='order now' variant='default' />
            </FormContainer>
        </Card>
    </div>
  )
}

export function CartTotalRow({label, amount, lastRow}:{label:string, amount:number, lastRow?:boolean}) {
    return (
        <>
            <p className='flex justify-between text-sm capitalize'>
                <span >{label}</span>
                <span>{formatCurrency(amount)}</span>
            </p>
            {lastRow? null: <Separator className='my-2'/>}
        </>   
    )

}

export default CartTotals
