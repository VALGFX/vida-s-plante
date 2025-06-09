'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const DUMMY_PRODUCTS = [
  {
    id: '1',
    name: 'Prodotto 1',
    description: 'Un prodotto di alta qualità, ideale per l\'uso quotidiano.',
    image: '/images/product_1.jpg',
    price: 49.99,
    oldPrice: 69.99,
    rating: 4.5,
    reviews: 124,
    sizeOptions: ['Piccolo', 'Medio', 'Grande'],
    materialOptions: ['Ceramica', 'Plastica', 'Legno', 'Metallo'],
    colorOptions: ['#D6D3D1', '#16A34A', '#1E40AF', '#000000'],
    sku: 'PLT001A',
    tags: ['Interno', 'Decorativo', 'Prodotto'],
  },
  {
    id: '2',
    name: 'Prodotto 2',
    description: 'Eleganza e funzionalità in un unico prodotto.',
    image: '/images/product_2.jpg',
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.0,
    reviews: 98,
    sizeOptions: ['Piccolo', 'Medio'],
    materialOptions: ['Ceramica', 'Plastica'],
    colorOptions: ['#ffffff', '#FF0000', '#00FF00'],
    sku: 'PLT002B',
    tags: ['Decorazione', 'Elegante', 'Prodotto'],
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = DUMMY_PRODUCTS.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState(product?.sizeOptions[0] || '')
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materialOptions[0] || '')
  const [selectedColor, setSelectedColor] = useState(product?.colorOptions[0] || '')

  if (!product) return <div className="text-red-600 text-center mt-10">Prodotto non trovato.</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Immagine principale */}
      <div>
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden">
          <Image src={product.image} alt={product.name} fill className="object-cover rounded-xl" />
        </div>
        {/* Miniature */}
        <div className="flex gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative w-20 h-20 border rounded-xl overflow-hidden">
              <Image src={product.image} alt={`thumb ${i}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Dettagli prodotto */}
      <div className="flex flex-col gap-5">
        <h2 className="text-sm text-gray-400">Pianta da interno</h2>
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">★ {product.rating}</span>
          <span className="text-sm text-gray-600">({product.reviews} recensioni)</span>
        </div>

        <div className="text-2xl text-green-600 font-bold">
          €{product.price.toFixed(2)}
          <span className="ml-2 text-gray-400 line-through text-lg">€{product.oldPrice.toFixed(2)}</span>
        </div>

        <p className="text-gray-600">{product.description}</p>

        {/* Dimensione */}
        <div>
          <h3 className="font-semibold mb-2">Dimensione del vaso:</h3>
          <div className="flex gap-3">
            {product.sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-xl border ${
                  selectedSize === size ? 'bg-black text-white' : 'text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Materiale */}
        <div>
          <h3 className="font-semibold mb-2">Materiale del vaso:</h3>
          <div className="flex gap-3">
            {product.materialOptions.map((mat) => (
              <button
                key={mat}
                onClick={() => setSelectedMaterial(mat)}
                className={`px-4 py-2 rounded-xl border ${
                  selectedMaterial === mat ? 'bg-yellow-500 text-white' : 'text-gray-700'
                }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Colore */}
        <div>
          <h3 className="font-semibold mb-2">Colore del vaso:</h3>
          <div className="flex gap-3">
            {product.colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? 'ring-2 ring-black' : ''
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>

        {/* Pulsanti */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg">Aggiungi al carrello</button>
          <button className="px-6 py-3 bg-yellow-400 text-black rounded-xl text-lg">Compra ora</button>
        </div>

        {/* SKU e Tag */}
        <div className="text-sm text-gray-500 mt-6">
          <p className="mb-2">Codice prodotto: <span className="font-medium">{product.sku}</span></p>
          <p>Tag: {product.tags.map((t) => `#${t}`).join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
