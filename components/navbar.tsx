'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

export function Navbar() {
	const pathname = usePathname()
	const isHome = pathname === '/'

	const [isOpen, setIsOpen] = useState(false)
	const [active, setActive] = useState<string>('')
	const [lang, setLang] = useState<'pt-BR' | 'en' | 'nl'>('pt-BR')
	const languages = useMemo(
		() => [
			{
				code: 'pt-BR' as const,
				label: 'Português (Brasil)',
				src: '/images/flags/br.png',
			},
			{ code: 'en' as const, label: 'English', src: '/images/flags/us.png' },
			{ code: 'nl' as const, label: 'Dutch', src: '/images/flags/nl.png' },
		],
		[]
	)

	const sectionIds = useMemo(
		() => ['home', 'services', 'works', 'skills', 'blog', 'contact'],
		[]
	)
	const ticking = useRef(false)

	const computeActive = useCallback(() => {
		// Só detecta seções ativas se estivermos na home
		if (!isHome) {
			setActive('')
			return
		}

		const viewportH = window.innerHeight
		const viewportCenter = viewportH / 2
		let bestId: string | null = null
		let bestDist = Number.POSITIVE_INFINITY

		for (const id of sectionIds) {
			const el = document.getElementById(id)
			if (!el) continue
			const rect = el.getBoundingClientRect()
			const isVisible = rect.bottom > 80 && rect.top < viewportH - 80
			if (!isVisible) continue
			const sectionCenter = rect.top + rect.height / 2
			const dist = Math.abs(sectionCenter - viewportCenter)
			if (dist < bestDist) {
				bestDist = dist
				bestId = id
			}
		}

		if (window.scrollY < 8) {
			setActive('')
			return
		}
		if (bestId) setActive(bestId === 'home' ? '' : bestId)
	}, [sectionIds, isHome])

	useEffect(() => {
		const onScroll = () => {
			if (ticking.current) return
			ticking.current = true
			requestAnimationFrame(() => {
				computeActive()
				ticking.current = false
			})
		}
		const onResize = () => computeActive()
		window.addEventListener('scroll', onScroll, { passive: true })
		window.addEventListener('resize', onResize)
		computeActive()
		return () => {
			window.removeEventListener('scroll', onScroll)
			window.removeEventListener('resize', onResize)
		}
	}, [computeActive])

	const getNavLinkHref = (sectionId: string) => {
		if (isHome) {
			return `#${sectionId}`
		} else {
			return `/#${sectionId}`
		}
	}

	const getBlogHref = () => {
		return '/blog'
	}

	const navLinkClasses = (id: string) =>
		[
			'relative transition-colors duration-200',
			isHome && active === id ? 'text-primary' : 'text-white',
			'after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all after:duration-300',
			isHome && active === id ? 'after:w-full' : 'after:w-0 hover:after:w-full',
		].join(' ')

	return (
		<nav className='fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60'>
			<div className='container mx-auto px-4'>
				<div className='flex items-center justify-between h-16'>
					<Link
						href='/'
						className='flex-shrink-0 text-2xl font-bold '
						aria-label='Inicio'>
						&lt;CarlosSC /&gt;
					</Link>

					{/* Desktop Navigation */}
					<div className='hidden lg:flex items-center space-x-8'>
						<Link
							href={getNavLinkHref('services')}
							className={navLinkClasses('services')}
							aria-current={
								isHome && active === 'services' ? 'location' : undefined
							}>
							Serviços
						</Link>
						<Link
							href={getNavLinkHref('works')}
							className={navLinkClasses('works')}
							aria-current={
								isHome && active === 'works' ? 'location' : undefined
							}>
							Projetos
						</Link>
						<Link
							href={getNavLinkHref('skills')}
							className={navLinkClasses('skills')}
							aria-current={
								isHome && active === 'skills' ? 'location' : undefined
							}>
							Habilidades
						</Link>

						<Link
							href={getBlogHref()}
							className={navLinkClasses('blog')}
							aria-current={
								isHome && active === 'blog' ? 'location' : undefined
							}>
							Blog
						</Link>

						<div
							className='flex items-center gap-2 mr-2'
							aria-label='Language selector'>
							{languages.map((l) => (
								<button
									key={l.code}
									type='button'
									onClick={() => setLang(l.code)}
									className={[
										'inline-flex h-7 w-7 items-center justify-center rounded-full p-0.5 transition ring-offset-1 ring-offset-black',
										lang === l.code
											? 'ring-2 ring-primary'
											: 'ring-0 hover:ring-2 hover:ring-white/30',
									].join(' ')}
									aria-pressed={lang === l.code}
									aria-label={l.label}
									title={l.label}>
									<Image
										src={l.src || '/placeholder.svg'}
										alt={l.label}
										width={20}
										height={20}
										className='h-5 w-5 rounded-full'
									/>
								</button>
							))}
						</div>
						<Button asChild>
							<a href={getNavLinkHref('contact')}>Contato</a>
						</Button>
					</div>

					{/* Mobile Navigation */}
					<div className='lg:hidden'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='text-white p-2'
							aria-label='Toggle menu'>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className='lg:hidden'>
						<div className='flex flex-col space-y-4 px-2 pt-2 pb-4'>
							<div className='flex items-center gap-3 px-2 pb-2'>
								{languages.map((l) => (
									<button
										key={l.code}
										type='button'
										onClick={() => {
											setLang(l.code)
											setIsOpen(false)
										}}
										className={[
											'inline-flex h-7 w-7 items-center justify-center rounded-full p-0.5 transition ring-offset-1 ring-offset-black',
											lang === l.code
												? 'ring-2 ring-primary'
												: 'ring-0 hover:ring-2 hover:ring-white/30',
										].join(' ')}
										aria-pressed={lang === l.code}
										aria-label={l.label}
										title={l.label}>
										<Image
											src={l.src || '/placeholder.svg'}
											alt={l.label}
											width={20}
											height={20}
											className='h-5 w-5 rounded-full'
										/>
									</button>
								))}
							</div>
							<Link
								href={getNavLinkHref('services')}
								className={navLinkClasses('services')}
								aria-current={
									isHome && active === 'services' ? 'location' : undefined
								}
								onClick={() => setIsOpen(false)}>
								Serviços
							</Link>
							<Link
								href={getNavLinkHref('works')}
								className={navLinkClasses('works')}
								aria-current={
									isHome && active === 'works' ? 'location' : undefined
								}
								onClick={() => setIsOpen(false)}>
								Projetos
							</Link>
							<Link
								href={getNavLinkHref('skills')}
								className={navLinkClasses('skills')}
								aria-current={
									isHome && active === 'skills' ? 'location' : undefined
								}
								onClick={() => setIsOpen(false)}>
								Habilidades
							</Link>

							<Link
								href={getBlogHref()}
								className={navLinkClasses('blog')}
								onClick={() => setIsOpen(false)}>
								Blog
							</Link>
							<Button
								className='w-full touch-target'
								asChild
								onClick={() => setIsOpen(false)}>
								<a href={getNavLinkHref('contact')}>Contato</a>
							</Button>
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}
