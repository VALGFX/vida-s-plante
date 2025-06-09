'use client';

import React, { useContext, useEffect, useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import ProductItem from '@/components/ProductItem';
import { ShopContext } from '@/context/ShopContext';
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  image: string[];
}

const Container = styled.div`
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

  @media(min-width: 768px) {
    flex-direction: row;
    padding: 40px 40px;
  }
`;

const Sidebar = styled.aside`
  width: 100%;
  max-width: 280px;
  margin-bottom: 32px;
  flex-shrink: 0;

  @media(min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FilterBox = styled.div`
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
`;

const FilterTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  margin-bottom: 8px;
  color: #1f2937;
`;

const FilterToggleButton = styled.button<{ open: boolean }>`
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

  span {
    display: inline-block;
    transition: transform 0.3s ease;
    transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(0deg)')};
  }
`;

const CheckboxGroup = styled.div<{ open: boolean }>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  gap: 12px;
  background-color: #f7f8f7;
  border-radius: 12px;
  padding: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: #111;
    border-radius: 0.25rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

const Main = styled.main`
  flex: 1;
`;

const CatalogBox = styled.div`
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 24px 40px;
  margin-bottom: 24px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;

  @media(min-width: 768px) {
    flex-direction: row;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  color: #1f2937;
  margin: 0;
`;

const SortSelect = styled.select`
  max-width: 280px;
  width: 100%;
  border-radius: 12px;
  background-color: white;
  padding: 8px 12px;
  font-size: 1rem;
  color: #6b7280;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #2563eb;
    color: #2563eb;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const EmptyMessage = styled.p`
  font-weight: 600;
  font-size: 1.125rem;
  color: #374151;
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
`;

const Collection: React.FC = () => {
  const { products, search, showSearch } = useContext(ShopContext)!;

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
        <Sidebar>
          <FilterBox>
            <FilterTitle>FILTRO</FilterTitle>

            <div>
              <FilterToggleButton onClick={() => setOpenCategory(v => !v)} open={openCategory}>
                CATEGORIA
                <span>
                  <svg width="16" height="16" fill="none" aria-hidden="true" focusable="false">
                    <path
                      d="M6 12l4-4-4-4"
                      stroke="#222"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </FilterToggleButton>
              <CheckboxGroup open={openCategory}>
                {['Acquario', 'Stagni'].map(cat => (
                  <CheckboxLabel key={cat}>
                    <input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                    />
                    {cat}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </div>

            <div>
              <FilterToggleButton onClick={() => setOpenType(v => !v)} open={openType}>
                TIPO
                <span>
                  <svg width="16" height="16" fill="none" aria-hidden="true" focusable="false">
                    <path
                      d="M6 12l4-4-4-4"
                      stroke="#222"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </FilterToggleButton>
              <CheckboxGroup open={openType}>
                {['Estivo', 'Invernale'].map(tp => (
                  <CheckboxLabel key={tp}>
                    <input
                      type="checkbox"
                      value={tp}
                      checked={type.includes(tp)}
                      onChange={toggleType}
                    />
                    {tp}
                  </CheckboxLabel>
                ))}
              </CheckboxGroup>
            </div>
          </FilterBox>
        </Sidebar>

        <Main>
          <CatalogBox>
            <Header>
              <Title>Catalogo</Title>
              <SortSelect
                value={sortType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
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
