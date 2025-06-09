'use client'

import React from 'react'
import Title from './Title'

const CartTotal: React.FC = () => {
  const currency = '€' // Exemplu valutar
  const totalAmount = 150.00
  const discount = 10 // procent
  const deliveryFee = 15.00
  const discountedAmount = totalAmount * (1 - discount / 100)

  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontSize: '1.5rem' }}>
        <Title text1="TOTALE" text2="ACQUISTI" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          marginTop: '0.5rem',
          fontSize: '0.875rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Subtotale</p>
          <p>{totalAmount.toFixed(2)} {currency}</p>
        </div>

        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p>Sconto</p>
            <p>-{(totalAmount - discountedAmount).toFixed(2)} {currency}</p>
          </div>
        )}

        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Spese di spedizione</p>
          <p>{deliveryFee.toFixed(2)} {currency}</p>
        </div>

        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <b>Totale</b>
          <b>{(discountedAmount + deliveryFee).toFixed(2)} {currency}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
