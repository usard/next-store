// import React from 'react';
// import ProductRating from './ProductRating';
// import { ProductProfile } from '@prisma/client';
// import Image from 'next/image';
// import AddToCart from './AddToCart';
// import FavouriteToggleButton from '../products/FavouriteToggleButton';
 

// function Product({product}:{product:ProductProfile}) {
//   const {id, name, image, company, price, description} = product;
//   return (
//     <div className='grid grid-cols-2 gap-x-10'>
//         <div>
//             <Image src={image} alt={name} /> 
//         </div>
//         <div className='flex flex-col gap-y-2'>
//             <div>
//                 <div className='flex gap-3'>
//                     <h2>{name}</h2>
//                     <FavouriteToggleButton productId={id}/> 
//                 </div>
//                 <ProductRating /> 
//                 <h3>{company}</h3>
//                 <p>{price}</p>
//             </div>
//             <p> {description} </p>
//             <AddToCart />
//         </div>
//     </div>
//   )
// }

// export default Product;