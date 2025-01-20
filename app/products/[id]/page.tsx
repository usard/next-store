import FavouriteToggleButton from "@/components/products/FavouriteToggleButton";
import BreadCrumbsHolder from "@/components/singleProduct/BreadCrumbsHolder";
import { fetchSingleProduct } from "@/utils/actions";
import ProductRating from "@/components/singleProduct/ProductRating";
import AddToCart from "@/components/singleProduct/AddToCart";
import Image from 'next/image';
import { formatCurrency } from "@/utils/format";



async function SingleProductPage({params}:{params:{id:string}}) {
  const {id} = params;
  const product = await fetchSingleProduct(id);
  const {name, image, company, price, description} = product;

  return (
    <section>
        <BreadCrumbsHolder name={name} />
        <div className='grid md:grid-cols-2 md:gap-x-10'>
            <div className="relative p-4 overflow-hidden h-56 min-w-48 w-full md:h-48" >
                <Image src={image} alt={name} fill className="object-cover rounded-lg"/> 
            </div>
            <div className='p-2 flex flex-col gap-y-2'>
                <div>
                    <div className='flex gap-3'>
                        <h2>{name}</h2>
                        <FavouriteToggleButton productId={id}/> 
                    </div>
                    <ProductRating /> 
                    <h3 className="text-muted-foreground">{company}</h3>
                    <p className="p-2 bg-muted inline-block rounded-lg font-medium">{formatCurrency(price)}</p>
                </div>
                <p className="text-muted-foreground"> {description} </p>
                <AddToCart />
            </div>
        </div>
 
    </section>
  )
}

export default SingleProductPage;