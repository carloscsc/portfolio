'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLineIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'
import { store } from '../src/actions/project.controller'

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
			<div className='w-full flex flex-row justify-between items-center border-b pb-2'>
				<h2 className='text-center text-lg'>Adicionar Projeto</h2>

				<Button
					size='icon'
					asChild>
					<Link href='/admin/projects'>
						<ArrowLeftFromLineIcon className='w-4 h-4' />
					</Link>
				</Button>
			</div>

			<div className='mt-4'>
				<Button onClick={handleSubmit}>Salvar Projeto de Teste</Button>
			</div>
		</>
	)
}

export default cadastrarProjeto
