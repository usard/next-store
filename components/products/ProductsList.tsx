import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ProductProfile } from '@prisma/client';
import  Link  from 'next/link';
import  Image  from 'next/image';
import FavouriteToggleButton from './FavouriteToggleButton';
import { formatCurrency } from '@/utils/format';


function ProductsList({products}:{products: ProductProfile[]}) {
  return (
      <section>
          <div className='mt-10'>
            {
              products.map(item=>{
                const {id, name, price, image, company} = item;
                return(
                  <article key={id} className='group relative mb-8'>
                    <Link href={`/products/${id}`}>
                      <Card>
                        <CardContent className='p-8 grid gap-x-16 items-center rounded-md md:grid-cols-3'>
                          <div className='p-4 h-64 relative md:h-48 md:w-56 overflow-hidden rounded-lg'>
                            <Image src={image} alt={name} fill className='object-cover group-hover:scale-110 duration-500' />
                          </div>
                          <div >
                            <h2 className='text-3xl'>{name}</h2>
                            <p className='text-lg text-muted-foreground'>{company}</p>
                          </div>
                          <div className=''>
                            <h2>{formatCurrency(price)}</h2>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                    <div className='absolute bottom-8 right-8'>
                      <FavouriteToggleButton productId={id}/>
                    </div>
                  </article>
                )
              })
            }
          </div>
      </section>
  )
}

export default ProductsList