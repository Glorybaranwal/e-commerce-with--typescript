// components/orderSummary.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@components/store';

const OrderSummary: React.FC = () => {
    const items = useSelector((state: RootState) => state.cart.items);
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id} className="flex justify-between my-2">
                        <span>{item.title} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default OrderSummary;
