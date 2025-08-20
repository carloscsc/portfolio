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
    const amount = isMobile ? el.scrollWidth / services.length : el.clientWidth * 0.8
    
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
  {/* Mobile scroll hint */}
  {isTouchDevice && (
    <div className='absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-muted-foreground border md:hidden'>
      Deslize →
    </div>
  )}

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
    {/* Desktop navigation buttons */}
    <div className='hidden sm:flex items-center justify-center gap-3'>
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

    {/* Mobile dot indicators */}
    <div className='flex items-center justify-center gap-2 sm:hidden' role='tablist' aria-label='Services navigation'>
      {services.map((_, i) => {
        const isActive = Math.abs(i - currentIndex) <= 1
        return (
          <button
            key={i}
            type='button'
            className={`w-2 h-2 rounded-full transition-all duration-300 touch-target-small ${
              isActive 
                ? 'bg-primary w-6' 
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Ver serviço ${i + 1}: ${services[i].title}`}
            role='tab'
            aria-selected={isActive}
            onClick={() => {
              const el = trackRef.current
              if (!el) return
              const cardWidth = el.scrollWidth / services.length
              el.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
            }}
          />
        )
      })}
    </div>

    {/* Mobile navigation text */}
    {isTouchDevice && (
      <p className='text-xs text-muted-foreground text-center sm:hidden'>
        {currentIndex + 1} de {services.length} serviços
      </p>
    )}
  </div>
</div>
		</section>
	)
}
