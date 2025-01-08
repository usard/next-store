import React from 'react';
import { fetchFeaturedProducts } from '@/utils/actions';
import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import ProductsGrid from '../products/ProductsGrid';
import { Suspense } from 'react';
import LoadingContainer from '../global/LoadingContainer';

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts();
  console.log('length :', products.length)
  if (products.length == 0) return <EmptyList />
  return (
    <section className='mt-6'>
      <SectionTitle text='featured products' />
      <ProductsGrid  products={products} />
    </section>
  )
}

export default FeaturedProducts;