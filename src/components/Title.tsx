import React from 'react'

interface TitleProps {
    text1: string
    text2: string
}

const Title: React.FC<TitleProps> = ({ text1, text2 }) => {
    return (
        <div
            style={{
                display: 'inline-flex',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '0.75rem',
            }}
        >
            <p style={{ color: '#6B7280' /* gray-500 */ }}>
                {text1}{' '}
                <span style={{ color: '#374151', fontWeight: 500 /* gray-700 + medium */ }}>
          {text2}
        </span>
            </p>
            <p
                style={{
                    width: '2rem',
                    height: '1px',
                    backgroundColor: '#374151' /* gray-700 */,
                }}
            ></p>
        </div>
    )
}

export default Title
