import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Box, Button, Card, Tooltip, Typography, styled } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Link from 'next/link';

interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    title: string;
}

const ImgStyled = styled("img")(({ }) => ({
    width: "100%",
    height: "100%",
    borderRadius: "5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));


const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description, title }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addItem({
            id, title, price, image,
            quantity: 0
        }));
    };

    return (
        <Box m={3} textAlign="center">
            {/* <Link href={`/product/${id}`} passHref> */}
            <Box p={3} border="1px solid #f1f1f1">
                <div className="grid grid-cols-12 gap-4 p-4 border rounded-md shadow-md">
                    <div className="col-span-9">
                        <Box width={200}
                            height={200} p={4} bgcolor="#fff" display="center">
                            <ImgStyled
                                className="imgBox"
                                src={image}
                            />
                        </Box>
                    </div>
                    <Box>
                        <Box textAlign="left">
                            <Tooltip title={title}>
                                <Typography variant='body1' >{title
                                    ? title.length > 20
                                        ? `${title.substring(0, 40)}...`
                                        : title
                                    : "N/A"}
                                </Typography>
                            </Tooltip>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant='body1'>${price.toFixed(2)}</Typography>
                            <Button variant="text" onClick={handleAddToCart}> <Tooltip title="Add to cart"><AddShoppingCartIcon /></Tooltip></Button>
                        </Box>
                    </Box>
                </div>
            </Box>
            {/* </Link> */}
        </Box>
    );
};

export default ProductCard;
