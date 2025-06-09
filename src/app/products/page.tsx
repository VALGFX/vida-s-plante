import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import ProductItem from '@/components/ProductItem';
import { ShopContext } from '@/context/ShopContext';
import Navbar from "@/components/Navbar";

// ... stiluri CSS rămân neschimbate

// Tipul Product (adaugă-l dacă nu e deja definit)
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  type: string;
  image?: string;
};

const generateDummyProducts = (): Product[] => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Produs Fictiv ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 10,
    category: i % 2 === 0 ? 'Acquario' : 'Stagni',
    type: i % 2 === 0 ? 'Estivo' : 'Invernale',
    image: `https://via.placeholder.com/300x200?text=Produs+${i + 1}`,
  }));
};

const Collection: React.FC = () => {
  const context = useContext(ShopContext);

  // fallback dacă contextul e undefined
  const productsFromContext = context?.products ?? [];

  const dummyProducts = generateDummyProducts();

  const products = productsFromContext.length > 0 ? productsFromContext : dummyProducts;
  const search = context?.search ?? '';
  const showSearch = context?.showSearch ?? false;

  const [category, setCategory] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [sortType, setSortType] = useState<'relavent' | 'low-high' | 'high-low'>('relavent');
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  const [openCategory, setOpenCategory] = useState<boolean>(true);
  const [openType, setOpenType] = useState<boolean>(true);

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleType = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setType(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (type.length > 0) {
      filtered = filtered.filter(item => type.includes(item.type));
    }

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    const sorted = [...filterProducts];
    if (sortType === 'low-high') sorted.sort((a, b) => a.price - b.price);
    else if (sortType === 'high-low') sorted.sort((a, b) => b.price - a.price);
    setFilterProducts(sorted);
  };

  useEffect(() => {
    applyFilter();
  }, [category, type, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <>
      <Navbar />
      <Container>
        {/* ... restul codului rămâne neschimbat */}
        <Main>
          <CatalogBox>
            <Header>
              <Title>Catalogo</Title>
              <SortSelect
                value={sortType}
                onChange={e =>
                  setSortType(e.target.value as 'relavent' | 'low-high' | 'high-low')
                }
              >
                <option value="relavent">Ordina per</option>
                <option value="low-high">Prezzo crescente</option>
                <option value="high-low">Prezzo decrescente</option>
              </SortSelect>
            </Header>

            <ProductGrid>
              {filterProducts.length > 0 ? (
                filterProducts.map(item => (
                  <ProductItem key={item.id} item={item} />
                ))
              ) : (
                <EmptyMessage>Nessun prodotto trovato</EmptyMessage>
              )}
            </ProductGrid>
          </CatalogBox>
        </Main>
      </Container>
    </>
  );
};

export default Collection;
