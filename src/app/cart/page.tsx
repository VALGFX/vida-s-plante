'use client'

import { useRouter } from 'next/navigation'
import Navbar from "@/components/Navbar"

const Cart = () => {
    const router = useRouter()

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
                    <h2 style={styles.sectionTitle}>Il tuo carrello</h2>
                    {/* Poți adăuga aici produse statice sau doar un placeholder */}
                    <p>Contenuto statico del carrello (placeholder)</p>
                </div>

                <div style={styles.totalSection}>
                    {/* Poți înlocui CartTotal cu un text static, dacă vrei complet frontend */}
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        Totale: €99.99
                    </div>
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
