import Image from 'next/image'
import Link from 'next/link'
import { CardWrapper } from './ui/card-wrapper'
import { Button } from './ui/button'
import { ExternalLink, Github, Info } from 'lucide-react'
import { projects } from '@/lib/projects-data'

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
	return (
		<CardWrapper className='overflow-hidden group'>
			<div className='relative h-48 mb-4'>
				<Image
					src={image || '/placeholder.svg'}
					alt={title}
					fill
					className='object-cover rounded-lg transition-transform duration-300 group-hover:scale-110'
				/>
			</div>
			<h3 className='text-lg font-semibold group-hover:text-primary transition-colors mb-2'>
				{title}
			</h3>
			<p className='text-gray-400 text-sm mb-4'>{description}</p>
			<div className='flex gap-2 flex-wrap'>
				<Button
					variant='outline'
					size='sm'
					asChild
					className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent'>
					<a
						href={demoLink}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2'>
						<ExternalLink size={16} /> Demo
					</a>
				</Button>
				<Button
					variant='outline'
					size='sm'
					asChild
					className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent'>
					<a
						href={githubLink}
						target='_blank'
						rel='noopener noreferrer'
						className='flex items-center gap-2'>
						<Github size={16} /> Code
					</a>
				</Button>
				<Button
					variant='outline'
					size='sm'
					asChild
					className='text-primary border-primary hover:bg-primary hover:text-white active:bg-primary/90 bg-transparent'>
					<Link
						href={`/projects/${slug}`}
						className='flex items-center gap-2'>
						<Info size={16} /> Saber mais
					</Link>
				</Button>
			</div>
		</CardWrapper>
	)
}

export function Projects() {
	return (
		<section
			className='py-16'
			id='works'>
			<div className='text-center mb-12'>
				<h2 className='text-3xl font-bold mb-4'>Featured Projects</h2>
				<p className='text-gray-400 max-w-2xl mx-auto'>
					Explore my latest web development projects. Each project demonstrates
					my commitment to creating innovative and user-friendly digital
					solutions.
				</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{projects.map((project) => (
					<ProjectCard
						key={project.slug}
						{...project}
					/>
				))}
			</div>
		</section>
	)
}
