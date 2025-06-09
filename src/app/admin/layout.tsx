// src/app/admin/layout.tsx
import React from 'react'

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', background: '#333', color: 'white' }}>
          <h1>Admin Dashboard</h1>
        </header>
        <main style={{ padding: '20px' }}>{children}</main>
      </body>
    </html>
  )
}

export default AdminLayout
