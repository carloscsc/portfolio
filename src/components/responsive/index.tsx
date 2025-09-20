'use client'
import { ReactNode, HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { useResponsive } from '@/hooks/use-responsive'

// Responsive Container Component
interface ResponsiveContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
	padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const ResponsiveContainer = forwardRef<
	HTMLDivElement,
	ResponsiveContainerProps
>(({ children, maxWidth = 'xl', padding = 'md', className, ...props }, ref) => {
	const maxWidthClasses = {
		sm: 'max-w-screen-sm',
		md: 'max-w-screen-md',
		lg: 'max-w-screen-lg',
		xl: 'max-w-screen-xl',
		'2xl': 'max-w-screen-2xl',
		full: 'max-w-full',
	}

	const paddingClasses = {
		none: '',
		sm: 'px-4',
		md: 'px-4 sm:px-6 lg:px-8',
		lg: 'px-6 sm:px-8 lg:px-12',
	}

	return (
		<div
			ref={ref}
			className={cn(
				'w-full mx-auto',
				maxWidthClasses[maxWidth],
				paddingClasses[padding],
				className
			)}
			{...props}>
			{children}
		</div>
	)
})
ResponsiveContainer.displayName = 'ResponsiveContainer'

// Responsive Grid Component
interface ResponsiveGridProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	cols?: {
		mobile?: number
		tablet?: number
		desktop?: number
	}
	gap?: 'sm' | 'md' | 'lg' | 'xl'
}

export const ResponsiveGrid = forwardRef<HTMLDivElement, ResponsiveGridProps>(
	(
		{
			children,
			cols = { mobile: 1, tablet: 2, desktop: 3 },
			gap = 'md',
			className,
			...props
		},
		ref
	) => {
		const gapClasses = {
			sm: 'gap-4',
			md: 'gap-6',
			lg: 'gap-8',
			xl: 'gap-12',
		}

		const gridCols = `grid-cols-${cols.mobile} ${
			cols.tablet ? `sm:grid-cols-${cols.tablet}` : ''
		} ${cols.desktop ? `lg:grid-cols-${cols.desktop}` : ''}`

		return (
			<div
				ref={ref}
				className={cn('grid', gridCols, gapClasses[gap], className)}
				{...props}>
				{children}
			</div>
		)
	}
)
ResponsiveGrid.displayName = 'ResponsiveGrid'

// Responsive Text Component
interface ResponsiveTextProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl'
	weight?: 'normal' | 'medium' | 'semibold' | 'bold'
}

export const ResponsiveText = forwardRef<HTMLElement, ResponsiveTextProps>(
	(
		{
			children,
			as: Component = 'p',
			size = 'base',
			weight = 'normal',
			className,
			...props
		},
		ref
	) => {
		const { isMobile } = useResponsive()

		const sizeClasses = {
			xs: isMobile ? 'text-xs' : 'text-xs sm:text-sm',
			sm: isMobile ? 'text-sm' : 'text-sm md:text-base',
			base: isMobile ? 'text-base' : 'text-base md:text-lg',
			lg: isMobile ? 'text-lg' : 'text-lg md:text-xl lg:text-2xl',
			xl: isMobile ? 'text-xl' : 'text-xl md:text-2xl lg:text-3xl',
			'2xl': isMobile ? 'text-2xl' : 'text-2xl md:text-3xl lg:text-4xl',
			'3xl': isMobile
				? 'text-3xl'
				: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
		}

		const weightClasses = {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
		}

		return (
			<Component
				ref={ref as any}
				className={cn(
					sizeClasses[size],
					weightClasses[weight],
					'mobile-text',
					className
				)}
				{...props}>
				{children}
			</Component>
		)
	}
)
ResponsiveText.displayName = 'ResponsiveText'

// Responsive Section Component
interface ResponsiveSectionProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode
	spacing?: 'sm' | 'md' | 'lg' | 'xl'
	background?: 'default' | 'muted' | 'card'
}

export const ResponsiveSection = forwardRef<
	HTMLElement,
	ResponsiveSectionProps
