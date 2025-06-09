// src/app/products/[id]/page.tsx
'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Prodotto 1',
    description: 'Un produs de calitate superioară, ideal pentru uz zilnic.',
    image: '/images/product_1.jpg',
    price: 49.99,
  },
  {
    id: '2',
    name: 'Prodotto 2',
    description: 'Eleganță și funcționalitate într-un singur produs.',
    image: '/images/product_2.jpg',
    price: 59.99,
  },
]

export default function ProductPage() {
  const params = useParams()
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const product = DUMMY_PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Produsul nu a fost găsit.
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10 gap-10">
      <div className="relative w-full lg:w-1/2 h-[400px] rounded-xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-6 w-full lg:w-1/2">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
        <p className="text-2xl text-green-600 font-semibold">{product.price.toFixed(2)} €</p>

        <button className="bg-black text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800 transition duration-200 mt-auto w-fit">
          Adaugă în coș 🛒
        </button>
      </div>
    </div>
  )
}
