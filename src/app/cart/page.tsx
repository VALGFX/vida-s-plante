'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CartTotal from '@/components/CartTotal'
import { ShopContext } from '@/context/ShopContext'
import Navbar from "@/components/Navbar"

interface CartItem {
    _id: string
    size: string
    quantity: number
}

const Cart = () => {
    const {
        products,
        cartItems,
        updateQuantity,
        clearCart,
    } = useContext(ShopContext)

    const [cartData, setCartData] = useState<CartItem[]>([])
    const router = useRouter()

    useEffect(() => {
        const tempData: CartItem[] = []
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size]
                if (quantity > 0) {
                    tempData.push({ _id: itemId, size, quantity })
                }
            }
        }
        setCartData(tempData)
    }, [cartItems])

    const getProductPrice = (product: any, size: string) => {
        let price = product.price
        if (size === '30ml') price *= 0.6
        else if (size === '100ml') price *= 2
        return price
    }

    const styles = {
        container: {
            width: '100%',
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'row' as const,
            gap: '2.5rem',
            padding: '2.5rem',
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        card: {
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '1rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '48rem',
        },
        sectionTitle: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#111',
        },
        deleteButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#d00',
            fontWeight: 500,
            marginTop: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
        },
        productGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            fontWeight: 600,
            fontSize: '1.125rem',
            padding: '0 0.5rem',
            marginBottom: '1rem',
        },
        cartItem: {
            display: 'flex',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '1rem',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            alignItems: 'center',
        },
        thumbnail: {
            width: '5rem',
            height: '5rem',
            borderRadius: '0.75rem',
            objectFit: 'cover' as const,
            border: '1px solid #ddd',
        },
        quantityButton: {
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            border: '1px solid #aaa',
            background: '#f4f4f4',
            fontSize: '1.25rem',
            cursor: 'pointer',
        },
        totalSection: {
            width: '100%',
            maxWidth: '20rem',
            background: '#f3f3f3',
            borderRadius: '1rem',
            padding: '2rem',
        },
        checkoutButton: {
            width: '100%',
            marginTop: '2rem',
            background: '#000',
            color: '#fff',
            fontSize: '1.125rem',
            fontWeight: 500,
            borderRadius: '0.75rem',
            padding: '1rem',
            cursor: 'pointer',
        },
    }

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.card}>
                    <div>
                        <h2 style={styles.sectionTitle}>Il tuo carrello</h2>
                        <button style={styles.deleteButton} onClick={clearCart}>
                            <span style={{ fontSize: '1.5rem' }}>✕</span>
                            <span>Svuota il carrello</span>
                        </button>
                    </div>

                    <div style={styles.productGrid}>
                        <span>Prodotto</span>
                        <span style={{ textAlign: 'center' }}>Quantità</span>
                        <span style={{ textAlign: 'right' }}>Prezzo</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {cartData.map((item, index) => {
                            const product = products.find(p => p._id === item._id)
                            if (!product) return null
                            const price = getProductPrice(product, item.size)

                            return (
                                <div key={index} style={styles.cartItem}>
                                    <img src={product.image[0]} alt={product.name} style={styles.thumbnail} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 600 }}>{product.name}</p>
                                        <p style={{ color: '#666', fontSize: '0.875rem' }}>{product.description}</p>
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                marginTop: '0.5rem',
                                                padding: '0.25rem 0.5rem',
                                                fontSize: '0.75rem',
                                                border: '1px solid #ccc',
                                                borderRadius: '0.25rem',
                                                background: '#f9f9f9',
                                            }}
                                        >
                                            {item.size}
                                        </span>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))
                                            }
                                            style={styles.quantityButton}
                                        >
                                            –
                                        </button>
                                        <span style={{ width: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                                            style={styles.quantityButton}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div style={{ width: '5rem', textAlign: 'right', fontWeight: 500 }}>
                                        €{price.toFixed(2)}
                                    </div>

                                    <button
                                        aria-label='Rimuovi'
                                        onClick={() => updateQuantity(item._id, item.size, 0)}
                                        style={{
                                            marginLeft: '0.5rem',
                                            color: 'red',
                                            fontSize: '1.5rem',
                                            border: 'none',
                                            background: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div style={styles.totalSection}>
                    <CartTotal discount={0} />
                    <button
                        style={styles.checkoutButton}
                        onClick={() => router.push('/placeorder')}
                    >
                        Procedi al checkout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cart
