import { Button } from '@/components/ui/button'
import { Stats } from '@/components/stats'
import { Services } from '@/components/services'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
// import { Testimonials } from '@/components/testimonials'
import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Home() {
	return (
		<main className='min-h-screen text-white'>
			<Navbar />

			{/* Hero */}
			<section
				id='home'
				className='container mx-auto px-4 pt-32 pb-20'>
				<div className='grid grid-cols-1 gap-10 lg:[grid-template-columns:3fr_7fr] items-stretch'>
					<div className='relative rounded-2xl overflow-hidden min-h-[360px] lg:min-h-[520px]'>
						<Image
							src='https://media.licdn.com/dms/image/v2/C4E03AQHipCurSx0GVQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516935311991?e=1757548800&v=beta&t=cV-Vp-VRYpr9N_LQHR0FrRoZm32NBY-38VIfs9qPQZE'
							alt='Profile'
							fill
							className='object-cover'
							priority
						/>
					</div>

					<div className='flex flex-col justify-center'>
						<h1 className='text-4xl lg:text-6xl font-bold mb-4'>
							Olá, eu sou Carlos
							<span className='block text-primary mt-2 lg:text-4xl'>
								Desenvolvedor Full Stack | Tech Lead | Consultor
							</span>
						</h1>
						<p className='text-gray-400 mb-8'>
							Eu ajudo empresas a resolver problemas, criando produtos e
							experiências digitais acessíveis e inclusivas.
						</p>
						<div className='flex flex-wrap gap-4'>
							<Button
								size='lg'
								className='bg-primary hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black transition-all duration-300'
								asChild>
								<a href='#contact'>Entre em contato</a>
							</Button>
							<Button
								size='lg'
								variant='outline'
								className='border-primary text-primary hover:bg-primary hover:text-black bg-transparent'>
								Baixe meu currículo
							</Button>
						</div>
						<Stats className='mt-10 border-t border-white/10 pt-8' />
					</div>
				</div>
			</section>

			{/* Conteúdo */}
			<div className='container mx-auto px-4'>
				<Services />
				<Projects />
				<Skills />
				{/* <Testimonials /> */}

				{/* Contato */}
				<section
					className='py-16'
					id='contact'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold mb-4'>Let's Get In Touch</h2>
						<p className='text-gray-400 max-w-2xl mx-auto'>
							Have a project in mind or want to discuss potential opportunities?
							I'm just a message away.
						</p>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
						<div className='space-y-6'>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center'>
									<Phone
										className='text-primary'
										size={24}
									/>
								</div>
								<div>
									<h3 className='font-semibold'>Phone</h3>
									<p className='text-gray-400'>+91 7074399354</p>
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center'>
									<Mail
										className='text-primary'
										size={24}
									/>
								</div>
								<div>
									<h3 className='font-semibold'>Email</h3>
									<p className='text-gray-400'>dev.lukmansk@gmail.com</p>
								</div>
							</div>
							<div className='flex items-center gap-4'>
								<div className='w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center'>
									<MapPin
										className='text-primary'
										size={24}
									/>
								</div>
								<div>
									<h3 className='font-semibold'>Address</h3>
									<p className='text-gray-400'>
										Murshidabad, West Bengal, India
									</p>
								</div>
							</div>
						</div>
						<form className='space-y-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<input
									type='text'
									placeholder='First Name'
									className='bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary'
								/>
								<input
									type='text'
									placeholder='Last Name'
									className='bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary'
								/>
							</div>
							<input
								type='email'
								placeholder='Email'
								className='bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary'
							/>
							<textarea
								placeholder='Message'
								rows={6}
								className='bg-card border border-primary/20 rounded-lg p-3 w-full focus:outline-none focus:border-primary'
							/>
							<Button
								size='lg'
								className='w-full'>
								Send Message
							</Button>
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
