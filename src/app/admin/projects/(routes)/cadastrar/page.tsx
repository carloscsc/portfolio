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
import { RepeatableTextField } from '@/components/ui/repeatable-field'

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
			technologies: [],
			functionalities: [],
			gallery: [],
			challenges: [],
			results: [],
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

					<RepeatableTextField
						control={form.control}
						name='technologies'
						label='Tecnologias'
						placeholder='Ex: React, TypeScript, Node.js'
						minItems={1}
						maxItems={15}
					/>

					<RepeatableTextField
						control={form.control}
						name='functionalities'
						label='Funcionalidades'
						placeholder='Ex: Login, Cadastro, Painel de Controle'
						minItems={1}
						maxItems={15}
					/>

					<RepeatableTextField
						control={form.control}
						name='challenges'
						label='Desafios'
						placeholder='Ex: Desafio 1, Desafio 2'
						minItems={1}
						maxItems={15}
					/>

					<RepeatableTextField
						control={form.control}
						name='results'
						label='Resultados'
						placeholder='Ex: Resultado 1, Resultado 2'
						minItems={1}
						maxItems={15}
					/>

					<Button type='submit'>Salvar Projeto de Teste</Button>
				</form>
			</Form>
		</>
	)
}

export default cadastrarProjeto
