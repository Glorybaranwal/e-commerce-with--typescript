import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useRouter } from 'next/router';
import { Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartCount = cartItems.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
    const router = useRouter();

    return (
        <nav className="stickey w-full bg-white shadow-lg z-10" >
            <Box bgcolor="#fff">
                <Box className="container mx-auto p-4 flex justify-between items-center" display="flex" justifyContent="space-between" px={4} py={3} sx={{ borderBottom: "1px solid #e9e5e5" }}>

                    <Link href="/" passHref>
                        <span className="text-xl font-bold cursor-pointer">MyStore</span>
                    </Link>
                    <Box className="space-x-4 flex items-center" display="flex">
                        <Link href="/" passHref >
                            <Box mx={3} className={`cursor-pointer ${router.pathname === "/" ? "text-blue-500" : ""}`}>Home</Box>
                        </Link>
                        <Link href="/cart" passHref>
                            <div className="relative cursor-pointer">
                                <Box mx={3} className={`cursor-pointer ${router.pathname === "/cart" ? "text-blue-500" : ""}`}>

                                    <Badge badgeContent={cartCount} color="primary">
                                        <ShoppingCartIcon color="action" />
                                    </Badge>
                                </Box>

                            </div>
                        </Link>
                        <Link href="/login" passHref>
                            <span className={`cursor-pointer ${router.pathname === "/login" ? "text-blue-500" : ""}`}>Login</span>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </nav>
    );
};

export default Navbar;
