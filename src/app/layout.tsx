// app/layout.tsx
import './globals.css'
import React from 'react'
import type { Metadata } from 'next'
import { ShopContextProvider } from '@/context/ShopContext'

export const metadata: Metadata = {
    title: 'Vida-s Plante',
    description: 'Produse și soluții pentru acvariul tău de vis',
    icons: {
        icon: '/favicon.ico',
    },
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
        <body style={{ backgroundColor: 'white', color: 'black' }}>
        <ShopContextProvider>
            {children}
        </ShopContextProvider>
        </body>
        </html>
    )
}

export default RootLayout
