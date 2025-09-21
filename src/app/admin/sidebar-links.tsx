'use client'

import { cn } from '@/lib/utils'
import { BriefcaseIcon, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { text } from 'stream/consumers'

const MenuLink = ({
	href,
	icon,
	text,
}: {
	href: string
	icon: ReactNode
	text: string
}) => {
	const pathname = usePathname()
	const isActive =
		pathname === href || (href !== '/admin' && pathname.startsWith(href))

	return (
		<li>
			<Link
				href={href}
				className={cn(
					'p-2 mb-2 w-full rounded hover:bg-black flex justify-start items-center gap-2',
					'[&>svg]:w-4 [&>svg]:h-4',
					isActive ? 'bg-black' : ''
				)}>
				{icon} {text}
			</Link>
		</li>
	)
}

const sidebarLinks = () => {
	return (
		<nav className='w-[200px]'>
			<ul className='bg-[#2b2b2b] rounded-md overflow-hidden p-2'>
				<MenuLink
					href='/admin'
					icon={<LayoutDashboard />}
					text='Dashboard'
				/>
				<MenuLink
					href='/admin/projects'
					icon={<BriefcaseIcon />}
					text='Projetos'
				/>
			</ul>
		</nav>
	)
}

export default sidebarLinks
