import React from 'react';
import  {ProductProfile} from '@prisma/client';
import Link  from 'next/link';
import {CardContent, Card} from '../ui/card';
import Image from 'next/image'
import { log } from 'console';
import {formatCurrency} from '@/utils/format';
// import { Button } from '../ui/button';
// import { FaHeart } from 'react-icons/fa';
import FavouriteToggleButton from './FavouriteToggleButton';

function ProductsGrid({products}:{products: ProductProfile[]}) {
  // console.log(products)
  return (
    <section>
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {
              products.map(product => {
                const {id: productId, name, price, image} = product
                log(image)
                const dollarsAmount = formatCurrency(price);
                return (    
                  <article key={productId} className='group relative'>
                    <Link href={`/products/${productId}`}>
                      <Card className='group-hover:shadow-xl transition-shadow duration-500'>
                        <CardContent className='p-4'> 
                           <div className="relative h-64 p-4 overflow-hidden">
                              <Image src={image} alt={name} fill className='w-full rounded object-cover group-hover:scale-110 duration-500' />
                           </div>
                           <div className='mt-4 text-center'>
                            <h2 className='text-2xl'>{name}</h2>
                            <p className='mt-1'>{dollarsAmount}</p>
                           </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <div className='absolute top-5 right-5'>
                      <FavouriteToggleButton productId={productId} />
                    </div>
                  </article>
                )
              })
            }
      </div>
    </section>
  )
}

export default ProductsGrid