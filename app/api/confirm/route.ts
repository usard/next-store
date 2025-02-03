// import Stripe from "stripe";
// import db from '@/utils/db';
// import { NextRequest } from "next/server";



// export const GET = async(req: NextRequest)=>{
//     const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)
//     const {searchParams} = new URL(req.url);
//     const session_id = searchParams.get('session_id') as string;
//     try {
//         const session = await stripe.checkout.sessions.retrieve(session_id);
//         const metadata = session.metadata;
//         const orderId = metadata?.orderId;
//         const cartId = metadata?.cartId;
//         if (session.status === 'complete') {

//             await db.order.update(
//                 {
//                     where:{
//                         id:orderId
//                     },
//                     data:{isPaid:true}
//             })
//             await db.cart.delete({
//                 where:{
//                     id: cartId
//                 }
//             })
//         }
//     }
//     catch(error){
//         console.log(error)
//     }
// }


import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from 'next/navigation';

import { type NextRequest } from 'next/server';
import db from '@/utils/db';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get('session_id') as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const orderId = session.metadata?.orderId;
    const cartId = session.metadata?.cartId;

    if (session.status === 'complete') {
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });
    }
    await db.cart.delete({
      where: {
        id: cartId,
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
  redirect('/orders');
};
