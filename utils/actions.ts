import db from '@/utils/db';
import { redirect } from 'next/navigation';

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