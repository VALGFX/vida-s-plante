'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC, useState, useEffect } from 'react'

const Navbar: FC = () => {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Detect screen size to toggle mobile/desktop view
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

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
                position: 'relative',
                zIndex: 1000,
            }}
        >
            {/* Logo */}
            <Link href="/" style={{ flexShrink: 0 }}>
                <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={120}
                    height={30}
                    priority
                />
            </Link>

            {/* Desktop menu */}
            {!isMobile && (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Link href="/" style={linkStyle('/')}>
                        Home
                    </Link>
                    <Link href="/products" style={linkStyle('/products')}>
                        Products
                    </Link>
                    <Link href="/about" style={linkStyle('/about')}>
                        About
                    </Link>
                    <Link href="/contact" style={linkStyle('/contact')}>
                        Contact
                    </Link>
                </div>
            )}

            {/* Icons (both desktop and mobile) */}
            {!isMobile && (
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
            )}

            {/* Mobile menu button */}
            {isMobile && (
                <button
                    aria-label="Toggle Menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Image src="/images/icons/menu.svg" alt="Menu" width={24} height={24} />
                </button>
            )}

            {/* Mobile menu sidebar */}
            {isMobile && isMobileMenuOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        height: '100vh',
                        width: '250px',
                        backgroundColor: '#fff',
                        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
                        padding: '30px 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        zIndex: 1100,
                        borderRadius: '0 0 0 20px',
                    }}
                >
                    <button
                        aria-label="Close Menu"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            alignSelf: 'flex-end',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginBottom: '10px',
                        }}
                    >
                        <Image src="/images/icons/close.svg" alt="Close" width={24} height={24} />
                    </button>

                    <Link href="/" style={linkStyle('/')} onClick={() => setIsMobileMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/products" style={linkStyle('/products')} onClick={() => setIsMobileMenuOpen(false)}>
                        Products
                    </Link>
                    <Link href="/about" style={linkStyle('/about')} onClick={() => setIsMobileMenuOpen(false)}>
                        About
                    </Link>
                    <Link href="/contact" style={linkStyle('/contact')} onClick={() => setIsMobileMenuOpen(false)}>
                        Contact
                    </Link>

                    <hr style={{ borderColor: '#ddd' }} />

                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E1E1E', textDecoration: 'none' }}>
                        <Image src="/images/icons/search.svg" alt="Search" width={20} height={20} />
                        Search
                    </Link>
                    <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E1E1E', textDecoration: 'none' }}>
                        <Image src="/images/icons/user.svg" alt="User" width={20} height={20} />
                        Login
                    </Link>
                    <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E1E1E', textDecoration: 'none' }}>
                        <Image src="/images/icons/cart.svg" alt="Cart" width={20} height={20} />
                        Cart
                    </Link>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {isMobile && isMobileMenuOpen && (
                <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        zIndex: 1050,
                    }}
                />
            )}
        </nav>
    )
}

export default Navbar
