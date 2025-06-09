'use client'

import React from 'react'
import Title from './Title'

const CartTotal: React.FC = () => {
    const currency = '€'
    const totalAmount = 150.0
    const discount = 10 // procent
    const deliveryFee = 15.0
    const discountedAmount = totalAmount * (1 - discount / 100)

    return (
        <>
            <div className="cart-total-container">
                <Title text1="TOTALE" text2="ACQUISTI" />

                <div className="cart-details">
                    <div className="row">
                        <p className="label">Subtotale</p>
                        <p className="value">
                            {totalAmount.toFixed(2)} {currency}
                        </p>
                    </div>

                    {discount > 0 && (
                        <div className="row discount">
                            <p className="label">Sconto</p>
                            <p className="value">
                                -{(totalAmount - discountedAmount).toFixed(2)} {currency}
                            </p>
                        </div>
                    )}

                    <hr />

                    <div className="row">
                        <p className="label">Spese di spedizione</p>
                        <p className="value">
                            {deliveryFee.toFixed(2)} {currency}
                        </p>
                    </div>

                    <hr />

                    <div className="row total">
                        <b>Totale</b>
                        <b>{(discountedAmount + deliveryFee).toFixed(2)} {currency}</b>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .cart-total-container {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 1.5rem;
          background-color: #f9fafb;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1f2937;
        }

        .cart-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
          font-size: 1rem;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label {
          margin: 0;
          font-weight: 500;
        }

        .value {
          margin: 0;
          font-weight: 600;
        }

        .discount .label,
        .discount .value {
          color: #ef4444;
        }

        hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 0.5rem 0;
        }

        .total {
          margin-top: 0.75rem;
          font-size: 1.25rem;
          color: #111827;
        }

        /* Responsivitate */
        @media (max-width: 480px) {
          .cart-total-container {
            padding: 1rem;
            max-width: 100%;
          }

          .cart-details {
            font-size: 0.9rem;
            gap: 0.5rem;
          }

          .total {
            font-size: 1.1rem;
          }
        }
      `}</style>
        </>
    )
}

export default CartTotal
