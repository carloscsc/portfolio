'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLineIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import { store } from '../actions/project.controller'

const cadastrarProjeto = () => {
	const handleSubmit = useCallback(async () => {
		const request = await store({
			title: 'Projeto de Teste',
			description: 'Descrição do projeto de teste',
			client_name: 'Cliente de Teste',
			client_description: 'Descrição do cliente de teste',
			client_location: 'Localização do cliente de teste',
			duration: '3 meses',
			year: 2023,
			cover: 'caminho/para/imagem.jpg',
			about_project: 'Detalhes sobre o projeto de teste',
			technologies: ['React', 'Node.js'],
			functionalities: ['Funcionalidade 1', 'Funcionalidade 2'],
			challenges: ['Desafio 1', 'Desafio 2'],
			results: ['Resultado 1', 'Resultado 2'],
			status: 'ativo',
		})

		if (request.project) {
			console.log(request.project)
			console.log(request.project.createdAt.toString())
			alert('Projeto cadastrado com sucesso!')
		}
	}, [])

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

				<Button onClick={handleSubmit}>Salvar Projeto de Teste</Button>
			</div>

			<footer className='mt-5 mb-4 text-center text-sm text-gray-500'>
				{new Date().getFullYear()}&copy; Carlos Sabo Cantanzaro - Todos os
				direitos reservados.
			</footer>
		</>
	)
}

export default cadastrarProjeto
