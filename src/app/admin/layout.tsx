import type React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin - Portfolio',
	description: 'Admin panel for portfolio',
}

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
