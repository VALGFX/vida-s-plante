'use client'

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import CartTotal from '@/components/CartTotal'
import Title from '@/components/Title'
import { ShopContext } from '@/context/ShopContext'
import { FaMoneyBillWave } from 'react-icons/fa'
import Navbar from "../../components/Navbar";

const PlaceOrder = () => {
    const [method, setMethod] = useState('cod')
    const [promoCode, setPromoCode] = useState('')
    const [discount, setDiscount] = useState(0)

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products,
    } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const onChangeHandler = e => {
        const { name, value } = e.target
        setFormData(data => ({ ...data, [name]: value }))
    }

    const validatePromoCode = () => {
        const codes = { Shop5: 5, STUDENT: 20 }
        if (codes[promoCode]) {
            setDiscount(codes[promoCode])
            toast.success(`Cod aplicat: ${codes[promoCode]}% reducere`)
        } else {
            setDiscount(0)
            toast.error('Cod promoțional invalid')
        }
    }

    const onSubmitHandler = async e => {
        e.preventDefault()
        try {
            let orderItems = []

            Object.entries(cartItems).forEach(([productId, sizes]) => {
                Object.entries(sizes).forEach(([size, qty]) => {
                    if (qty > 0) {
                        const product = products.find(p => p._id === productId)
                        if (product) {
                            orderItems.push({ ...structuredClone(product), size, quantity: qty })
                        }
                    }
                })
            })

            const subtotal = getCartAmount()
            const total = subtotal * (1 - discount / 100) + delivery_fee

            const orderData = {
                address: formData,
                items: orderItems,
                amount: total,
            }

            const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
                headers: { token },
            })

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Eroare la procesarea comenzii')
        }
    }

    return (
        <>
        <Navbar/>
        <form
            onSubmit={onSubmitHandler}
            style={{
                display: 'flex',
                gap: '3rem',
                maxWidth: 960,
                margin: '0 auto',
                paddingTop: '3rem',
                flexWrap: 'wrap',
            }}
        >
            {/* DELIVERY INFORMATION */}
            <div style={{ flex: 1, minWidth: 320 }}>
                <Title text1="DELIVERY" text2="INFORMATION" />
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1.5rem 1rem',
                        marginTop: '1.5rem',
                    }}
                >
                    <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        placeholder="First name"
                        style={inputStyle}
                        required
                    />
                    <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        placeholder="Last name"
                        style={inputStyle}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        placeholder="Email address"
                        style={{ ...inputStyle, gridColumn: 'span 2' }}
                        required
                    />
                    <input
                        name="street"
                        value={formData.street}
                        onChange={onChangeHandler}
                        placeholder="Street"
                        style={{ ...inputStyle, gridColumn: 'span 2' }}
                        required
                    />
                    <input
                        name="city"
                        value={formData.city}
                        onChange={onChangeHandler}
                        placeholder="City"
                        style={inputStyle}
                        required
                    />
                    <input
                        name="state"
                        value={formData.state}
                        onChange={onChangeHandler}
                        placeholder="State"
                        style={inputStyle}
                    />
                    <input
                        type="number"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                        placeholder="Zipcode"
                        style={inputStyle}
                        required
                    />
                    <input
                        name="country"
                        value={formData.country}
                        onChange={onChangeHandler}
                        placeholder="Country"
                        style={inputStyle}
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={onChangeHandler}
                        placeholder="Phone"
                        style={{ ...inputStyle, gridColumn: 'span 2' }}
                        required
                    />
                </div>
            </div>

            {/* TOTAL + PROMO CODE + PAYMENT */}
            <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Promo code */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        style={{ ...inputStyle, flex: 1 }}
                    />
                    <button
                        type="button"
                        onClick={validatePromoCode}
                        style={{
                            backgroundColor: '#1f2937',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: 4,
                            cursor: 'pointer',
                        }}
                    >
                        Apply
                    </button>
                </div>

                {/* Cart Total */}
                <CartTotal discount={discount} />

                {/* Payment Method */}
                <div>
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div style={{ marginTop: '1rem' }}>
                        <div
                            onClick={() => setMethod('cod')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                border: '1px solid #d1d5db',
                                padding: '0.75rem 1rem',
                                borderRadius: 6,
                                cursor: 'pointer',
                                backgroundColor: method === 'cod' ? '#d1fae5' : 'transparent',
                                transition: 'background-color 0.3s',
                                userSelect: 'none',
                            }}
                        >
                            <div
                                style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    border: '2px solid #22c55e',
                                    backgroundColor: method === 'cod' ? '#22c55e' : 'transparent',
                                }}
                            />
                            <FaMoneyBillWave color="#22c55e" size={20} />
                            <span style={{ fontSize: '1rem', color: '#374151' }}>Cash on Delivery</span>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '0.75rem 2rem',
                        fontSize: '1rem',
                        border: 'none',
                        borderRadius: 6,
                        cursor: 'pointer',
                        marginTop: 'auto',
                    }}
                >
                    PLASEAZĂ COMANDA
                </button>
            </div>
        </form>
        </>
    )
}

const inputStyle = {
    border: '1px solid #d1d5db',
    borderRadius: 6,
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
}

export default PlaceOrder
