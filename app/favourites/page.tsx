import EmptyList from "@/components/global/EmptyList";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchFavoriteProducts } from "@/utils/actions";
import { Favorite } from "@prisma/client";

const FavouritesPage = async() => {
    const favorites = await fetchFavoriteProducts();
    const products = favorites.map((fav)=> fav.product)
    console.log('products on favorite page :', favorites)
    return (
        <section className="py-8">
            <SectionTitle text='favorites'/>
            {products.length==0? <EmptyList heading="no favorites..." className="text-muted-foreground" /> : <ProductsGrid products={products}/>}
        </section>
    )
}

export default FavouritesPage;