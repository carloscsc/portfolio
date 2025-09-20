'use client'

import type React from 'react'
import { useMemo, useState, useEffect } from 'react'
import { posts as allPosts } from '@/lib/blog-data'
import { Input } from '@/components/ui/input'
import { BlogCard } from '@/components/blog-card'
import { CategoryCombobox } from '@/components/category-combobox'
import { BlogPagination } from '@/components/blog-pagination'
import { Navbar } from '@/components/navbar'
import { cn } from '@/lib/utils'

// Configuração da paginação
const POSTS_PER_PAGE = 6

export default function BlogPage() {
	const [query, setQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [currentPage, setCurrentPage] = useState(1)

	// Extrair todas as categorias únicas
	const allCategories = useMemo(() => {
		return Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort()
	}, [])

	// Filtrar posts
	const filteredPosts = useMemo(() => {
		return allPosts.filter((p) => {
			const matchesQuery =
				!query ||
				p.title.toLowerCase().includes(query.toLowerCase()) ||
				p.excerpt.toLowerCase().includes(query.toLowerCase())
			const matchesCategory =
				!selectedCategory || p.tags.includes(selectedCategory)
			return matchesQuery && matchesCategory
		})
	}, [query, selectedCategory])

	// Calcular paginação
	const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
	const startIndex = (currentPage - 1) * POSTS_PER_PAGE
	const endIndex = startIndex + POSTS_PER_PAGE
	const currentPosts = filteredPosts.slice(startIndex, endIndex)

	// Resetar página quando filtros mudam
	useEffect(() => {
		setCurrentPage(1)
	}, [query, selectedCategory])

	return (
		<main className='min-h-screen bg-black text-white'>
			<Navbar />

			{/* Hero do Blog */}
			<section className='container mx-auto px-4 pt-28 pb-8'>
				<h1 className='text-4xl md:text-5xl font-bold'>Blog</h1>
				<p className='text-muted-foreground mt-3 max-w-2xl'>
					Artigos sobre desenvolvimento web, performance, acessibilidade e
					design de interfaces.
				</p>

				{/* Filtros */}
				<div className='mt-8 space-y-4'>
					{/* Layout responsivo: mobile empilhado, desktop lado a lado */}
					<div className='flex flex-col md:flex-row gap-4'>
						{/* Combobox de Categorias - Mobile: full width, Desktop: lado esquerdo */}
						<div className='w-full md:w-64'>
							<CategoryCombobox
								categories={allCategories}
								selectedCategory={selectedCategory}
								onCategoryChange={setSelectedCategory}
								placeholder='Filtrar por categoria...'
							/>
						</div>

						{/* Busca - Mobile: full width, Desktop: ocupa espaço restante */}
						<div className='flex-1'>
							<Input
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								placeholder='Buscar por título ou resumo...'
								className='bg-card border-primary/20 text-white placeholder:text-muted-foreground'
							/>
						</div>
					</div>
				</div>

				{/* Estatísticas dos filtros */}
				{filteredPosts.length > 0 && (
					<div className='mt-4 text-sm text-muted-foreground'>
						{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}{' '}
						encontrado{filteredPosts.length !== 1 ? 's' : ''}
						{totalPages > 1 && ` • Página ${currentPage} de ${totalPages}`}
					</div>
				)}
			</section>

			{/* Lista de posts */}
			<section className='container mx-auto px-4 pb-8'>
				{currentPosts.length === 0 ? (
					<div className='text-center py-12'>
						<p className='text-muted-foreground text-lg'>
							{filteredPosts.length === 0
								? 'Nenhum post encontrado com os filtros aplicados.'
								: 'Nenhum post nesta página.'}
						</p>
						{(query || selectedCategory) && (
							<button
								onClick={() => {
									setQuery('')
									setSelectedCategory(null)
								}}
								className='mt-4 text-[#8B5CF6] hover:underline'>
								Limpar filtros
							</button>
						)}
					</div>
				) : (
					<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
						{currentPosts.map((post) => (
							<BlogCard
								key={post.slug}
								post={post}
							/>
						))}
					</div>
				)}
			</section>

			{/* Paginação */}
			{totalPages > 1 && (
				<section className='container mx-auto px-4 pb-20'>
					<BlogPagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={setCurrentPage}
					/>
				</section>
			)}
		</main>
	)
}
