'use client'
import type React from 'react'
import { useRef } from 'react'
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

	function scrollPage(direction: 1 | -1) {
		const el = trackRef.current
		if (!el) return
		const amount = el.clientWidth
		el.scrollBy({ left: direction * amount, behavior: 'smooth' })
	}

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
				<div
					ref={trackRef}
					className='w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-1 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
					aria-label='Services carousel'>
					{services.map((s, i) => (
						<div
							key={i}
							className='snap-start flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%]'>
							<ServiceCard {...s} />
						</div>
					))}
				</div>

				<div className='mt-4 flex items-center justify-center gap-3'>
					<Button
						type='button'
						size='icon'
						aria-label='Scroll previous'
						onClick={() => scrollPage(-1)}>
						<ChevronLeft className='h-5 w-5' />
					</Button>
					<Button
						type='button'
						size='icon'
						aria-label='Scroll next'
						onClick={() => scrollPage(1)}>
						<ChevronRight className='h-5 w-5' />
					</Button>
				</div>
			</div>
		</section>
	)
}
