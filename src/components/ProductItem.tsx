// components/ProductItem.tsx
import Link from 'next/link'

interface ProductItemProps {
    id: string
    name: string
    image: string
    price: number
}

const ProductItem: React.FC<ProductItemProps> = ({ id, name, image, price }) => {
    return (
        <Link href={`/product/${id}`} passHref>
            <a className="group block bg-white rounded-3xl p-5 flex flex-col gap-5 shadow-sm border border-gray-100 max-w-xs mx-auto transition-colors duration-500 hover:bg-[#B5C9B6] cursor-pointer">
                {/* Titlu și buton */}
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight max-w-[80%]">
                        {name}
                    </h3>
                    <button
                        className="bg-gray-200 rounded-full p-3 hover:bg-gray-300 transition"
                        aria-label="Vezi detalii"
                        type="button"
                        tabIndex={-1}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </button>
                </div>

                <hr className="border-gray-300" />

                {/* Preț */}
                <div className="text-lg font-medium text-gray-900">
                    ${price.toFixed(2)}
                </div>

                {/* Imagine */}
                <div className="w-full aspect-square overflow-hidden flex items-center justify-center">
                    <img
                        src={image}
                        alt={name}
                        className="object-contain w-full h-full rounded-2xl"
                        loading="lazy"
                    />
                </div>
            </a>
        </Link>
    )
}

export default ProductItem
