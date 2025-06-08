'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

// Tipuri pentru produs și coș
interface Product {
    _id: string
    name: string
    image: string
    price: number
}

interface CartItems {
    [itemId: string]: {
        [size: string]: number
    }
}

interface ShopContextType {
    products: Product[]
    currency: string
    delivery_fee: number
    search: string
    setSearch: (value: string) => void
    showSearch: boolean
    setShowSearch: (value: boolean) => void
    cartItems: CartItems
    setCartItems: (items: CartItems) => void
    addToCart: (itemId: string, size: string) => void
    getCartCount: () => number
    updateQuantity: (itemId: string, size: string, quantity: number) => void
    getCartAmount: () => number
    backendUrl: string
}

// Creează contextul, inițializat cu undefined
export const ShopContext = createContext<ShopContextType | undefined>(undefined)

interface ShopProviderProps {
    children: ReactNode
}

export const ShopContextProvider = ({ children }: ShopProviderProps) => {
    const currency = 'MDL'
    const delivery_fee = 0
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || ''

    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState<CartItems>({})
    const [products, setProducts] = useState<Product[]>([])

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
            if (response.data.success) {
                setProducts(response.data.products.reverse())
            } else {
                toast.error(response.data.message || 'Failed to fetch products')
            }
        } catch (error: any) {
            toast.error(error.message || 'An error occurred while fetching products')
        }
    }

    const addToCart = (itemId: string, size: string) => {
        if (!size) {
            toast.error('Select Product Size')
            return
        }

        setCartItems((prev) => {
            const updated = { ...prev }
            if (!updated[itemId]) updated[itemId] = {}
            updated[itemId][size] = (updated[itemId][size] || 0) + 1
            return updated
        })
    }

    const updateQuantity = (itemId: string, size: string, quantity: number) => {
        setCartItems((prev) => {
            const updated = { ...prev }
            if (!updated[itemId]) return updated
            updated[itemId][size] = quantity
            return updated
        })
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, sizeMap) => {
            return acc + Object.values(sizeMap).reduce((a, b) => a + b, 0)
        }, 0)
    }

    const getCartAmount = () => {
        let total = 0
        for (const itemId in cartItems) {
            const product = products.find((p) => p._id === itemId)
            if (!product) continue
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size]
                total += product.price * qty
            }
        }
        return total
    }

    useEffect(() => {
        getProductsData()
    }, [])

    const contextValue: ShopContextType = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        backendUrl,
    }

    return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
}

// Hook personalizat pentru acces la context
export const useShopContext = (): ShopContextType => {
    const context = useContext(ShopContext)
    if (!context) {
        throw new Error('useShopContext must be used within a ShopContextProvider')
    }
    return context
}
