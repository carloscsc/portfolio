'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { CardWrapper } from './ui/card-wrapper'
import { Button } from './ui/button'
import { ExternalLink, Github, Info, ImageIcon } from 'lucide-react'
import { projects } from '@/lib/projects-data'
import { useResponsive } from '@/hooks/use-responsive'

interface ProjectProps {
	title: string
	description: string
	image: string
	demoLink: string
	githubLink: string
	slug: string
}

function ProjectCard({
	title,
	description,
	image,
	demoLink,
	githubLink,
	slug,
}: ProjectProps) {
	const [imageLoading, setImageLoading] = useState(true)
	const [imageError, setImageError] = useState(false)
	const { isMobile } = useResponsive()

	const handleImageLoad = () => {
		setImageLoading(false)
	}

	const handleImageError = () => {
		setImageLoading(false)
		setImageError(true)
	}

	return (
		<CardWrapper className='overflow-hidden group h-full flex flex-col hover:border-primary/40 transition-all duration-300'>
			{/* Enhanced image container with loading states and link to details */}
			<Link
				href={`/projects/${slug}`}
				aria-label={`Ver detalhes de ${title}`}
				className='block group/image'>
				<div className='relative h-48 sm:h-52 mb-4 bg-muted/20 rounded-lg overflow-hidden'>
					{imageLoading && (
						<div className='absolute inset-0 flex items-center justify-center bg-muted/10 animate-pulse'>
							<ImageIcon className='h-8 w-8 text-muted-foreground/50' />
						</div>
					)}

					{imageError ? (
						<div className='absolute inset-0 flex items-center justify-center bg-muted/10'>
							<div className='text-center'>
								<ImageIcon className='h-8 w-8 text-muted-foreground/50 mx-auto mb-2' />
								<p className='text-xs text-muted-foreground'>
									Imagem indisponível
								</p>
							</div>
						</div>
					) : (
						<Image
							src={image || '/placeholder.svg'}
							alt={title}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
							className={`object-cover transition-all duration-300 ${
								imageLoading ? 'opacity-0' : 'opacity-100'
							} ${isMobile ? 'hover:scale-105' : 'group-hover:scale-110'}`}
							onLoad={handleImageLoad}
							onError={handleImageError}
							priority={false}
							loading='lazy'
						/>
					)}
				</div>
			</Link>

			{/* Content container with flex-grow for equal height cards */}
			<div className='flex-grow flex flex-col'>
				<h3 className='text-lg font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2'>
					<Link
						href={`/projects/${slug}`}
						aria-label={`Ver detalhes de ${title}`}
						className='hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'>
						{title}
					</Link>
				</h3>
				<p className='text-gray-400 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed'>
					{description}
				</p>

				{/* Enhanced button layout for mobile */}
				<div className='flex gap-2 flex-wrap mt-auto'>
					<Button
						variant='outline'
						size={isMobile ? 'sm' : 'sm'}
						asChild
						className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent touch-target-small flex-1 sm:flex-none min-w-[80px]'>
						<a
							href={demoLink}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2'>
							<ExternalLink size={14} />
							<span className='hidden xs:inline'>Demo</span>
						</a>
					</Button>

					<Button
						variant='outline'
						size={isMobile ? 'sm' : 'sm'}
						asChild
						className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent touch-target-small flex-1 sm:flex-none min-w-[80px]'>
						<a
							href={githubLink}
							target='_blank'
							rel='noopener noreferrer'
							className='flex items-center justify-center gap-2'>
							<Github size={14} />
							<span className='hidden xs:inline'>Code</span>
						</a>
					</Button>

					<Button
						variant='outline'
						size={isMobile ? 'sm' : 'sm'}
						asChild
						className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent touch-target-small w-full sm:w-auto sm:flex-none min-w-[100px]'>
						<Link
							href={`/projects/${slug}`}
							className='flex items-center justify-center gap-2'>
							<Info size={14} />
							<span>Saber mais</span>
						</Link>
					</Button>
				</div>
			</div>
		</CardWrapper>
	)
}

export function Projects() {
	const { isMobile, isTablet } = useResponsive()

	return (
		<section
			className='py-16 scroll-mt-24'
			id='works'>
			<div className='text-center mb-12'>
				<h2 className='text-responsive-xl font-bold mb-4'>
					Projetos em Destaque
				</h2>
				<p className='text-gray-400 max-w-2xl mx-auto text-responsive-base leading-relaxed px-4'>
					Explore meus projetos de desenvolvimento web mais recentes. Cada
					projeto demonstra meu comprometimento em criar soluções digitais
					inovadoras e centradas no usuário.
				</p>
			</div>

			{/* Enhanced responsive grid with better spacing */}
			<div className='grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0'>
				{projects.map((project, index) => (
					<div
						key={project.slug}
						className={`${
							isMobile && index >= 3 ? 'opacity-0 animate-fade-in' : ''
						}`}
						style={{
							animationDelay: isMobile ? `${index * 100}ms` : '0ms',
						}}>
						<ProjectCard {...project} />
					</div>
				))}
			</div>

			{/* Mobile load more hint if many projects */}
			{projects.length > 6 && isMobile && (
				<div className='text-center mt-8'>
					<p className='text-xs text-muted-foreground'>
						Deslize para ver mais projetos
					</p>
				</div>
			)}
		</section>
	)
}
