// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';
// import db from '@/utils/db';

// export const POST = async(req:NextRequest) => {
//     console.log('cart and order')
//     // const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
//     const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
//     const requestHeaders = new Headers(req.headers);
//     const origin = requestHeaders.get('origin');
//     const {orderId, cartId} = await req.json();
//     console.log('order and cart :', orderId, cartId);
//     const order = await db.order.findUnique({
//         where:{
//             id: orderId
//         }
//     })
//     const cart = await db.cart.findUnique({
//         where:{
//             id: cartId
//         },
//         include:{
//             cartItems:{
//                 include: {
//                     product: true
//                 }
//             }
//         }
//     })

//     if(!cart || !order) return Response.json(null,{
//         status: 404,
//         statusText:'not found'
//     })
//     const line_items=cart.cartItems.map((item)=>{
//         return (
//             {
//                 quantity: item.quantity,
//                 price_data: {
//                   currency: 'usd',
//                   product_data: {
//                     name: item.product.name,
//                     images: [item.product.image],
//                   },
//                   unit_amount: item.product.price * 100, // price in cents
//                 },
//               }
//         )
//     });
//     const session = await stripe.checkout.sessions.create({
//         ui_mode: 'embedded',
//         metadata:{orderId, cartId},
//         line_items: line_items,
//         mode: 'payment',
//         return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`
//     })
//     return NextResponse.json({clientSecret:session.client_secret});
// }

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from 'next/server';
import db from '@/utils/db';

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get('origin');

  const { orderId, cartId } = await req.json();

  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await db.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }
  // line items
  const line_items = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.quantity,
      price_data: {
        currency: 'usd',
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100, // price in cents
      },
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      metadata: { orderId, cartId },
      line_items: line_items,
      mode: 'payment',
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
