// app/profile/page.tsx
import React from 'react'
import Navbar from '@/components/Navbar'

const ProfilePage: React.FC = () => {

    return (
        <>
            <Navbar />
            <main
                style={{
                    padding: '20px',
                    maxWidth: '800px',
                    margin: '40px auto',
                    fontFamily: 'Arial, sans-serif',
                    lineHeight: 1.6,
                }}
            >
                <h1>Profilul Meu</h1>
                <p>Bine ai venit pe pagina ta de profil!</p>

                <section style={{ marginTop: '20px' }}>
                    <h2>Informații personale</h2>
                    <ul>
                        <li><strong>Nume:</strong> Valeriu</li>
                        <li><strong>Email:</strong> valeriu@example.com</li>
                        <li><strong>Rol:</strong> Utilizator</li>
                    </ul>
                </section>
            </main>
        </>
    )
}

export default ProfilePage
