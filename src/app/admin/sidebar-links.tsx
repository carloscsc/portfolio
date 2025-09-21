'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuLink = ({
	href,
	children,
}: {
	href: string
	children: React.ReactNode
}) => {
	const pathname = usePathname()
	const isActive =
		pathname === href || (href !== '/admin' && pathname.startsWith(href))

	return (
		<li>
			<Link
				href={href}
				className={`p-2 mb-2 w-full block rounded hover:bg-black ${
					isActive ? 'bg-black' : ''
				}`}>
				{children}
			</Link>
		</li>
	)
}

const sidebarLinks = () => {
	return (
		<nav className='w-[200px]'>
			<ul className='bg-[#2b2b2b] rounded-md overflow-hidden p-2'>
				<MenuLink href='/admin'>Dashboard</MenuLink>
				<MenuLink href='/admin/projects'>Projetos</MenuLink>
			</ul>
		</nav>
	)
}

export default sidebarLinks
