import FavouriteToggleButton from "@/components/products/FavouriteToggleButton";
import BreadCrumbsHolder from "@/components/singleProduct/BreadCrumbsHolder";
import { fetchUserProductReview, fetchSingleProduct, getProductRating } from "@/utils/actions";
import AddToCart from "@/components/singleProduct/AddToCart";
import Image from 'next/image';
import { formatCurrency } from "@/utils/format";
import ShareButton from "@/components/singleProduct/ShareButton";
import SectionTitle from "@/components/global/SectionTitle";
import { Rating } from '@mui/material';
import { auth } from "@clerk/nextjs/server";
import TextAreaInput from "@/components/form/TextAreaInput";
import ReviewRating from "@/components/singleProduct/ReviewRating";
import ProductRating from "@/components/singleProduct/ProductRating";
import ProductReviews from "@/components/reviews/ProductReviews";
import { CardSignInButton } from "@/components/form/Buttons";
import { FaLock } from "react-icons/fa";


async function SingleProductPage({params}:{params:{id:string}}) {
    const {id} = params;
    const product = await fetchSingleProduct(id);
    //   const data:{ rating:number, comment:string} | null = await fetchUserProductReview(id)
    const {name, image, company, price, description} = product;
    const {userId} = auth();
    //   if(userId)  var data:{rating:number, comment:string} | null=  await fetchUserProductReview(id)
    const getRating = async(id:string) => {
        if(userId) return await fetchUserProductReview(id)
        return null 
    }
    let data = await getRating(id);
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
                            <div className="flex items-center gap-x-4">
                                <FavouriteToggleButton productId={id} /> 
                                <ShareButton productId={id} name={name} />
                            </div>
                        </div>
                        {/* <ProductRating id={id}/> */}
                        <h3 className="text-muted-foreground">{company}</h3>
                        <p className="p-2 bg-muted inline-block rounded-lg font-medium">{formatCurrency(price)}</p>
                    </div>
                    <p className="text-muted-foreground"> {description} </p>
                    <AddToCart productId={params.id} />
                </div>
            </div>
        <section>
                <SectionTitle text='Reviews and Ratings'/>
                <div>
                    {
                        !userId? 
                        <div className="h-40 flex flex-col items-center justify-center">
                            <CardSignInButton>
                                <div className="w-40 bg-green-300">
                                    <div className="flex flex-col items-center justify-center">
                                        <FaLock />
                                        <span>sign in</span>
                                    </div> 
                               </div>
                            </CardSignInButton  >
                            <p className="text-muted-foreground">sigin to provide your review</p>
                        </div>
                            :!getRating(id) &&  <ReviewRating productId={id} rating={data?.rating||0} comment={data?.comment||''} />
                    }
                </div>
                <ProductReviews productId={id}/>
        </section>
    
        </section>
    )
}

export default SingleProductPage;