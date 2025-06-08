//about/page.tsx

'use client'

import React from 'react'
import Title from '@/components/Title'
import Navbar from "@/components/Navbar"

// Stiluri
const styles = {
    container: {
        padding: '3rem 2rem',
        maxWidth: '80%',
        margin: '0 auto',
        fontfamily: "Poppins, sans-serif",
    } as React.CSSProperties,

    sectionTitle: {
        fontSize: 25,
        fontWeight: 400,
        textAlign: 'center' as const,
        paddingTop: 24,
        borderTop: '1.5px solid #CCC',
        marginBottom: 48,
        letterSpacing: 1.1,
    },

    flexRow: {
        display: 'flex',
        flexWrap: 'wrap' as const,
        justifyContent: 'center',
        gap: 40,
        marginBottom: 60,
    },

    flexCol: {
        flex: '1 1 350px',
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: 16,
        justifyContent: 'center',
        color: '#4A4A4A',
    },

    boldTextLarge: {
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1,
    },

    paragraph: {
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.35,
        color: '#555',
    },

    iconText: (color: string) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontWeight: 700,
        fontSize: 18,
        color,
    }),

    image: {
        flexShrink: 0,
        width: '100%',
        maxWidth: 400,
        borderRadius: 14,
        boxShadow: '0 12px 20px rgba(0,0,0,0.12)',
        objectFit: 'cover' as const,
        cursor: 'pointer',
        transition: 'transform 0.35s ease',
    },

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 36,
        marginBottom: 64,
    },

    card: {
        borderRadius: 14,
        padding: 30,
        backgroundColor: 'white',
        boxShadow: '0 6px 12px rgba(0,0,0,0.07)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
    },

    icon: {
        fontSize: 40,
    },

    cardTitle: {
        fontWeight: 700,
        fontSize: 20,
        color: '#222',
    },

    cardDescription: {
        color: '#666',
        fontSize: 15,
        textAlign: 'center' as const,
        lineHeight: 1.55,
    },
}

const About: React.FC = () => {
    const [hoveredImg1, setHoveredImg1] = React.useState(false)
    const [hoveredImg2, setHoveredImg2] = React.useState(false)
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.sectionTitle}>
                    <Title text1="CHI" text2="SIAMO" />
                </div>

                <div style={styles.flexRow}>
                    <img
                        src="/images/about-img-1.jpg"
                        alt="Acquario"
                        style={{
                            ...styles.image,
                            transform: hoveredImg1 ? 'scale(1.06)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setHoveredImg1(true)}
                        onMouseLeave={() => setHoveredImg1(false)}
                    />
                    <div style={styles.flexCol}>
                        <b style={styles.boldTextLarge}>
                            Benvenuti su VIDA • Piante – dove la natura acquatica prende vita!
                        </b>
                        <p style={styles.paragraph}>
                            Siamo un’azienda appassionata della bellezza e dell’equilibrio degli
                            ecosistemi acquatici. Specializzati nella vendita di piante per
                            acquari e laghetti, offriamo una selezione accurata di specie sane e
                            adatte a qualsiasi tipo di ambiente.
                        </p>
                        <b style={styles.iconText('#16A34A')}>
                            <span>🌱</span> Qualità garantita
                        </b>
                        <p style={styles.paragraph}>
                            Tutte le nostre piante sono coltivate e selezionate con attenzione
                            per offrire vitalità e bellezza naturale all’habitat acquatico.
                        </p>
                    </div>
                </div>

                <div style={{ ...styles.flexRow, flexDirection: 'row-reverse' }}>
                    <img
                        src="/images/about-img-2.jpg"
                        alt="Laghetto"
                        style={{
                            ...styles.image,
                            transform: hoveredImg2 ? 'scale(1.06)' : 'scale(1)',
                        }}
                        onMouseEnter={() => setHoveredImg2(true)}
                        onMouseLeave={() => setHoveredImg2(false)}
                    />
                    <div style={styles.flexCol}>
                        <b style={styles.iconText('#D97706')}>
                            <span>🤝</span> Supporto personalizzato
                        </b>
                        <p style={styles.paragraph}>
                            Il nostro team di esperti è a vostra disposizione per aiutarvi a
                            scegliere le piante più adatte e per offrirvi consigli pratici sulla
                            loro cura.
                        </p>
                        <b style={styles.iconText('#2563EB')}>
                            <span>🌊</span> La nostra visione
                        </b>
                        <p style={styles.paragraph}>
                            Crediamo che ogni acquario o laghetto sia un angolo di natura viva.
                            Il nostro obiettivo è ispirarvi a creare spazi acquatici belli, sani
                            e pieni di vita.
                        </p>
                    </div>
                </div>

                <div style={{ fontSize: 24, padding: '1rem 0', textAlign: 'left', marginBottom: 40 }}>
                    <Title text1="PERCHÉ" text2="SCEGLIERE NOI?" />
                </div>

                <div style={styles.grid}>
                    {[
                        {
                            icon: '🌱',
                            title: 'Crescente',
                            description:
                                'Coltiviamo in condizioni ottimali per offrirti piante splendide e un assortimento completo in ogni stagione.',
                        },
                        {
                            icon: '📦',
                            title: 'Imballaggi',
                            description:
                                'Imballaggi studiati per proteggere al meglio ogni pianta e prodotto, dalla nostra serra a casa tua.',
                        },
                        {
                            icon: '🚚',
                            title: 'Trasporto',
                            description:
                                'Consegniamo i nostri prodotti con i nostri mezzi per fornirvi un servizio veloce e affidabile.',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.card,
                                boxShadow:
                                    hoveredCard === i
                                        ? '0 12px 24px rgba(0,0,0,0.18)'
                                        : '0 6px 12px rgba(0,0,0,0.07)',
                            }}
                            onMouseEnter={() => setHoveredCard(i)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <span style={styles.icon}>{item.icon}</span>
                            <b style={styles.cardTitle}>{item.title}</b>
                            <p style={styles.cardDescription}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default About
