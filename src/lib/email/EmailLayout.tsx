import { Html, Head, Text, Img, Font } from '@react-email/components'

interface EmailLayoutProps {
	children: React.ReactNode
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ children }) => {
	const logoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/images/logos/metropolitana-branco.svg`

	return (
		<Html lang='pt-br'>
			<Head>
				<Font
					fontFamily='Plus Jakarta Sans'
					fallbackFontFamily='Verdana'
					webFont={{
						url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap',
						format: 'woff2',
					}}
					fontWeight={400}
					fontStyle='normal'
				/>
			</Head>
			<div style={{ color: '#333' }}>
				{/* Header */}
				<header
					style={{
						backgroundColor: '#0021b8',
						padding: '10px 0',
						textAlign: 'center',
						color: '#ffffff',
					}}>
					<Img
						src={logoUrl}
						className='mx-auto'
						alt='Metropolitana FM'
						style={{ width: '200px', padding: '10px', margin: '0 auto' }}
					/>
				</header>

				{/* Conteúdo do e-mail */}
				<div style={{ padding: '20px' }}>{children}</div>

				{/* Footer */}
				<footer
					style={{
						backgroundColor: '#f8f8f8',
						padding: '10px 0',
						textAlign: 'center',
						fontSize: '12px',
					}}>
					<Text style={{ fontSize: '12px' }}>
						Metropolitana FM © 1997 - 2024 | Av. Paulista, 2200 - 14º Andar -
						São Paulo - SP - CEP: 01310-300
					</Text>
				</footer>
			</div>
		</Html>
	)
}
