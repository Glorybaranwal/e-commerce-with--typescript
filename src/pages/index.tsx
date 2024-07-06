import ProductPage from "@components/components/productListingPage";
import { Suspense } from "react";
import LoadingComponent from "@components/components/loading";
import axios from "axios";



interface Product {
  description: string;
  title: string;
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Home = ({ products }: any) => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <ProductPage products={products} />
    </Suspense>

  )
}


export async function getStaticProps() {
  const res = await axios.get('https://fakestoreapi.com/products');
  const products: Product[] = res.data;

  return {
    props: { products },
  };
}

export default Home