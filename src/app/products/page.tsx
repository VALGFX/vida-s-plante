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
        { id: '1', name: 'Fontana Acquario Piccola', category: 'Acquario', type: 'Estivo', price: 95, image: '/images/product_2.jpg' },
        { id: '2', name: 'Laghetto Classico', category: 'Stagni', type: 'Invernale', price: 120, image: '/images/product_3.jpg' },
        { id: '3', name: 'Sorgente Cristallo', category: 'Acquario', type: 'Estivo', price: 85, image: '/images/product_4.jpg' },
        { id: '4', name: 'Oasi Verde', category: 'Stagni', type: 'Estivo', price: 110, image: '/images/product_5.jpg' },
        { id: '5', name: 'Fontana Mediterranea', category: 'Acquario', type: 'Invernale', price: 130, image: '/images/product_6.jpg' },
        { id: '6', name: 'Laguna Blu', category: 'Stagni', type: 'Estivo', price: 150, image: '/images/product_7.jpg' },
        { id: '7', name: 'Acqua Viva', category: 'Acquario', type: 'Invernale', price: 90, image: '/images/product_8.jpg' },
        { id: '8', name: 'Stagno delle Ninfee', category: 'Stagni', type: 'Invernale', price: 140, image: '/images/product_9.jpg' },
        { id: '9', name: 'Fonte di Luce', category: 'Acquario', type: 'Estivo', price: 100, image: '/images/product_10.jpg' },
        { id: '10', name: 'Laghetto Sereno', category: 'Stagni', type: 'Estivo', price: 115, image: '/images/product_11.jpg' },
        { id: '11', name: 'Fontana dei Sogni', category: 'Acquario', type: 'Invernale', price: 125, image: '/images/product_12.jpg' },
        { id: '12', name: "Oasi d'Acqua", category: 'Stagni', type: 'Estivo', price: 135, image: '/images/product_13.jpg' },
        { id: '13', name: 'Sorgente Pura', category: 'Acquario', type: 'Estivo', price: 105, image: '/images/product_14.jpg' },
        { id: '14', name: "Laghetto d'Argento", category: 'Stagni', type: 'Invernale', price: 145, image: '/images/product_15.jpg' },
        { id: '15', name: 'Fontana del Sole', category: 'Acquario', type: 'Invernale', price: 155, image: '/images/product_16.jpg' },
        { id: '16', name: 'Laguna Cristallina', category: 'Stagni', type: 'Estivo', price: 165, image: '/images/product_17.jpg' },
        { id: '17', name: 'Acqua Serena', category: 'Acquario', type: 'Estivo', price: 115, image: '/images/product_18.jpg' },
        { id: '18', name: 'Stagno Tranquillo', category: 'Stagni', type: 'Invernale', price: 175, image: '/images/product_19.jpg' },
        { id: '19', name: 'Fonte Arcobaleno', category: 'Acquario', type: 'Invernale', price: 185, image: '/images/product_20.jpg' },
        { id: '20', name: 'Laghetto Dorato', category: 'Stagni', type: 'Estivo', price: 195, image: '/images/product_21.jpg' },
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
                <aside className="filters-sidebar">
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

                <main className="content">
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

            {/* aici doar partea CSS din componenta Collection */}
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    padding: 16px;
                }
                .filters-sidebar {
                    margin-bottom: 20px;
                }
                .filter-box {
                    border: 1px solid #ddd;
                    padding: 16px;
                    border-radius: 8px;
                }
                .filter-title {
                    margin: 0 0 8px;
                    font-size: 1.2rem;
                }
                .filter-toggle {
                    background: none;
                    border: none;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0;
                }
                .arrow {
                    transition: transform 0.3s ease;
                }
                .arrow.open {
                    transform: rotate(180deg);
                }
                .checkbox-group {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                    margin-bottom: 16px;
                }
                .checkbox-group.open {
                    max-height: 500px; /* suficient să arate toate elementele */
                }
                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                    cursor: pointer;
                    font-weight: 400;
                }
                .content {
                    width: 100%;
                }
                .catalog-box {
                    margin-top: 16px;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .title {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                }
                .sort-select {
                    padding: 6px 12px;
                    font-size: 1rem;
                    border-radius: 4px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                }
                .product-grid {
                    display: grid;
                    gap: 24px;
                    grid-template-columns: 1fr; /* 1 col pe mobil */
                }
                .empty-message {
                    font-style: italic;
                    color: #666;
                }

                /* Tablete */
                @media (min-width: 640px) {
                    .container {
                        flex-direction: row;
                    }
                    .filters-sidebar {
                        width: 220px;
                        margin-right: 20px;
                        margin-bottom: 0;
                    }
                    .content {
                        flex-grow: 1;
                    }
                    .product-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                /* Desktop */
                @media (min-width: 1024px) {
                    .product-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            `}</style>
        </>
    );
};

export default Collection;
