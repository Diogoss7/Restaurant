import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/productDetails";
import ProductHeader from "./components/productHeader";

interface ProductPageProps{
    params: Promise<{slug: string; productId: string}>
}

const ProductPage = async ({params}:ProductPageProps) => {
const {productId,slug} = await params;
const product = await db.product.findUnique({
  where: { id:productId },
  include:{
    restaurant:{
      select:{
        name:true,
        avatarImageUrl:true,
        slug:true,
      }
    }
  }
});

  if(!product){
  return notFound()
}
  if(product.restaurant.slug!= slug){
    return notFound()
  }

    return (  
      <div>
        <div className="flex h-full flex-coll"></div>
         <ProductHeader product={product} />
         <ProductDetails product={product}/>
      </div>
    );
}
 
export default ProductPage;