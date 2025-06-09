'use client'

import { useRouter } from 'next/navigation'
import Navbar from "@/components/Navbar"
import { useEffect, useState } from 'react'
import CartTotal from "@/components/CartTotal";

const Cart = () => {
    const router = useRouter()

    const [products, setProducts] = useState([
        { id: 1, name: "Caffè Espresso", quantity: 2, price: 2.5 },
        { id: 2, name: "Cornetto al Cioccolato", quantity: 1, price: 3.0 },
        { id: 3, name: "Bottiglia d'Acqua", quantity: 3, price: 1.2 }
    ]);

    // Stare pentru a marca produsele în curs de dispariție
    const [fadingOutIds, setFadingOutIds] = useState<number[]>([]);

    const removeProduct = (id: number) => {
        // Adaugă produsul în lista de fade out
        setFadingOutIds(prev => [...prev, id]);

        // După 300ms elimină produsul complet din listă
        setTimeout(() => {
            setProducts(prev => prev.filter(product => product.id !== id));
            setFadingOutIds(prev => prev.filter(fadeId => fadeId !== id));
        }, 300);
    }

    const clearAll = () => {
        // Pentru ștergerea tuturor, facem fade out pentru toate
        const allIds = products.map(p => p.id);
        setFadingOutIds(allIds);

        setTimeout(() => {
            setProducts([]);
            setFadingOutIds([]);
        }, 300);
    }

    useEffect(() => {
        const style = document.createElement('style')
        style.innerHTML = `
            .container {
                width: 100%;
                max-width: 80%;
                margin: 90px auto;
                display: flex;
                flex-direction: row;
                gap: 2.5rem;
                padding: 2.5rem;
                align-items: flex-start;
                justify-content: center;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #fafafa;
                border-radius: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            }
            .card {
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 1rem;
                padding: 2rem;
                width: 100%;
                max-width: 48rem;
                box-sizing: border-box;
                box-shadow: 0 6px 20px rgba(0,0,0,0.08);
                transition: box-shadow 0.3s ease;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .card:hover {
                box-shadow: 0 10px 30px rgba(0,0,0,0.12);
            }
            .sectionTitle {
                font-size: 2.25rem;
                font-weight: 700;
                color: #222;
                margin-bottom: 1rem;
                letter-spacing: 0.03em;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .clearAllButton {
                background: #e63946;
                color: #fff;
                border: none;
                border-radius: 0.6rem;
                padding: 0.4rem 1rem;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.9rem;
                transition: background-color 0.3s ease;
            }
            .clearAllButton:hover {
                background: #b8313c;
            }
            .productList {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .productItem {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #ddd;
                border-radius: 1rem;
                padding: 1rem 1.5rem;
                background: #fff;
                box-shadow: 0 3px 8px rgba(0,0,0,0.04);
                transition: box-shadow 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
            }
            .productItem:hover {
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .productInfo {
                display: flex;
                gap: 1rem;
                align-items: center;
                flex: 1;
            }
            .productName {
                font-weight: 700;
                font-size: 1.15rem;
                color: #222;
                min-width: 180px;
            }
            .productQuantity {
                font-size: 1rem;
                color: #555;
                min-width: 60px;
                text-align: center;
            }
            .productPrice {
                font-weight: 600;
                font-size: 1rem;
                color: #333;
                min-width: 80px;
                text-align: right;
            }
            .removeButton {
                background: transparent;
                border: none;
                color: #e63946;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                padding: 0 0.5rem;
                transition: color 0.3s ease;
            }
            .removeButton:hover {
                color: #b8313c;
            }
            /* Fade-out effect */
            .fadeOut {
                opacity: 0;
                transform: translateX(50px);
            }
            .totalSection {
                width: 100%;
                max-width: 22rem;
                background: linear-gradient(135deg, #f5f7fa 0%, #e9eff5 100%);
                border-radius: 1.25rem;
                padding: 2.5rem 2rem;
                box-sizing: border-box;
                box-shadow: 0 8px 24px rgba(0,0,0,0.06);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                gap: 1.8rem;
                color: #333;
                min-height: 200px;
            }
            .checkoutButton {
                width: 100%;
                background: #1e1e1e;
                color: #f1f1f1;
                font-size: 1.15rem;
                font-weight: 700;
                border-radius: 1rem;
                padding: 1.1rem 0;
                cursor: pointer;
                border: none;
                box-shadow: 0 6px 14px rgba(30, 64, 175, 0.4);
                transition: background-color 0.3s ease, box-shadow 0.3s ease;
            }
            .checkoutButton:hover {
                background: #F2F3F2;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
                color: #1e1e1e;
            }

            /* Responsive Mobile */
            @media (max-width: 768px) {
                .container {
                    flex-direction: column;
                    padding: 1.5rem;
                    gap: 1.5rem;
                }
                .card, .totalSection {
                    max-width: 100%;
                    width: 100%;
                    padding: 1.8rem 1.5rem;
                }
                .sectionTitle {
                    font-size: 1.85rem;
                    flex-direction: column;
                    gap: 0.75rem;
                    align-items: flex-start;
                }
                .clearAllButton {
                    font-size: 0.85rem;
                    padding: 0.3rem 0.75rem;
                }
                .checkoutButton {
                    font-size: 1.05rem;
                    padding: 0.85rem 0;
                }
            }
        `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="sectionTitle">
                        Il tuo carrello
                        {products.length > 0 && (
                            <button
                                className="clearAllButton"
                                onClick={clearAll}
                                aria-label="Elimina tutti i prodotti dal carrello"
                            >
                                Șterge toate
                            </button>
                        )}
                    </h2>

                    {products.length === 0 ? (
                        <p style={{ color: '#777', fontSize: '1rem', textAlign: 'center', marginTop: '2rem' }}>
                            Il carrello è vuoto.
                        </p>
                    ) : (
                        <ul className="productList" role="list" aria-label="Lista prodotti nel carrello">
                            {products.map(product => (
                                <li
                                    key={product.id}
                                    className={`productItem ${fadingOutIds.includes(product.id) ? 'fadeOut' : ''}`}
                                    role="listitem"
                                    aria-live="polite"
                                >
                                    <div className="productInfo">
                                        <span className="productName">{product.name}</span>
                                        <span className="productQuantity">Q.tà: {product.quantity}</span>
                                        <span className="productPrice">€ {product.price.toFixed(2)}</span>
                                    </div>
                                    <button
                                        aria-label={`Elimina ${product.name}`}
                                        onClick={() => removeProduct(product.id)}
                                        className="removeButton"
                                    >
                                        ×
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="totalSection">
                    <CartTotal />
                    <button
                        className="checkoutButton"
                        onClick={() => router.push('/placeorder')}
                        disabled={products.length === 0}
                    >
                        Procedi al checkout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cart
