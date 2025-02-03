'use server';
import db from '@/utils/db';
import { auth, currentUser, getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {imageSchema, ProductSchema, ReviewSchema} from '@/utils/schemas';
import { validateWithZodSchema } from '@/utils/schemas';
import { uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import {deleteImage} from '@/utils/supabase';
import { Cart } from '@prisma/client';

// const user = await currentUser();
const getAuthUser= async () =>{
    const user = await currentUser();
    if (!user) redirect('/');
    return user;
}

const getAdminUser = async() => {
    const user = await getAuthUser();
    console.log(user?.id == process.env.ADMIN_USER)
    if(user?.id !== process.env.ADMIN_USER) redirect('/')
    return user;
}

const renderError = (error: unknown) => {
    if (error instanceof Error) {
        return {message: error.message}
    }
    return {message: 'an error occured'}

}

export const fetchFeaturedProducts = async() => {
    const products = await db.productProfile.findMany({
        where:{
            featured: true
        }
    })
    return products;
}


export const fetchAllProducts = async({search}:{search?: string}) => {
    if (search == undefined) {
        console.log('i am passed')
        const products = await db.productProfile.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })
        return products;
    }
    const products = await db.productProfile.findMany({
        where:{
            OR:[
                {name:{contains: search, mode:'insensitive'}},
                {company:{contains: search, mode: 'insensitive'}}
            ]
        },
        orderBy:{
            createdAt: 'desc'
        }
    })
    return products;
}

export const fetchSingleProduct = async(productId:string) => {
    const product = await db.productProfile.findUnique({
        where:{
            id: productId
        }
    })
    if(!product) redirect('/products')
    return product;
}

export const addToCart = async(productId:string) => {

}


export const productCreateAction = async (prevState:any, formData:FormData): Promise<{message:string}> => {
   const user = await getAuthUser();
    try {
        const rawData = Object.fromEntries(formData);
        const image = formData.get('image') as File;
        const validatedFields = validateWithZodSchema(ProductSchema, rawData );
        const validateImage = validateWithZodSchema(imageSchema,  {image: image});
        const fullPath = await uploadImage(validateImage.image)

        await db.productProfile.create(    
            {
                data: {
                    ...validatedFields,
                    image: fullPath,
                    clerkId: user.id
                }
            }
        )
        revalidatePath('/admin/products')
        return {message: 'product created successfully'}
    }
    catch(error) {
        return renderError(error)
    }
}
// export const fetchSingleProduct = async (productId: string) => {
//     const product = await db.productProfile.findUnique({
//       where: {
//         id: productId,
//       },
//     });
//     if (!product) {
//       redirect('/products');
//     }
//     return product;
//   };

export const fetchAdminProducts = async() => {
    await getAdminUser();
    const products = await db.productProfile.findMany({
        orderBy:{
            createdAt: 'desc',
        }
    })
    return products;
}

export const deleteProductAction = async(prevState:{id:string}, formData:FormData): Promise<{message:string}> => {
    await getAdminUser();
    const {id} = prevState;
    console.log('delete form data :', formData.get('name'))

    try{
        const product = await db.productProfile.delete({
            where:{
                id: id
            }
        })
        await deleteImage(product.image)
        revalidatePath('/admin/products')
        return {message: 'product removed'}
    }
    catch(error){
        return renderError(error)
    }
}

export const updateProductAction = async(prevState:any, formData: FormData): Promise<{message:string}> => { // prevState is important here if not formData will be null
    await getAdminUser();
    console.log('form data :', formData)
    const id = formData.get('id') as string;
    const oldImage = formData.get('url') as File;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(ProductSchema, rawData);
    // const validateImage = validateWithZodSchema(imageSchema, image )
    try {
        await db.productProfile.update({
            where:{
                id: id
            },
            data:{
                ...validatedFields,

            }
        })
        revalidatePath(`/admin/products/${id}/edit`)
        return {message: 'product updated sucessfully'}
    }
    catch(error) {
      return  renderError(error)
    }
}

export const updateProductImageAction = async(prevState:any, formData: FormData): Promise<{message:string}> => {
    const id = formData.get('id') as string;
    const oldImageUrl = formData.get('url') as string;
    const image = formData.get('image') as File;
    try{
        const validateImage = validateWithZodSchema(imageSchema, {image})
        const fullPath= await uploadImage(validateImage.image)
        await deleteImage(oldImageUrl)
        await console.log('fullpath :', fullPath)
        await db.productProfile.update({
            where:{
                id:id
            },
            data:{
                image: fullPath
            }
        })
        revalidatePath(`/admin/products/${id}/edit`)
        return {message: 'image updated sucessfully'}
    }
    catch(error) {
        return renderError(error)
    }
    
}


 export async function fetchAdminProductById (productId: string) {
    await getAdminUser();
    const product = await db.productProfile.findUnique({
        where:{
            id: productId
        }
    })
    if(!product) {
        throw new Error('product not found')
    } 
    return product;
 }

