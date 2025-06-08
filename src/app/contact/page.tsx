"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi"
import Navbar from "@/components/Navbar"

const ContactPage = () => {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        oggetto: "",
        messaggio: "",
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert(`Messaggio inviato! Grazie, ${formData.nome}!`)
        setFormData({ nome: "", email: "", oggetto: "", messaggio: "" })
    }

    return (
        <>
            <Navbar/>
        <main style={styles.container}>
            <h1 style={styles.title}>Contattaci</h1>
            <p style={styles.subtitle}>
                Siamo qui per aiutarti. Compila il modulo sottostante e ti risponderemo al più presto.
            </p>

            <section style={styles.content}>
                {/* Coloana 1 - Info */}
                <div style={styles.info}>
                    <h2 style={styles.infoTitle}>Informazioni di contatto</h2>
                    <div style={styles.infoItem}>
                        <FiMapPin style={styles.icon} />
                        <span>Via Esempio 123, Milano, Italia</span>
                    </div>
                    <div style={styles.infoItem}>
                        <FiPhone style={styles.icon} />
                        <span>+39 02 1234 5678</span>
                    </div>
                    <div style={styles.infoItem}>
                        <FiMail style={styles.icon} />
                        <span>contatto@azienda.it</span>
                    </div>
                    <div style={styles.infoItem}>
                        <FiClock style={styles.icon} />
                        <span>Lun - Ven, 9:00 - 18:00</span>
                    </div>
                </div>

                {/* Coloana 2 - Formular */}
                <form style={styles.form} onSubmit={onSubmitHandler}>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={onChangeHandler}
                        placeholder="Il tuo nome"
                        required
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChangeHandler}
                        placeholder="La tua email"
                        required
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="oggetto"
                        value={formData.oggetto}
                        onChange={onChangeHandler}
                        placeholder="Oggetto"
                        required
                        style={styles.input}
                    />
                    <textarea
                        name="messaggio"
                        value={formData.messaggio}
                        onChange={onChangeHandler}
                        placeholder="Messaggio"
                        required
                        rows={6}
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.button}>Invia messaggio</button>
                </form>
            </section>
        </main>
        </>
    )
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        maxWidth: 900,
        margin: "6rem auto",
        padding: "0 2rem",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "#1f2937",
        backgroundColor: "#fff",
    },
    title: {
        fontWeight: 300,
        fontSize: "3rem",
        textAlign: "center",
        marginBottom: "0.25rem",
        letterSpacing: "1.5px",
        color: "#111827",
    },
    subtitle: {
        textAlign: "center",
        fontWeight: 300,
        fontSize: "1.1rem",
        marginBottom: "4rem",
        color: "#6b7280",
    },
    content: {
        display: "flex",
        gap: "4rem",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    info: {
        flex: "1 1 40%",
        backgroundColor: "#f9fafb",
        borderRadius: 20,
        padding: "2.5rem 3rem",
        boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
        color: "#374151",
        fontWeight: 300,
        fontSize: "1rem",
        lineHeight: 1.7,
        minWidth: 300,
    },
    infoTitle: {
        fontWeight: 400,
        fontSize: "1.8rem",
        marginBottom: "1.75rem",
        color: "#111827",
    },
    infoItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: "1.3rem",
        gap: "0.8rem",
    },
    icon: {
        color: "#22c55e", // verde
        fontSize: "1.3rem",
        minWidth: 20,
    },
    form: {
        flex: "1 1 50%",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        minWidth: 320,
    },
    input: {
        border: "none",
        borderBottom: "2px solid #d1d5db",
        padding: "0.8rem 0",
        fontSize: "1.1rem",
        fontWeight: 300,
        outline: "none",
        transition: "border-color 0.3s ease",
    },
    textarea: {
        border: "none",
        borderBottom: "2px solid #d1d5db",
        padding: "0.8rem 0",
        fontSize: "1.1rem",
        fontWeight: 300,
        outline: "none",
        resize: "vertical",
        minHeight: 150,
        transition: "border-color 0.3s ease",
    },
    button: {
        marginTop: "2rem",
        backgroundColor: "#27ae60B6",
        border: "none",
        borderRadius: 50,
        padding: "0.9rem 3rem",
        fontWeight: 400,
        fontSize: "1.15rem",
        cursor: "pointer",
        color: "#fff",
        alignSelf: "center",
        transition: "background-color 0.3s ease",
    },
}

export default ContactPage
