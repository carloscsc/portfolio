import { Button } from '@/components/ui/button'
import { ArrowLeftFromLineIcon, LogOut } from 'lucide-react'
import Link from 'next/link'

const cadastrarProjeto = () => {
	return (
		<>
			<div className='flex flex-row justify-between items-center mx-auto w-full max-w-4xl'>
				<h1 className='text-center text-4xl p-4 ps-0'>&lt;Admin /&gt;</h1>
				<LogOut className='cursor-pointer' />
			</div>

			<div className='mx-auto w-full max-w-4xl border border-white/10 p-5'>
				<div className='w-full flex flex-row justify-between items-center border-b pb-2'>
					<h2 className='text-center text-lg'>Adicionar Projeto</h2>

					<Button
						size='icon'
						asChild>
						<Link href='/admin'>
							<ArrowLeftFromLineIcon className='w-4 h-4' />
						</Link>
					</Button>
				</div>
			</div>

			<footer className='mt-5 mb-4 text-center text-sm text-gray-500'>
				{new Date().getFullYear()}&copy; Carlos Sabo Cantanzaro - Todos os
				direitos reservados.
			</footer>
		</>
	)
}

export default cadastrarProjeto