//  export async function fetchFavoriteId(productId: string) {
//     // const user = await getAuthUser();
//     const favorite = await db.favorite.findFirst({
//         where:{
//             productId: productId,
//             clerkId: "user_2rELk2LcuFa3gXnxIkOyiLG4Zx9"
//         },
//         select:{
//             id: true
//         }
//     })
//     return favorite?.id || null;
//  } // if the product is favorited by user then select the id of the favorite

 export const fetchFavoriteId = async ( productId: string ) => {
    await getAuthUser();
    const favorite = await db.favorite.findFirst({
      where: {
        productId,
        clerkId: "user_2rELk2LcuFa3gXnxIkOyiLG4Zx9",
      },
      select: {
        id: true,
      },
    });
    return favorite?.id || null;
  };

 export async function favoriteToggleAction(prevState:{
    favoriteId:string|null,
    productId:string,
    pathName: string,
 } ){
    const {favoriteId, productId, pathName} = prevState;
    const user = await getAuthUser();
    console.log('path name:', pathName)
    try{

        if(!favoriteId) {
            await db.favorite.create({
                data:{
                    productId: productId,
                    clerkId: user.id,
                }
            })
        }
        else {
            await db.favorite.delete({
                where:{
                    id: favoriteId
                }
            })
        }
        revalidatePath(pathName)
        return {message: favoriteId?'removed from favorites': 'added to favorites'}
    }
    catch(error) {
        return renderError(error);
    }

 }

 export async function fetchFavoriteProducts(){
    const user = await getAuthUser();
    const favorites =  await db.favorite.findMany({
        where:{
            clerkId: user?.id
        },
        include:{
            product:true
        }
    })
    return favorites;
 }

 export async function fetchUserProductReview(productId:string) {
    const user = await getAuthUser();
    const review = await db.review.findFirst({
        where:{
            clerkId: user.id,
            productId: productId
        },
        select:{
            comment: true,
            rating: true
        }
    })
    return review || null
 }

 export async function mutateReviewRatingAction(prevState:any, formData:FormData) {
    const user = await getAuthUser();
    const pathName = formData.get('path') as string;
    const productId = formData.get('productId') as string;
    // const comment = String(formData.get('comment') as unknown);
    // const rating = Number(formData.get('rating') as unknown);
    const rawData = Object.fromEntries(formData);
    // check review table  for user product rating
    try {
        const validatedFields = validateWithZodSchema(ReviewSchema,rawData)
        const review = await db.review.findFirst({
            where:{
                productId:productId,
                clerkId: user.id
            },
            select:{
                id:true
            }
        })
        if(review?.id){
            await db.review.update({
                where:{
                    id:review?.id,
                },
                data:{
                    ...validatedFields
                }
            })
        }
        if(!review) {
            await db.review.create({
                data:{
                    clerkId:user.id,
                    ...validatedFields,
                    authorName: user?.firstName|| 'user',
                    authorImageUrl: user?.imageUrl,
                    productId: productId
                }
            })
        }
        revalidatePath(pathName)
        return {message: 'review submited'}
    }
    catch(error){
        return renderError(error);
    }        
}


export async function createReviewAction(prevState:any, formData:FormData){
    console.log('formData :', formData.get('name'));
    return {message:'review submitted'}
}

export async function getProductRating(productId:string) {
    const reviews= await db.review.groupBy({
        by:['productId'],
        _avg:{
            rating:true
        },
        _count:{
            rating:true
        }
    })
    return {
        rating: reviews[0]?._avg.rating?.toFixed(1) ?? 0,
        count: reviews[0]?._count.rating ?? 0
    } 
}

export const fetchProductReviews = async(productId:string) => {
    const reviews = await db.review.findMany({
        where:{
            productId: productId
        }
    })

    return reviews ||[]
}

export const fetchCartItemsCount = async() => {
    const {userId} = auth();
    const cart = await db.cart.findFirst({
        where: {
            clerkId: userId ?? '',
        },
        select: {
            totalitemsInCart: true,
        },
      });

      return cart?.totalitemsInCart || 0
}

export const fetchProduct = async(productId:string) => {
    try{
        const product = await db.productProfile.findUnique({
            where:{
                id:productId
            }
        })
        if(!product) throw new Error('product not found..')
    }
    catch(error) {
        return renderError(error)
    }
}
export const fetchOrCreateCart = async(userId:string) => {
    let cart = await db.cart.findFirst({
        where:{
            clerkId: userId
        },
        include:{
            cartItems:{
                include:{
                    product:true
                }
            }
        }
    })
    if(!cart){
        cart=  await db.cart.create({
            data:{
                clerkId:userId,
                totalitemsInCart:0
            },
            include:{
                cartItems:{
                    include:{
                        product:true
                    }
                }
            }
        })
    }
    return cart;
}

