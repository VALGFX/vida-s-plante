'use client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import ProductItem from '@/components/ProductItem';
import Navbar from "@/components/Navbar";

interface Product {
    id: string;
    name: string;
    category: string;
    type: string;
    price: number;
    image?: string;
}

type SortType = 'relevant' | 'low-high' | 'high-low';

const Collection: React.FC = () => {
    // Produse fictive
    const products: Product[] = [
        { id: '1', name: 'Fontana Acquario Piccola', category: 'Acquario', type: 'Estivo', price: 95, image: '/images/fountain1.jpg' },
        // ... restul produselor (ca în exemplul tău)
    ];

    const [filterCategory, setFilterCategory] = useState<string[]>([]);
    const [filterType, setFilterType] = useState<string[]>([]);
    const [sort, setSort] = useState<SortType>('relevant');
    const [openCategory, setOpenCategory] = useState(true);
    const [openType, setOpenType] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    useEffect(() => {
        let result = products;

        if (filterCategory.length > 0) {
            result = result.filter(product => filterCategory.includes(product.category));
        }
        if (filterType.length > 0) {
            result = result.filter(product => filterType.includes(product.type));
        }

        if (sort === 'low-high') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === 'high-low') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [filterCategory, filterType, sort]);

    const handleFilterCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setFilterCategory(prev =>
            checked ? [...prev, value] : prev.filter(c => c !== value)
        );
    };

    const handleFilterTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setFilterType(prev =>
            checked ? [...prev, value] : prev.filter(t => t !== value)
        );
    };

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSort(event.target.value as SortType);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <aside className="sidebar">
                    <div className="filter-box">
                        <h2 className="filter-title">
                            <button
                                className="filter-toggle"
                                onClick={() => setOpenCategory(!openCategory)}
                                aria-expanded={openCategory}
                                aria-controls="category-filter"
                            >
                                Categorii <span className={openCategory ? 'arrow open' : 'arrow'}>▶</span>
                            </button>
                        </h2>
                        <div id="category-filter" className={`checkbox-group ${openCategory ? 'open' : ''}`}>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value="Acquario"
                                    onChange={handleFilterCategoryChange}
                                    checked={filterCategory.includes('Acquario')}
                                />
                                Acquario
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value="Stagni"
                                    onChange={handleFilterCategoryChange}
                                    checked={filterCategory.includes('Stagni')}
                                />
                                Stagni
                            </label>
                        </div>

                        <h2 className="filter-title">
                            <button
                                className="filter-toggle"
                                onClick={() => setOpenType(!openType)}
                                aria-expanded={openType}
                                aria-controls="type-filter"
                            >
                                Tipuri <span className={openType ? 'arrow open' : 'arrow'}>▶</span>
                            </button>
                        </h2>
                        <div id="type-filter" className={`checkbox-group ${openType ? 'open' : ''}`}>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value="Estivo"
                                    onChange={handleFilterTypeChange}
                                    checked={filterType.includes('Estivo')}
                                />
                                Estivo
                            </label>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    value="Invernale"
                                    onChange={handleFilterTypeChange}
                                    checked={filterType.includes('Invernale')}
                                />
                                Invernale
                            </label>
                        </div>
                    </div>
                </aside>

                <main className="main">
                    <div className="catalog-box">
                        <div className="header">
                            <h1 className="title">Catalog Produse</h1>
                            <select className="sort-select" value={sort} onChange={handleSortChange}>
                                <option value="relevant">Relevanță</option>
                                <option value="low-high">Preț: Mic → Mare</option>
                                <option value="high-low">Preț: Mare → Mic</option>
                            </select>
                        </div>

                        <div className="product-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <ProductItem
                                        key={product.id}
                                        item={{
                                            id: product.id,
                                            name: product.name,
                                            image: product.image ? [product.image] : [],
                                            price: product.price,
                                        }}
                                    />
                                ))
                            ) : (
                                <p className="empty-message">Nu există produse care să corespundă filtrelor.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>

            <style jsx>{`
        .container {
          margin-top: 90px;
          display: flex;
          flex-direction: column;
          max-width: 80%;
          gap: 32px;
          border-radius: 20px;
          background-color: #f7f8f7;
          width: 100%;
          margin: 80px auto;
          padding: 40px 8px;
        }
        @media(min-width: 768px) {
          .container {
            flex-direction: row;
            padding: 40px 40px;
          }
        }
        .sidebar {
          width: 100%;
          max-width: 280px;
          margin-bottom: 32px;
          flex-shrink: 0;
        }
        @media(min-width: 768px) {
          .sidebar {
            margin-bottom: 0;
          }
        }
        .filter-box {
          background-color: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                      0 4px 6px -4px rgb(0 0 0 / 0.1);
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: sticky;
          top: 112px;
        }
        .filter-title {
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: 0.025em;
          margin-bottom: 8px;
          color: #1f2937;
        }
        .filter-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          text-align: left;
          font-weight: 500;
          color: #4b5563;
          margin-bottom: 8px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          user-select: none;
        }
        .filter-toggle span {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        .arrow {
          transform: rotate(0deg);
        }
        .arrow.open {
          transform: rotate(90deg);
        }
        .checkbox-group {
          display: none;
          flex-direction: column;
          gap: 12px;
          background-color: #f7f8f7;
          border-radius: 12px;
          padding: 12px;
        }
        .checkbox-group.open {
          display: flex;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4b5563;
          font-size: 0.875rem;
          font-weight: 400;
          cursor: pointer;
        }
        .checkbox-label input[type='checkbox'] {
          accent-color: #111;
          border-radius: 0.25rem;
          cursor: pointer;
          width: 18px;
          height: 18px;
        }
        .main {
          flex: 1;
        }
        .catalog-box {
          background-color: white;
          border-radius: 24px;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
                      0 4px 6px -4px rgb(0 0 0 / 0.1);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .title {
          font-weight: 700;
          font-size: 2rem;
          color: #111827;
        }
        .sort-select {
          border: 1px solid #d1d5db;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          outline: none;
          background-color: white;
          transition: border-color 0.2s ease;
        }
        .sort-select:hover,
        .sort-select:focus {
          border-color: #6b7280;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .empty-message {
          font-style: italic;
          color: #6b7280;
          font-weight: 500;
        }
      `}</style>
        </>
    );
};

export default Collection;
