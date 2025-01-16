'use server';
import db from '@/utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {ProductSchema} from '@/utils/schemas';
import { ZodError } from 'zod';
import { error } from 'console';

// const user = await currentUser();
const getAuthUser= async () =>{
    const user = await currentUser();
    if (!user) redirect('/');
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
        const validatedFields = ProductSchema.safeParse(rawData);
        if(!validatedFields.success) {
           const errors = validatedFields.error.errors.map((error)=> {
                return error.message
            })
            throw new Error(errors.join(','));
        }


        // await db.productProfile.create(    
        //     {
        //         data: {...rawData}
        //     }
        // )

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