'use client'

import { useRouter } from 'next/navigation'
import { CSSProperties, FormEvent, useState, useEffect } from 'react'

function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0,
	})

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowSize
}

export default function RegisterPage() {
	const { width } = useWindowSize()
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [company, setCompany] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [focusedInput, setFocusedInput] = useState<string | null>(null)

	const router = useRouter()

	const isMobile = width <= 600

	// Stiluri adaptate
	const containerStyle: CSSProperties = {
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#fff',
		color: 'white',
		padding: '1.5rem',
		fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
	}

	const backgroundImageStyle: CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundImage: 'url("/images/mountains.jpg")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		zIndex: 0,
	}

	const overlayStyle: CSSProperties = {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100vw',
		height: '100vh',
		backgroundColor: 'rgba(35, 36, 58, 0.85)',
		backdropFilter: 'blur(1px)',
		zIndex: 1,
	}

	const cardStyle: CSSProperties = {
		width: '100%',
		maxWidth: '600px',
		minHeight: isMobile ? 'auto' : '480px',
		borderRadius: '24px',
		boxShadow: '0 12px 28px rgba(0, 0, 0, 0.7)',
		position: 'relative',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		background: '#1E1E1E',
		zIndex: 2,
		cursor: 'default',
		padding: isMobile ? '1.5rem 1rem' : undefined,
	}

	const contentStyle: CSSProperties = {
		position: 'relative',
		padding: isMobile ? '1rem' : '2rem',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		color: 'white',
	}

	const headerSmallStyle: CSSProperties = {
		fontSize: isMobile ? '0.75rem' : '0.85rem',
		letterSpacing: '0.15em',
		textTransform: 'uppercase',
		color: '#9ca3af',
		marginBottom: '0.5rem',
		fontWeight: 600,
	}

	const headerBigStyle: CSSProperties = {
		fontSize: isMobile ? '1.5rem' : '2rem',
		fontWeight: '900',
		marginBottom: '1rem',
		lineHeight: 1.1,
		userSelect: 'none',
	}

	const blueDotStyle: CSSProperties = {
		color: '#27ae60B6',
		userSelect: 'none',
	}

	const paragraphStyle: CSSProperties = {
		fontSize: isMobile ? '0.8rem' : '0.9rem',
		color: '#a1a5b8',
		marginBottom: '1.8rem',
	}

	const formStyle: CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: isMobile ? '0.75rem' : '1rem',
		flexGrow: 1,
		justifyContent: 'center',
	}

	const inputGroupStyle: CSSProperties = {
		display: 'flex',
		flexDirection: isMobile ? 'column' : 'row',
		gap: isMobile ? '0.75rem' : '1rem',
	}

	const inputWrapperStyle: CSSProperties = {
		position: 'relative',
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
	}

	const iconStyle: CSSProperties = {
		position: 'absolute',
		left: '12px',
		width: '18px',
		height: '18px',
		fill: '#27ae60',
		pointerEvents: 'none',
	}

	const inputStyle: CSSProperties = {
		backgroundColor: 'rgba(46, 50, 77, 0.85)',
		color: 'white',
		padding: '0.55rem 1rem 0.55rem 2.5rem',
		borderRadius: '14px',
		borderWidth: '1.5px',
		borderStyle: 'solid',
		borderColor: 'transparent',
		outline: 'none',
		fontSize: isMobile ? '0.9rem' : '0.95rem',
		fontWeight: 500,
		flexGrow: 1,
		transition: 'border-color 0.3s, background-color 0.3s',
		height: '38px',
	}

	const inputFocusStyle: CSSProperties = {
		borderColor: '#27ae60',
		backgroundColor: 'rgba(57, 68, 99, 0.9)',
	}

	const buttonsContainerStyle: CSSProperties = {
		display: 'flex',
		flexDirection: isMobile ? 'column' : 'row',
		gap: isMobile ? '0.75rem' : '1rem',
		marginTop: isMobile ? '1rem' : '2rem',
	}

	const buttonGrayStyle: CSSProperties = {
		backgroundColor: '#5a5f7a',
		color: 'white',
		borderRadius: '18px',
		padding: '0.9rem 1.5rem',
		flexGrow: 1,
		cursor: 'pointer',
		border: 'none',
		fontWeight: 700,
		fontSize: isMobile ? '0.9rem' : '1rem',
		transition: 'background-color 0.3s, transform 0.15s',
	}

	const buttonBlueStyle: CSSProperties = {
		backgroundColor: '#27ae60',
		color: 'white',
		borderRadius: '18px',
		padding: '0.9rem 1.5rem',
		flexGrow: 1,
		cursor: 'pointer',
		border: 'none',
		fontWeight: 700,
		fontSize: isMobile ? '0.9rem' : '1rem',
		transition: 'background-color 0.3s, transform 0.15s',
	}

	const icons = {
		firstName: (
			<svg style={iconStyle} viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
				<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
			</svg>
		),
		lastName: (
			<svg style={iconStyle} viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
				<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
			</svg>
		),
		company: (
			<svg style={iconStyle} viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
				<path d='M4 4h16v2H4zm0 4h16v12H4z' />
			</svg>
		),
		email: (
			<svg style={iconStyle} viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
				<path d='M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16z' />
			</svg>
		),
		password: (
			<svg style={iconStyle} viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
				<path d='M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6h-1V7a5 5 0 10-10 0v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z' />
			</svg>
		),
	}

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Verifică dacă emailul există deja
		const res = await fetch('/api/auth/check-email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email }),
		})
		const data = await res.json()

		if (data.exists) {
			alert('Email already exists')
			return
		}

		// Apelează endpoint-ul pentru înregistrare
		const registerRes = await fetch('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstName, lastName, company, email, password }),
		})

		if (registerRes.ok) {
			router.push('/auth/login')
		} else {
			alert('Failed to register')
		}
	}

	return (
		<main style={containerStyle}>
			<div style={backgroundImageStyle}></div>
			<div style={overlayStyle}></div>
			<section style={cardStyle}>
				<div style={contentStyle}>
					<header>
						<h2 style={headerSmallStyle}>
							<span style={blueDotStyle}>• </span>Register
						</h2>
						<h1 style={headerBigStyle}>Create a new account</h1>
						<p style={paragraphStyle}>Please enter your details below to register a new account.</p>
					</header>
					<form style={formStyle} onSubmit={handleSubmit}>
						<div style={inputGroupStyle}>
							<div style={inputWrapperStyle}>
								{icons.firstName}
								<input
									style={{
										...inputStyle,
										...(focusedInput === 'firstName' ? inputFocusStyle : {}),
									}}
									placeholder='First name'
									type='text'
									name='firstName'
									autoComplete='given-name'
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									onFocus={() => setFocusedInput('firstName')}
									onBlur={() => setFocusedInput(null)}
								/>
							</div>
							<div style={inputWrapperStyle}>
								{icons.lastName}
								<input
									style={{
										...inputStyle,
										...(focusedInput === 'lastName' ? inputFocusStyle : {}),
									}}
									placeholder='Last name'
									type='text'
									name='lastName'
									autoComplete='family-name'
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									onFocus={() => setFocusedInput('lastName')}
									onBlur={() => setFocusedInput(null)}
								/>
							</div>
						</div>
						<div style={inputWrapperStyle}>
							{icons.company}
							<input
								style={{
									...inputStyle,
									...(focusedInput === 'company' ? inputFocusStyle : {}),
								}}
								placeholder='Company'
								type='text'
								name='company'
								autoComplete='organization'
								value={company}
								onChange={(e) => setCompany(e.target.value)}
								onFocus={() => setFocusedInput('company')}
								onBlur={() => setFocusedInput(null)}
							/>
						</div>
						<div style={inputWrapperStyle}>
							{icons.email}
							<input
								style={{
									...inputStyle,
									...(focusedInput === 'email' ? inputFocusStyle : {}),
								}}
								placeholder='Email'
								type='email'
								name='email'
								autoComplete='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => setFocusedInput('email')}
								onBlur={() => setFocusedInput(null)}
							/>
						</div>
						<div style={inputWrapperStyle}>
							{icons.password}
							<input
								style={{
									...inputStyle,
									...(focusedInput === 'password' ? inputFocusStyle : {}),
								}}
								placeholder='Password'
								type='password'
								name='password'
								autoComplete='new-password'
								required
								minLength={6}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => setFocusedInput('password')}
								onBlur={() => setFocusedInput(null)}
							/>
						</div>
						<div style={buttonsContainerStyle}>
							<button
								type='button'
								style={buttonGrayStyle}
								onClick={() => router.push('/auth/login')}
							>
								Log in
							</button>
							<button type='submit' style={buttonBlueStyle}>
								Register
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	)
}
