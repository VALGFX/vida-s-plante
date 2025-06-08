'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext, Product } from '@/context/ShopContext'; // Asigură-te că ai exportat Product
import ProductItem from './ProductItem';

const BestSeller: React.FC = () => {
    const { products } = useContext(ShopContext)!;
    const [bestSeller, setBestSeller] = useState<Product[]>([]);

    useEffect(() => {
        const bestProduct = products.filter(item => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="container">
            {/* Header */}
            <div className="header">
                <div>
                    <h2>
                        PRODOTTI <span>PIÙ VENDUTI</span>
                    </h2>
                </div>
                <div>
                    <button>Vedi i prodotti</button>
                </div>
            </div>

            <hr />

            {/* Grid produse */}
            <div className="grid">
                {bestSeller.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                    />
                ))}
            </div>

            <style jsx>{`
        .container {
          background-color: #F2F3F2; /* gray-100 */
          border-radius: 20px;
          padding: 2rem;
          margin: 2.5rem auto;
            max-width: 80%;
        }

        .header {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }

        @media (min-width: 768px) {
          .header {
            flex-direction: row;
            text-align: left;
          }
        }

        h2 {
          font-weight: 800;
          font-size: 2rem;
          color: #1f2937; /* gray-800 */
          margin: 0;
        }

        h2 span {
          font-weight: 400;
          color: #6b7280; /* gray-500 */
        }

        button {
          background-color: #000000;
          color: white;
          border-radius: 0.75rem;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #374151; /* gray-800 */
        }

        hr {
          border: 1px solid #d1d5db; /* gray-300 */
          margin-bottom: 2rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 768px) {
          .grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }
      `}</style>
        </div>
    );
};

export default BestSeller;
