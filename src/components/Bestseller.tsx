'use client';

import React from 'react';
import ProductItem from './ProductItem';

const fakeProducts = [
  {
    _id: '1',
    name: 'Produs Bestseller 1',
    image: ['/images/product1.jpg'],
    price: 120,
  },
  {
    _id: '2',
    name: 'Produs Bestseller 2',
    image: ['/images/product2.jpg'],
    price: 90,
  },
  {
    _id: '3',
    name: 'Produs Bestseller 3',
    image: ['/images/product3.jpg'],
    price: 150,
  },
  {
    _id: '4',
    name: 'Produs Bestseller 4',
    image: ['/images/product4.jpg'],
    price: 80,
  },
  {
    _id: '5',
    name: 'Produs Bestseller 5',
    image: ['/images/product5.jpg'],
    price: 110,
  },
];

const BestSeller: React.FC = () => {
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
        {fakeProducts.map((item) => (
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
          background-color: #f2f3f2;
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
          color: #1f2937;
          margin: 0;
        }

        h2 span {
          font-weight: 400;
          color: #6b7280;
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
          background-color: #374151;
        }

        hr {
          border: 1px solid #d1d5db;
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
