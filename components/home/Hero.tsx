import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import HeroCarousel from './HeroCarousel';

async function Hero() {
  return (
    <section className='mt-16 grid lg:grid-cols-2 gap-24'>
      <div >
          <h4 className='text-6xl font-bold'>we are changing the way people shop</h4>
          <p className='mt-4 text-lg text-muted-foreground'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus amet, odit labore illum deleniti cupiditate quo similique repellat, sint ad dolorem facilis maiores molestiae laudantium et incidunt porro officia animi.
          </p>
          <Button asChild variant='outline' className='mt-10 bg-green-200 hover:bg-green-400' >
            <Link href={`/products`}>Our Products</Link>
          </Button>
      </div>
      <HeroCarousel />
    </section>
  )
}

export default Hero;