import { fetchAllProducts } from '@/utils/actions'
import { ProductProfile } from '@prisma/client'
import { IoIosGrid } from "react-icons/io";
import { FaList } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '../ui/button';
import ProductsGrid from './ProductsGrid';
import ProductsList from './ProductsList';


async function ProductsContainer({layout,search}:{layout:string, search:string}) {
  console.log(layout,search);
  const products = await fetchAllProducts({search}); 
  const totalProducts = products.length;
  const searchTerm = search?`&search=${search}`: '';
  console.log('layout :', layout== 'list')
  return (
   <>
    <section className='flex justify-between items-center '>
      <h2 className='text-xl text-muted-foreground'>
        {totalProducts +' '}
        <span>
          product{totalProducts > 1? 's':''}
        </span>
      </h2>
      <div className='flex gap-2'>
        <Button variant='outline' size='icon' >
          <Link href={`/products?layout=grid${searchTerm}`}  className='p-2'>
            <IoIosGrid />
          </Link>
        </Button>
        <Button variant='outline' size='icon' className='p-2'>
          <Link href={`/products?layout=list${searchTerm}`} className='p-2' >
            <FaList />
          </Link>
        </Button>
      </div>
    </section>
    <div>
      {totalProducts < 1? 
      <h2>
        'sorry no products matched...'
      </h2>
      : ( layout == 'grid' ? <ProductsGrid products={products}/>: <ProductsList products={products} /> ) }
    </div>
   </>
  )
}

export default ProductsContainer;