export const updateOrCreateCartItem = async(productId: string, cartId:string, amount:number)=> {
   let cartItem= await db.cartItem.findFirst({
        where:{
             cartId: cartId,
             productId: productId
        }
    })
    if(cartItem){
        await db.cartItem.update({
            where: {
                id: cartItem.id
            },
            data:{
                quantity: cartItem.quantity + amount,
            }
        })
    }
    else{
        await db.cartItem.create({
            data:{
                cartId:cartId,
                productId:productId,
                quantity:amount
            }
        })
    }
    return cartItem;
}

export const updateCart= async(cart:Cart) => {
    const cartItems = await db.cartItem.findMany({
        where:{
            cartId: cart.id
        },
        include:{
            product: true
        },
        orderBy:{
            createdAt:'asc'
        }
    })
  
    let totalitemsInCart= 0;
    let cartTotal = 0;
    console.log('cart items', cartItems)
    for(const cartItem of cartItems) {
        totalitemsInCart = totalitemsInCart + cartItem.quantity
        cartTotal = cartTotal + (cartItem.product.price * cartItem.quantity);
    }
    const tax = cart.taxRate*cartTotal;
    const shipping = cartTotal? cart.shipping : 0
    const orderTotal = cartTotal + tax + shipping

    // console.log('order tax cartotal', orderTotal, tax, cartTotal)

   const currentCart =  await db.cart.update({
        where:{
            id: cart.id,
        },
        data:{
            totalitemsInCart: totalitemsInCart,
            cartTotal: cartTotal,
            orderTotal: orderTotal
        },include:{
            cartItems:{
                include:{
                    product:true
                }
            }
        }
    })
    return {cartItems,currentCart};
}

export const addToCartAction = async(prevState:any,  formData:FormData) => {
    const user = await getAuthUser();
    try {
        const productId = formData.get('productId') as string;
        const amount = Number(formData.get('amount')); // amount can also be null so if we use 'as number' null cannot be a number, so we use to convert null to a number for that we use Number(null) -> 0.
        // console.log('product amount :', productId, amount)
        await fetchProduct(productId);
        const cart= await fetchOrCreateCart(user.id);
        await updateOrCreateCartItem(productId, cart.id, amount);
        await updateCart(cart);
    }
    catch(error) {
        return renderError(error);
    }
     redirect('/cart')
}

export async function createOrderAction(prevState:any, formData:FormData){
    const user = await getAuthUser();
    let orderId : null | string = null;
    let cartId  : null | string = null;
    try{
        const cart = await fetchOrCreateCart(user.id)
        cartId= cart.id
        await db.order.deleteMany({
            where:{
                clerkId: user.id,
                isPaid: false,
            }
        })
        const order=  await db.order.create({
            data:{
                clerkId: user.id,
                products: cart.totalitemsInCart,
                orderTotal: cart.orderTotal,
                tax: cart.tax,
                shipping: cart.shipping,
                isPaid: true,
                email: user.emailAddresses[0].emailAddress,
            }
        })
        // await db.cart.delete({
        //     where:{
        //         id: cart.id
        //     }
        // })
        orderId = order.id;
    }
    catch(error){
        return renderError(error)
    }
    redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`)
}

export const fetchUserOrders = async() => {
     const user = await getAuthUser();
     let orders;
    //  try {
       orders= await db.order.findMany({
            where:{
                clerkId: user.id,
            },
            orderBy:{
                createdAt: 'desc',
            }
        })
    //  }
    //  catch(error) {
    //     // return renderError(error) dont use this here because orders will have type of both { message:'' } and order
    //  }
    return orders;
}

export const fetchAdminOrders = async() => { // for sales page where admin can see how many orders are placed in his store
    await getAdminUser();
    let orders;
    // try {
      orders= await db.order.findMany({
           where:{
               isPaid: true,
           },
           orderBy:{
               createdAt: 'desc',
           }
       })
    // }
    // catch(error) {
    //    return renderError(error)
    // }
    return orders;
}

export async function removeCartItemAction(prevState:any) {
    const {cartItemId} = prevState;
    const user = await getAuthUser();
    try {
        const cart = await fetchOrCreateCart(user.id);
        await db.cartItem.delete({
            where:{
                id:cartItemId,
                cartId:cart.id
            },
        })
        await updateCart(cart)
    }
    catch(error){
        return renderError(error);
    }
    revalidatePath('/cart')
    return {message:'removed item'}
}

export const updateCartItemAction = async({amount, cartItemId}:{amount:number, cartItemId:string}) => {
    const user = await getAuthUser();
    const cart = await fetchOrCreateCart(user.id)
    await db.cartItem.update({
        where:{
            id: cartItemId,
        },
        data:{
            quantity: amount
        }
    })
    await updateCart(cart)
    revalidatePath('/cart')
}