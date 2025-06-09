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
    // 20 produse fictive cu imagini
    const products: Product[] = [
        { id: '1', name: 'Fontana Acquario Piccola', category: 'Acquario', type: 'Estivo', price: 95, image: '/images/fountain1.jpg' },
        { id: '2', name: 'Laghetto Classico', category: 'Stagni', type: 'Invernale', price: 120, image: '/images/fountain2.jpg' },
        { id: '3', name: 'Sorgente Cristallo', category: 'Acquario', type: 'Estivo', price: 85, image: '/images/fountain3.jpg' },
        { id: '4', name: 'Oasi Verde', category: 'Stagni', type: 'Estivo', price: 110, image: '/images/fountain4.jpg' },
        { id: '5', name: 'Fontana Mediterranea', category: 'Acquario', type: 'Invernale', price: 130, image: '/images/fountain5.jpg' },
        { id: '6', name: 'Laguna Blu', category: 'Stagni', type: 'Estivo', price: 150, image: '/images/fountain6.jpg' },
        { id: '7', name: 'Acqua Viva', category: 'Acquario', type: 'Invernale', price: 90, image: '/images/fountain7.jpg' },
        { id: '8', name: 'Stagno delle Ninfee', category: 'Stagni', type: 'Invernale', price: 140, image: '/images/fountain8.jpg' },
        { id: '9', name: 'Fonte di Luce', category: 'Acquario', type: 'Estivo', price: 100, image: '/images/fountain9.jpg' },
        { id: '10', name: 'Laghetto Sereno', category: 'Stagni', type: 'Estivo', price: 115, image: '/images/fountain10.jpg' },
        { id: '11', name: 'Fontana dei Sogni', category: 'Acquario', type: 'Invernale', price: 125, image: '/images/fountain11.jpg' },
        { id: '12', name: 'Oasi d\'Acqua', category: 'Stagni', type: 'Estivo', price: 135, image: '/images/fountain12.jpg' },
        { id: '13', name: 'Sorgente Pura', category: 'Acquario', type: 'Estivo', price: 105, image: '/images/fountain13.jpg' },
        { id: '14', name: 'Laghetto d\'Argento', category: 'Stagni', type: 'Invernale', price: 145, image: '/images/fountain14.jpg' },
        { id: '15', name: 'Fontana del Sole', category: 'Acquario', type: 'Invernale', price: 155, image: '/images/fountain15.jpg' },
        { id: '16', name: 'Laguna Cristallina', category: 'Stagni', type: 'Estivo', price: 165, image: '/images/fountain16.jpg' },
        { id: '17', name: 'Acqua Serena', category: 'Acquario', type: 'Estivo', price: 115, image: '/images/fountain17.jpg' },
        { id: '18', name: 'Stagno Tranquillo', category: 'Stagni', type: 'Invernale', price: 175, image: '/images/fountain18.jpg' },
        { id: '19', name: 'Fonte Arcobaleno', category: 'Acquario', type: 'Invernale', price: 185, image: '/images/fountain19.jpg' },
        { id: '20', name: 'Laghetto Dorato', category: 'Stagni', type: 'Estivo', price: 195, image: '/images/fountain20.jpg' },
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
                                Categorii{' '}
                                <img
                                    src="/images/icons/arrow-up.svg"
                                    alt={openCategory ? 'Arrow up' : 'Arrow right'}
                                    className={openCategory ? 'arrow open' : 'arrow'}
                                    style={{ width: '16px', height: '16px', transition: 'transform 0.3s ease' }}
                                />
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
                                Tipuri{' '}
                                <img
                                    src="/images/icons/arrow-up.svg"
                                    alt={openType ? 'Arrow up' : 'Arrow right'}
                                    className={openType ? 'arrow open' : 'arrow'}
                                    style={{ width: '16px', height: '16px', transition: 'transform 0.3s ease' }}
                                />
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
                    max-width: 1200px;
                    gap: 32px;
                    border-radius: 20px;
                    background-color: #f7f8f7;
                    width: 100%;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 40px 16px;
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
                    box-shadow: 0 0 10px rgba(0,0,0,0.05);
                    background: white;
                    border-radius: 24px;
                }
                @media(min-width: 768px) {
                    .sidebar {
                        margin-bottom: 0;
                        position: sticky;
                        top: 112px;
                        height: fit-content;
                    }
                }
                .filter-box {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
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
                .arrow {
                    transform: rotate(0deg);
                    transition: transform 0.3s ease;
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
                    flex-wrap: wrap;
                    gap: 12px;
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
                    transition: border-color 0.3s ease;
                }
                .sort-select:hover,
                .sort-select:focus {
                    border-color: #2563eb;
                }
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
                @media (min-width: 768px) {
                    .product-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (min-width: 1024px) {
                    .product-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                .empty-message {
                    color: #6b7280;
                    font-size: 1rem;
                    text-align: center;
                    padding: 32px 0;
                }
            `}</style>
        </>
    );
};

export default Collection;
