import { Button } from '@/components/ui/button'
import { Stats } from '@/components/stats'
import { Services } from '@/components/services'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
// import { Testimonials } from '@/components/testimonials'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { ResumeDownload } from '@/components/resume-download'
import { Phone, Mail, MapPin } from 'lucide-react'
import { FeaturedPosts } from '@/components/featured-posts'
import ProfilePicture from '@public/perfil.jpg'

export default function Home() {
	return (
		<main className='min-h-screen text-white'>
			<Navbar />

			{/* Hero */}
			<section
				id='home'
				className='responsive-container spacing-responsive-lg'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch'>
					<div className='lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]  lg:order-1'>
						<Image
							src={ProfilePicture.src}
							alt='Profile'
							fill
							className='object-cover'
							priority
							sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw'
						/>
					</div>

					<div className='lg:col-span-7 flex flex-col justify-center order-1 lg:order-2'>
						<h1 className='text-responsive-xl font-bold mb-4 mobile-text'>
							Olá, eu sou Carlos
							<span className='block text-primary mt-2 text-lg'>
								Desenvolvedor Full Stack
							</span>
						</h1>
						<p className='text-responsive-md text-gray-400 mb-8 max-w-2xl'>
							Eu ajudo empresas a resolver problemas, criando produtos e
							experiências digitais acessíveis e inclusivas.
						</p>
						<div className='flex flex-col md:flex-row gap-4 mb-8 relative'>
							<Button
								size='lg'
								className='bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black transition-all duration-300 touch-target'
								asChild>
								<a href='#contact'>Entre em contato</a>
							</Button>
							<ResumeDownload />
						</div>
						<Stats className='border-t border-white/10 pt-8' />
					</div>
				</div>
			</section>

			{/* Conteúdo */}
			<div className='container mx-auto px-4'>
				<Services />
				<Projects />
				<Skills />
				<FeaturedPosts />
				<section
					className='py-16 scroll-mt-24'
					id='contact'>
					<div className='text-center mb-12'>
						<h2 className='text-responsive-xl font-bold mb-4'>
							Vamos Conversar
						</h2>
						<p className='text-gray-400 max-w-2xl mx-auto text-responsive-base leading-relaxed px-4'>
							Tem um projeto em mente ou quer discutir oportunidades? Estou a
							apenas uma mensagem de distância.
						</p>
					</div>

					{/* Enhanced responsive layout */}
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-0'>
						{/* Contact Information - Enhanced for mobile */}
						<div className='space-y-6'>
							<div className='flex items-start gap-4 p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 touch-target'>
									<Phone
										className='text-primary'
										size={20}
									/>
								</div>
								<div className='min-w-0 flex-1'>
									<h3 className='font-semibold text-sm sm:text-base mb-1'>
										Telefone
									</h3>
									<a
										href='tel:+5511999999999'
										className='text-gray-400 hover:text-primary transition-colors text-sm sm:text-base break-all'>
										+55 (11) 99999-9999
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4 p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 touch-target'>
									<Mail
										className='text-primary'
										size={20}
									/>
								</div>
								<div className='min-w-0 flex-1'>
									<h3 className='font-semibold text-sm sm:text-base mb-1'>
										Email
									</h3>
									<a
										href='mailto:contato@carlos.dev'
										className='text-gray-400 hover:text-primary transition-colors text-sm sm:text-base break-all'>
										contato@carlos.dev
									</a>
								</div>
							</div>

							<div className='flex items-start gap-4 p-4 rounded-lg bg-card/30 border border-border/50 hover:bg-card/50 transition-colors'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 touch-target'>
									<MapPin
										className='text-primary'
										size={20}
									/>
								</div>
								<div className='min-w-0 flex-1'>
									<h3 className='font-semibold text-sm sm:text-base mb-1'>
										Localização
									</h3>
									<p className='text-gray-400 text-sm sm:text-base'>
										São Paulo, Brasil
									</p>
								</div>
							</div>

							{/* Mobile-optimized availability notice */}
							<div className='mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg'>
								<p className='text-xs sm:text-sm text-primary/80 text-center'>
									🟢 Disponível para novos projetos
								</p>
							</div>
						</div>

						{/* Enhanced Contact Form */}
						<form className='space-y-6'>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
								<input
									type='text'
									placeholder='Nome'
									className='mobile-input bg-card border border-primary/20 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
								/>
								<input
									type='text'
									placeholder='Sobrenome'
									className='mobile-input bg-card border border-primary/20 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
								/>
							</div>
							<input
								type='email'
								placeholder='Seu melhor email'
								className='mobile-input bg-card border border-primary/20 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
							/>
							<input
								type='text'
								placeholder='Assunto (opcional)'
								className='mobile-input bg-card border border-primary/20 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'
							/>
							<textarea
								placeholder='Como posso ajudar você? Conte-me sobre seu projeto...'
								rows={6}
								className='mobile-input bg-card border border-primary/20 rounded-lg p-3 sm:p-4 w-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none'
							/>
							<Button
								size='lg'
								className='w-full touch-target bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background transition-all duration-300'>
								<Mail
									className='mr-2'
									size={16}
								/>
								Enviar Mensagem
							</Button>

							{/* Mobile form notice */}
							<p className='text-xs text-muted-foreground text-center mt-4'>
								Respondo em até 24 horas úteis
							</p>
						</form>
					</div>
				</section>
			</div>

			<footer className='bg-card mt-20'>
				<div className='container mx-auto px-4 py-12'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div>
							<h3 className='text-xl font-bold mb-4'>Lukman</h3>
							<p className='text-gray-400'>
								Full Stack Developer based in your location. Available for
								freelance work.
							</p>
						</div>
						<div>
							<h4 className='font-semibold mb-4'>Company</h4>
							<ul className='space-y-2 text-gray-400'>
								<li>About</li>
								<li>Blog</li>
								<li>Contact</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold mb-4'>Services</h4>
							<ul className='space-y-2 text-gray-400'>
								<li>Web Development</li>
								<li>UI/UX Design</li>
								<li>Mobile Development</li>
							</ul>
						</div>
						<div>
							<h4 className='font-semibold mb-4'>Contact Us</h4>
							<ul className='space-y-2 text-gray-400'>
								<li>hello@example.com</li>
								<li>+1234567890</li>
								<li>Your Address Here</li>
							</ul>
						</div>
					</div>
					<div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400'>
						<p>© 2024 Lukman. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</main>
	)
}
