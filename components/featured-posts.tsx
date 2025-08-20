'use client'

import { posts } from '@/lib/blog-data'
import { useResponsive } from '@/hooks/use-responsive'
import { BlogCard } from '@/components/blog-card'

export function FeaturedPosts({ count = 3 }: { count?: number }) {
	const { isMobile } = useResponsive()
	const featured = posts.slice(0, count)

	return (
		<section
			aria-labelledby='featured-posts-title'
			className='mt-12'>
			<div className='text-center mb-6 px-4 sm:px-0'>
				<h2
					id='featured-posts-title'
					className='text-responsive-xl font-bold mb-2'>
					Posts em destaquei
				</h2>
				<p className='text-gray-400 max-w-2xl mx-auto text-responsive-base leading-relaxed'>
					Destaques do blog com artigos selecionados para compartilhar
					conhecimentos e práticas.
				</p>
			</div>

			<div className='grid-responsive-projects gap-4 sm:gap-6 px-4 sm:px-0'>
				{featured.map((p, index) => (
					<div
						key={p.slug}
						className={`group transition-transform will-change-transform hover:-translate-y-1 hover:shadow-lg`}
						style={{
							animationDelay: isMobile ? `${index * 100}ms` : '0ms',
						}}>
						<BlogCard post={p} />
					</div>
				))}
			</div>
		</section>
	)
}
