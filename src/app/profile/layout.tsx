// /app/profile/layout.tsx
import React from 'react'

export default function ProfileLayout({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}
