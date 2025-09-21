'use client'
import { Button } from '@/components/ui/button'
import { ArrowLeftFromLineIcon } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StoreProjectSchema, StoreProjectTypes } from '../../src/types'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { store } from '../../src/actions/project.actions'
import { Input } from '@/components/ui/input'

const cadastrarProjeto = () => {
	const form = useForm<StoreProjectTypes>({
		resolver: zodResolver(StoreProjectSchema),
		defaultValues: {
			title: '',
			description: 'Descrição de teste',
			client_name: 'Jairo',
			client_description: 'Maior empresa do mundo',
			client_location: 'São Paulo',
			duration: '3 meses',
			year: new Date().getFullYear(),
			demo_link: 'https://google.com',
			repo_link: 'https://github.com',
			cover: 'https://picsum.photos/200/300',
			about_project: 'Projeto de teste, foi muito legal fazer ele',
			technologies: ['react', 'nodejs'],
			functionalities: ['Funcionalidade 1', 'Funcionalidade 2'],
			gallery: [],
			challenges: ['Desafio 1', 'Desafio 2'],
			results: ['Resultado 1', 'Resultado 2'],
			status: 'ativo',
		},
	})

	const handleSubmit = useCallback(async (data: StoreProjectTypes) => {
		console.log('Submitting data:', data)

		// const request = await store(data)
		// if (request.isSuccess && request.project) {
		// 	alert('Projeto cadastrado com sucesso!')
		// }
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

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='space-y-4 mt-4'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Título do Projeto</FormLabel>
								<FormControl>
									<Input
										placeholder='Digite o título...'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit'>Salvar Projeto de Teste</Button>
				</form>
			</Form>
		</>
	)
}

export default cadastrarProjeto
