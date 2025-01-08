import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from 'next/image';

import hero1 from '@/public/images/hero1.jpg';
import hero2 from '@/public/images/hero2.jpg';
import hero3 from '@/public/images/hero3.jpg';
import hero4 from '@/public/images/hero4.jpg';

import { Card, CardContent } from '../ui/card';




async function HeroCarousel() {
  const images=  [hero1, hero2, hero3, hero4] 
  return (
    <div className='hidden transition-opacity opacity-0 ease-in-out duration-400  lg:block lg:transition-opacity lg:opacity-100'>
      <Carousel>
        <CarouselContent>
          {
            images.map((item,index) => {
              return (
                <CarouselItem key={index}>
                  <Card >
                    <CardContent className='p-4' >
                      <Image src={item} alt={index.toLocaleString()}  className='w-full rounded-lg h-[24rem] object-cover' />
                    </CardContent>
                  </Card>
                </CarouselItem>
              )
            })
          }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default HeroCarousel;