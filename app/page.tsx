import { Suspense } from 'react';
import Loading from './loading';
import Hero from '../components/home/Hero';
import FeaturedProducts from "@/components/home/FeaturedProducts";
import LoadingContainer from '@/components/global/LoadingContainer';

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
    </div>
  );
}
