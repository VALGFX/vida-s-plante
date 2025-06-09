'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const Navbar: FC = () => {
    const pathname = usePathname()

    const linkStyle = (path: string) => ({
        textDecoration: 'none',
        color: '#1E1E1E',
        borderBottom: pathname === path ? '2px solid #1E1E1E' : '2px solid transparent',
        paddingBottom: '4px',
        transition: 'border-bottom 0.3s ease',
        display: 'flex',
        alignItems: 'center',
    })

    return (
        <nav
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
                padding: '20px',
                backgroundColor: '#F2F3F2',
                borderRadius: '20px',
                maxWidth: '80%',
                margin: '40px auto 0',
            }}
        >
            {/* Logo */}
            <Link href="/">
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={120}
                    height={30}
                    priority
                />
            </Link>

            {/* Desktop version */}
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/" style={linkStyle('/')}>
                    Home
                </Link>
                <Link href="/products" style={linkStyle('/products')}>
                    Prodotti
                </Link>
                <Link href="/about" style={linkStyle('/about')}>
                    Chi siamo
                </Link>
                <Link href="/contact" style={linkStyle('/contact')}>
                    Contatto
                </Link>
            </div>

            {/* Icon navigation */}
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/products">
                    <Image src="/images/icons/search.svg" alt="Search" width={20} height={20} />
                </Link>
                <Link href="/auth/login" style={linkStyle('/auth/login')}>
                    <Image src="/images/icons/user.svg" alt="User" width={20} height={20} />
                </Link>
                <Link href="/cart" style={linkStyle('/cart')}>
                    <Image src="/images/icons/cart.svg" alt="Cart" width={20} height={20} />
                </Link>
            </div>

            {/* Mobile version */}
            <div style={{ display: 'none', gap: '20px' }}>
                <button aria-label="Menu">
                    <Image src="/images/icons/menu.svg" alt="Menu" width={20} height={20} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
