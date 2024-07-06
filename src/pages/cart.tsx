import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeItem, updateQuantity } from '../store/cartSlice';
import Navbar from '@components/components/navbar';
import Image from 'next/image'; // Ensure this import is from 'next/image'
import CheckoutPage from '../components/checkOut';
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRouter } from 'next/router';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Link from 'next/link';


const CartPage: React.FC = () => {
    const Router = useRouter()
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const [updateQuantityItem, setUpdateQuantity] = useState<any>(0)

    const handleQuantityChange = (id: number, quantity: number) => {
        setUpdateQuantity(quantity)
        if (quantity <= 0) {
            dispatch(removeItem(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    return (
        <Box>
            <Navbar />
            <Box className="container mx-auto p-4 pt-16" m={5}>
                {cartItems.length === 0 ? (
                    <Box display="flex" alignItems="center" justifyContent="center" bgcolor="#f3f3f3" p={10} mx={30}>
                        <Box height="20rem" alignItems="center" justifyContent="center">
                            <Box alignItems="center" textAlign="center" mt={3}>
                                <SentimentDissatisfiedIcon sx={{ color: "#ccc", fontSize: "6rem" }} />

                                <Typography variant="body2">You don't have anything in your cart.<br></br> Let's change that, use the link below to start browsing our products</Typography>
                            </Box>
                            <Box mt={3} alignItems="center" textAlign="center">
                                <Link href={"/"}>
                                    <Typography variant="body2" sx={{ color: "info" }}> Explore Products</Typography>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                ) : (
                    <Grid container>
                        <Grid md={6} sm={12} xs={12} lg={7}>
                            <Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                    <Box>
                                        <Typography variant='h6' color="#525252"> Already have an account?</Typography>
                                        <Typography variant='subtitle1' color="#525252"> Sign in for a better experience.</Typography>
                                    </Box>
                                    <Box>
                                        <Button variant='contained' style={{ backgroundColor: "#f1f1f1", color: "#000" }}>Sign in</Button>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <TableContainer >
                                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Item</TableCell>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="center">Quantity</TableCell>
                                                <TableCell align="center">Price</TableCell>
                                                <TableCell align="center">Total</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cartItems.map((row: any) => (
                                                <TableRow
                                                    key={row.id}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        <Image
                                                            src={row.image}
                                                            alt={row.name}
                                                            width={100}
                                                            height={100}
                                                            objectFit="cover"
                                                            className="rounded"
                                                        />
                                                    </TableCell>



                                                    <TableCell align="left">   {row.title
                                                        ? row.title.length > 20
                                                            ? `${row.title.substring(0, 40)}...`
                                                            : row.title
                                                        : "N/A"}</TableCell>
                                                    <TableCell align="center">


                                                        <RemoveCircleOutlineIcon onClick={() => handleQuantityChange(row.id, row.quantity - 1)} />
                                                        <Typography variant='body2'>{row.quantity}</Typography>
                                                        {/* {row.quantity} */}

                                                        <ControlPointIcon onClick={() => handleQuantityChange(row.id, row.quantity + 1)} />
                                                    </TableCell>
                                                    <TableCell align="center">{row.price}</TableCell>
                                                    <TableCell align="center">{row.price * updateQuantityItem}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* {cartItems.map((item: any) => (
                                        <>
                                        
                                            <Box display="flex" alignItems="center" justifyContent="space-between" key={item.id}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={100}
                                                    height={100}
                                                    objectFit="cover"
                                                    className="rounded"
                                                />
                                                <div className="ml-4">
                                                    <h2 className="text-xl font-bold">{item.title}</h2>
                                                    <p className="text-gray-700">${item.price.toFixed(2)}</p>
                                                    <div className="mt-2 flex items-center">


                                                        <RemoveCircleOutlineIcon onClick={() => handleQuantityChange(item.id, item.quantity - 1)} />
                                                        <Box><Typography variant='caption'>{item.quantity}</Typography></Box>
                                                        <TextField id="outlined-basic" value={item.quantity} variant="standard" />

                                                        <ControlPointIcon onClick={() => handleQuantityChange(item.id, item.quantity + 1)} />
                                                    </div>
                                                </div>
                                            </Box>
                                            <Button
                                                variant='outlined'
                                                color="error"
                                                onClick={() => dispatch(removeItem(item.id))}
                                                className="ml-auto bg-red-500 text-white p-2 rounded"
                                            >
                                                Remove
                                            </Button>
                                        </>
                                    ))} */}
                            </Box>
                        </Grid>
                        <Grid md={6} sm={12} xs={12} lg={5}>
                            <Box m={5}>
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" my={4}>
                                        <Box mb={2}>
                                            <Typography variant='h5' color="#525252"> Summary</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <CheckoutPage />
                            </Box>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};

export default CartPage;
