'use client';

import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import ProductItem from '@/components/ProductItem';

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
  flex-shrink: 0;
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
`;

const FilterTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1f2937;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #4b5563;

  input[type='checkbox'] {
    accent-color: #111;
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
  padding: 24px 40px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
              0 4px 6px -4px rgb(0 0 0 / 0.1);
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
  color: #1f2937;
`;

const SortSelect = styled.select`
  max-width: 280px;
  width: 100%;
  border-radius: 12px;
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  color: #6b7280;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const Collection: React.FC = () => {
  // Fake data de test (frontend only)
  const fakeProducts = [
    { id: '1', name: 'Produs A', price: 100, image: ['/img1.jpg'], category: 'Acquario', type: 'Estivo' },
    { id: '2', name: 'Produs B', price: 150, image: ['/img2.jpg'], category: 'Stagni', type: 'Invernale' }
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Sidebar>
          <FilterBox>
            <FilterTitle>Categoria</FilterTitle>
            <FilterGroup>
              <CheckboxLabel><input type="checkbox" /> Acquario</CheckboxLabel>
              <CheckboxLabel><input type="checkbox" /> Stagni</CheckboxLabel>
            </FilterGroup>

            <FilterTitle>Tipo</FilterTitle>
            <FilterGroup>
              <CheckboxLabel><input type="checkbox" /> Estivo</CheckboxLabel>
              <CheckboxLabel><input type="checkbox" /> Invernale</CheckboxLabel>
            </FilterGroup>
          </FilterBox>
        </Sidebar>

        <Main>
          <CatalogBox>
            <Header>
              <Title>Catalogo</Title>
              <SortSelect>
                <option>Ordina per</option>
                <option>Prezzo crescător</option>
                <option>Prezzo descrescător</option>
              </SortSelect>
            </Header>

            <ProductGrid>
              {fakeProducts.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </ProductGrid>
          </CatalogBox>
        </Main>
      </Container>
    </>
  );
};

export default Collection;
