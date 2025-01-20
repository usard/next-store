'use server';
import db from '@/utils/db';
import { currentUser, getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {imageSchema, ProductSchema} from '@/utils/schemas';
import { validateWithZodSchema } from '@/utils/schemas';
import { uploadImage } from './supabase';
import { revalidatePath } from 'next/cache';
import {deleteImage} from '@/utils/supabase';

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

export const deleteProductAction = async(prevState:{id:string}): Promise<{message:string}> => {
    await getAdminUser();
    const {id} = prevState;
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

 export async function fetchFavoriteId(productId: string) {
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
        where:{
            productId: productId,
            clerkId: user.id
        },
        select:{
            id: true
        }
    })
    return favorite?.id || null;
 } // if the product is favorited by user then select the id of the favorite

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