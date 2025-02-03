import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import { fetchOrCreateCart, updateCart } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
 
const CartPage = async() =>{
    const {userId} = auth();
    if(!userId) redirect('/')
    const prevCart = await fetchOrCreateCart(userId);
    const {cartItems, currentCart} = await updateCart(prevCart) // why we have currentcart and prev cart , we may have created cart long time ago, but the product prices might have changed so teh new total cart price and order price should be changed in the cart table according to that so we update the cart on visiting this cart page.
    // console.log('current cart :', currentCart)
    if(!cartItems.length) return <SectionTitle text='No items in cart...' />
    return (
        <>
            <SectionTitle text='shopping cart'/>
            <div className="mb-8"></div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                    <CartItemsList items={currentCart.cartItems}/>
                </div>
                <div className="col-span-4">
                    <CartTotals cart={currentCart}/>
                </div>
            </div>
        </>
    )
}

export default CartPage;