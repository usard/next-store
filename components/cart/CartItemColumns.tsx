'use client';
import { formatCurrency } from "@/utils/format";
import Image from "next/image";
import SelectProductAmount from "../singleProduct/SelectProductAmount";
import { useState } from "react";
import {Mode} from '@/components/singleProduct/SelectProductAmount';
import FormContainer from "../form/FormContainer";
import SubmitBtn from "../form/SubmitBtn";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";


export const FirstColumn = ({name,image}:{name:string, image:string}) => {
    return (
        <div className="relative h-24 w-24 sm:h-36 sm:w-36">
            <Image 
                src={image} 
                alt='product-image' 
                className="w-40 h-40 rounded-lg"
                priority
                width={400} // these are used to maintain aspect ratio, not real height and width of image on web page
                height={400}
            />
        </div>
    )
}

export const SecondColumn =({name, company}:{name:string, company:string}) => {
    return (
        <div>
            <h3>{name}</h3>
            <h4>{company}</h4>
        </div>
    )
}

export const ThirdColumn = ({quantity, cartItemId}:{quantity:number, cartItemId:string}) => {
    const [amount, setAmount] = useState(quantity);
    const [loading, setLoading] = useState(false)
    const {toast} = useToast();
    const handleAmount = async(value:number) : Promise<void> => {
        setLoading(true)
        toast({description:'calculating...'})
        await updateCartItemAction({amount:value, cartItemId})
        setLoading(false)
        setAmount(value);
        toast({description: 'updated cart'})
    }
    const removeCartItem = removeCartItemAction.bind(null, {cartItemId})
    return(
        <div>
            <h2>Amount</h2>
            <SelectProductAmount mode={Mode.CartItem} amount={amount} setAmount={handleAmount} isLoading={false} /> 
            <FormContainer action={removeCartItem}>
                <SubmitBtn btnText='remove' variant='default' />
            </FormContainer>
        </div>
    )
}

export const FourthColumn = ({amount}:{amount:number}) =>{
    return(
        <div>
            <span className="font-semibold">{formatCurrency(amount)}</span> 
        </div>
    )
}