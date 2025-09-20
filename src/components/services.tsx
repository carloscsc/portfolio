'use client'
import type React from 'react'
import { useRef, useState, useEffect } from 'react'
import {
	Code,
	Palette,
	Globe,
	Smartphone,
	Layers,
	Shield,
	Rocket,
	Wrench,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react'
import { CardWrapper } from './ui/card-wrapper'
import { Button } from '@/components/ui/button'
import { useTouchDevice } from '@/hooks/use-responsive'

interface ServiceProps {
	title: string
	description: string
	icon: React.ReactNode
}

function ServiceCard({ title, description, icon }: ServiceProps) {
	return (
		<CardWrapper className='h-full hover:border-primary/40 transition-colors'>
			<div className='text-primary mb-4'>{icon}</div>
			<h3 className='text-lg font-semibold mb-2'>{title}</h3>
			<p className='text-gray-400'>{description}</p>
		</CardWrapper>
	)
}

export function Services() {
	const trackRef = useRef<HTMLDivElement>(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(true)
	const isTouchDevice = useTouchDevice()

	const services = [
		{
			icon: <Code size={24} />,
			title: 'Website Design',
			description:
				'Crio interfaces modernas, acessíveis e responsivas sob medida.',
		},
		{
			icon: <Palette size={24} />,
			title: 'UI/UX Design',
			description: 'Experiências intuitivas focadas no usuário e no negócio.',
		},
		{
			icon: <Globe size={24} />,
			title: 'Web Development',
			description:
				'Aplicações rápidas, seguras e escaláveis com tecnologias atuais.',
		},
		{
			icon: <Smartphone size={24} />,
			title: 'Mobile Friendly',
			description:
				'Layout mobile-first e performance otimizada em dispositivos.',
		},
		{
			icon: <Layers size={24} />,
			title: 'Design Systems',
			description: 'Componentes reutilizáveis e consistência visual em escala.',
		},
		{
			icon: <Shield size={24} />,
			title: 'Security & SEO',
			description: 'Boas práticas de segurança e SEO técnico desde o início.',
		},
		{
			icon: <Rocket size={24} />,
			title: 'Performance',
			description: 'Core Web Vitals, caching e otimizações avançadas.',
		},
		{
			icon: <Wrench size={24} />,
			title: 'Manutenção',
			description: 'Evolução contínua, monitoramento e suporte pós-lançamento.',
		},
	]

	// Update scroll indicators
	const updateScrollIndicators = () => {
		const el = trackRef.current
		if (!el) return

		const { scrollLeft, scrollWidth, clientWidth } = el
		setCanScrollLeft(scrollLeft > 0)
		setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)

		// Calculate current index for mobile indicators
		const cardWidth = el.scrollWidth / services.length
		const newIndex = Math.round(scrollLeft / cardWidth)
		setCurrentIndex(newIndex)
	}

	// Enhanced scroll function with better mobile support
	function scrollPage(direction: 1 | -1) {
		const el = trackRef.current
		if (!el) return

		// On mobile, scroll by single card width for better control
		const isMobile = window.innerWidth < 768
		const amount = isMobile
			? el.scrollWidth / services.length
			: el.clientWidth * 0.8

		el.scrollBy({ left: direction * amount, behavior: 'smooth' })
	}

	// Set up scroll event listener
	useEffect(() => {
		const el = trackRef.current
		if (!el) return

		updateScrollIndicators()
		el.addEventListener('scroll', updateScrollIndicators, { passive: true })

		return () => {
			el.removeEventListener('scroll', updateScrollIndicators)
		}
	}, [services.length])

	// Handle resize
	useEffect(() => {
		const handleResize = () => updateScrollIndicators()
		window.addEventListener('resize', handleResize, { passive: true })

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<section
			className='py-16 scroll-mt-24'
			id='services'>
			<div className='text-center mb-12'>
				<h2 className='text-3xl font-bold mb-4'>
					O que eu posso fazer pro sua empresa
				</h2>
				<p className='text-gray-400 max-w-2xl mx-auto'>
					Ofereço uma ampla gama de serviços para ajudar empresas e indivíduos a
					criar experiências digitais impactantes. Veja como posso ajudar você a
					ter sucesso.
				</p>
			</div>

			<div className='relative overflow-x-hidden'>
				{/* Enhanced carousel container with touch optimizations */}
				<div
					ref={trackRef}
					className='carousel-enhanced w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x overscroll-x-contain'
					aria-label='Services carousel'
					role='region'
					aria-live='polite'>
					{services.map((s, i) => (
						<div
							key={i}
							className='snap-start flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]'
							role='group'
							aria-label={`Service ${i + 1} of ${services.length}: ${s.title}`}>
							<ServiceCard {...s} />
						</div>
					))}
				</div>

				{/* Enhanced navigation controls */}
				<div className='mt-6 flex flex-col items-center gap-4'>
					{/* Unified navigation buttons */}
					<div className='flex items-center justify-center gap-3'>
						<Button
							type='button'
							size='icon'
							variant='outline'
							className='touch-target'
							disabled={!canScrollLeft}
							aria-label='Ver serviços anteriores'
							onClick={() => scrollPage(-1)}>
							<ChevronLeft className='h-5 w-5' />
						</Button>
						<Button
							type='button'
							size='icon'
							variant='outline'
							className='touch-target'
							disabled={!canScrollRight}
							aria-label='Ver próximos serviços'
							onClick={() => scrollPage(1)}>
							<ChevronRight className='h-5 w-5' />
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