>(
	(
		{ children, spacing = 'md', background = 'default', className, ...props },
		ref
	) => {
		const spacingClasses = {
			sm: 'py-8 md:py-12',
			md: 'py-12 md:py-16',
			lg: 'py-16 md:py-20',
			xl: 'py-20 md:py-24',
		}

		const backgroundClasses = {
			default: '',
			muted: 'bg-muted/30',
			card: 'bg-card/50',
		}

		return (
			<section
				ref={ref}
				className={cn(
					spacingClasses[spacing],
					backgroundClasses[background],
					'scroll-mt-24',
					className
				)}
				{...props}>
				{children}
			</section>
		)
	}
)
ResponsiveSection.displayName = 'ResponsiveSection'

// Responsive Card Component
interface ResponsiveCardProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	padding?: 'sm' | 'md' | 'lg'
	hover?: boolean
}

export const ResponsiveCard = forwardRef<HTMLDivElement, ResponsiveCardProps>(
	({ children, padding = 'md', hover = true, className, ...props }, ref) => {
		const paddingClasses = {
			sm: 'p-4',
			md: 'p-4 sm:p-6',
			lg: 'p-6 sm:p-8',
		}

		return (
			<div
				ref={ref}
				className={cn(
					'bg-card border border-border rounded-lg',
					paddingClasses[padding],
					hover &&
						'hover:border-primary/20 hover:bg-card/80 transition-all duration-300',
					className
				)}
				{...props}>
				{children}
			</div>
		)
	}
)
ResponsiveCard.displayName = 'ResponsiveCard'

// Responsive Stack Component (for vertical layout)
interface ResponsiveStackProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	gap?: 'sm' | 'md' | 'lg' | 'xl'
	align?: 'start' | 'center' | 'end' | 'stretch'
}

export const ResponsiveStack = forwardRef<HTMLDivElement, ResponsiveStackProps>(
	({ children, gap = 'md', align = 'stretch', className, ...props }, ref) => {
		const gapClasses = {
			sm: 'space-y-2',
			md: 'space-y-4',
			lg: 'space-y-6',
			xl: 'space-y-8',
		}

		const alignClasses = {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			stretch: 'items-stretch',
		}

		return (
			<div
				ref={ref}
				className={cn(
					'flex flex-col',
					gapClasses[gap],
					alignClasses[align],
					className
				)}
				{...props}>
				{children}
			</div>
		)
	}
)
ResponsiveStack.displayName = 'ResponsiveStack'

// Responsive Flex Component (for horizontal layout)
interface ResponsiveFlexProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode
	gap?: 'sm' | 'md' | 'lg' | 'xl'
	align?: 'start' | 'center' | 'end' | 'stretch'
	justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
	wrap?: boolean
	direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
}

export const ResponsiveFlex = forwardRef<HTMLDivElement, ResponsiveFlexProps>(
	(
		{
			children,
			gap = 'md',
			align = 'center',
			justify = 'start',
			wrap = false,
			direction = 'row',
			className,
			...props
		},
		ref
	) => {
		const gapClasses = {
			sm: 'gap-2',
			md: 'gap-4',
			lg: 'gap-6',
			xl: 'gap-8',
		}

		const alignClasses = {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
			stretch: 'items-stretch',
		}

		const justifyClasses = {
			start: 'justify-start',
			center: 'justify-center',
			end: 'justify-end',
			between: 'justify-between',
			around: 'justify-around',
			evenly: 'justify-evenly',
		}

		const directionClasses = {
			row: 'flex-row',
			'row-reverse': 'flex-row-reverse',
			col: 'flex-col',
			'col-reverse': 'flex-col-reverse',
		}

		return (
			<div
				ref={ref}
				className={cn(
					'flex',
					directionClasses[direction],
					gapClasses[gap],
					alignClasses[align],
					justifyClasses[justify],
					wrap && 'flex-wrap',
					className
				)}
				{...props}>
				{children}
			</div>
		)
	}
)
ResponsiveFlex.displayName = 'ResponsiveFlex'
