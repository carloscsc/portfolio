'use client'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useResponsive, useReducedMotion } from '@/hooks/use-responsive'

interface StatProps {
	value: string
	label: string
	index: number
	isVisible: boolean
}

function StatItem({ value, label, index, isVisible }: StatProps) {
	const [animatedValue, setAnimatedValue] = useState('0')
	const { isMobile } = useResponsive()
	const prefersReducedMotion = useReducedMotion()

	useEffect(() => {
		if (isVisible) {
			if (prefersReducedMotion) {
				setAnimatedValue(value)
			} else {
				const timer = setTimeout(() => {
					setAnimatedValue(value)
				}, index * 200)

				return () => clearTimeout(timer)
			}
		}
	}, [isVisible, value, index, prefersReducedMotion])

	return (
		<div
			className={`text-center p-4 rounded-lg bg-card/50 border border-border/50 transition-all duration-500 hover:bg-card/80 hover:border-primary/20 ${
				isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
			}`}
			style={{
				transitionDelay: prefersReducedMotion ? '0ms' : `${index * 150}ms`,
			}}>
			<div
				className={`font-bold text-primary mb-2 transition-all duration-700 ${
					isMobile ? 'text-2xl sm:text-3xl' : 'text-3xl lg:text-4xl'
				}`}>
				{animatedValue}
			</div>
			<div
				className={`text-muted-foreground leading-tight ${
					isMobile ? 'text-xs sm:text-sm' : 'text-sm'
				}`}>
				{label}
			</div>
		</div>
	)
}

export function Stats({ className = '' }: { className?: string }) {
	const [isVisible, setIsVisible] = useState(false)
	const sectionRef = useRef<HTMLDivElement>(null)
	const { isMobile } = useResponsive()

	const stats = [
		{ value: '3+', label: 'Anos de Experiência' },
		{ value: '50+', label: 'Projetos Concluídos' },
		{ value: '20+', label: 'Clientes Satisfeitos' },
		{ value: '100%', label: 'Comprometimento' },
	]

	// Intersection Observer for animation trigger
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{
				threshold: 0.3,
				rootMargin: '0px 0px -50px 0px',
			}
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current)
			}
		}
	}, [])

	return (
		<div
			ref={sectionRef}
			className={cn(
				`grid gap-4 sm:gap-2 px-4 sm:px-0 ${
					isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'
				}`,
				className
			)}>
			{stats.map((stat, index) => (
				<StatItem
					key={stat.label}
					value={stat.value}
					label={stat.label}
					index={index}
					isVisible={isVisible}
				/>
			))}
		</div>
	)
}
