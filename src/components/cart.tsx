// components/cartItem.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { removeItem, updateQuantity } from '@components/store/cartSlice';

interface CartItemProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, quantity, image }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeItem(id));
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        dispatch(updateQuantity({ id, quantity: newQuantity }));
    };

    return (
        <div className="flex items-center justify-between my-2 p-4 border rounded">
            <Image src={image} alt={name} width={100} height={100} objectFit="cover" className="rounded" />
            <div className="flex-1 ml-4">
                <h2 className="font-bold">{name}</h2>
                <p>${price}</p>
                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="border p-1 w-16"
                    min="1"
                />
            </div>
            <button onClick={handleRemove} className="ml-4 text-red-500">Remove</button>
        </div>
    );
};

export default CartItem;
