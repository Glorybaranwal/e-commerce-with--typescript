// pages/checkout.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@components/store/slices/cartSlices';
import { RootState } from '@components/store';
import OrderSummary from '@components/components/orderSummary';
import { useRouter } from 'next/router';
import { TableContainer, Table, TableBody, TableRow, TableCell, Box } from '@mui/material';

const CheckoutPage: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);
    const router = useRouter();
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    const handleOrder = () => {
        if (name && address && items.length > 0) {
            // Simulate order processing
            setTimeout(() => {
                dispatch(clearCart());
                router.push('/order-confirmation');
            }, 1000);
        } else {
            alert('Please fill in all fields and add items to your cart.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">Product</TableCell>
                            <TableCell align="right">{items.map(item => (
                                <Box>{item.title} x {item.quantity}</Box>

                            ))}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">Subtotal</TableCell>
                            <TableCell align="right"> {items.map(item => (
                                <Box>${(item.price * item.quantity).toFixed(2)}</Box>
                            ))}</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="right"> <Box>${total.toFixed(2)}</Box></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="font-bold mb-2">Shipping Information</h2>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="border p-2 mb-2 w-full"
                    />
                    <h2 className="font-bold mb-2">Payment Method</h2>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="border p-2 mb-2 w-full"
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <OrderSummary />
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleOrder} className="bg-blue-500 text-white px-4 py-2 rounded">Place Order</button>
            </div> */}
        </div>
    );
};

export default CheckoutPage;
