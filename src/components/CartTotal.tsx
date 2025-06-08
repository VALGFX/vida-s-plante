'use client'

import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

interface CartTotalProps {
    discount: number
}

const CartTotal: React.FC<CartTotalProps> = ({ discount }) => {
    const { currency, delivery_fee, cartItems, products } = useContext(ShopContext)

    const getCartAmount = (): number => {
        let totalAmount = 0
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size]
                if (quantity > 0) {
                    const product = products.find(p => p._id === itemId)
                    if (product) {
                        let price = product.price
                        if (size === '30ml') price *= 0.6
                        else if (size === '100ml') price *= 2
                        totalAmount += price * quantity
                    }
                }
            }
        }
        return totalAmount
    }

    const totalAmount = getCartAmount()
    const discountedAmount = totalAmount * (1 - discount / 100)

    return (
        <div style={{ width: '100%' }}>
            <div style={{ fontSize: '1.5rem' }}>
                <Title text1="TOTALE" text2="ACQUISTI" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Subtotale</p>
                    <p>{totalAmount.toFixed(2)} {currency}</p>
                </div>

                {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>Sconto</p>
                        <p>-{(totalAmount - discountedAmount).toFixed(2)} {currency}</p>
                    </div>
                )}

                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p>Spese di spedizione</p>
                    <p>{delivery_fee.toFixed(2)} {currency}</p>
                </div>
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <b>Totale</b>
                    <b>{(discountedAmount + delivery_fee).toFixed(2)} {currency}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal
