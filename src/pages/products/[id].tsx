// pages/product/[id].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { Typography } from '@mui/material';
// import { Product } from '../../types'; // Assuming you have a types file for Product interface

interface ProductPageProps {
    product: any | null;
    error?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };

    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const product: any = res.data;
        console.log("product", product)

        return {
            props: { product },
        };
    } catch (error) {
        return {
            props: {
                product: null,
                error: 'Product not found',
            },
        };
    }
};

const ProductPage: React.FC<ProductPageProps> = ({ product, error }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-4"><p>{error}</p></div>;
    }

    if (!product) {
        return <div className="container mx-auto p-4"><p>Product not found</p></div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <Image src={product.image} alt={product.name} width={500} height={500} />
                <h1 className="text-2xl font-bold my-4">{product.name}</h1>
                <Typography className="text-sm text-gray-600 mb-4">
                    {product.description
                        ? product.description.length > 20
                            ? `${product.description.substring(0, 40)}...`
                            : product.description
                        : "N/A"}
                </Typography>
                <p className="text-xl font-semibold">${product.price}</p>
            </div>
        </div>
    );
};

export default ProductPage;
