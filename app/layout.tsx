import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
	title: 'Portfolio',
	description: 'Personal portfolio',
	generator: 'v0.dev',
}

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-sans',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang='pt-BR'
			className={`${inter.variable} dark antialiased`}>
			<body className='bg-gradient-to-r from-[#0b0b0b] to-[#1d1f20]'>
				{children}
			</body>
		</html>
	)
}
