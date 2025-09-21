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
import { RepeatableTextField } from '@/components/ui/custom/repeatable-field'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { FileUpload } from '@/components/ui/custom/file-upload'

// TODO: apagar campos depois de enviar
// TODO: Adicionar TanStackQuery
// TODO: Adicionar Rich Editor

const cadastrarProjeto = () => {
	const form = useForm<StoreProjectTypes>({
		resolver: zodResolver(StoreProjectSchema),
		defaultValues: {
			title: '',
			description: '',
			client_name: '',
			client_description: '',
			client_location: '',
			duration: '',
			year: new Date().getFullYear(),
			demo_link: '',
			repo_link: '',
			cover: undefined,
			about_project: '',
			technologies: [],
			functionalities: [],
			gallery: [],
			challenges: [],
			results: [],
			status: 'ativo',
		},
	})

	const handleSubmit = useCallback(async (data: StoreProjectTypes) => {
		const request = await store(data)
		if (request.isSuccess && request.project) {
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

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className='space-y-8 mt-4'>
					{/* Projeto */}
					<div className='border-dashed border-2 p-4 rounded-md space-y-6'>
						<h2>Dados Básicos do Projeto</h2>
						<Separator />
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

						{/* Description */}
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição curta do Projeto</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Digite a descrição...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Long Description */}
						<FormField
							control={form.control}
							name='about_project'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição completa do Projeto</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Digite a descrição...'
											rows={20}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Separator />

						{/* Duration */}
						<FormField
							control={form.control}
							name='duration'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duração do Projeto</FormLabel>
									<FormControl>
										<Input
											placeholder='Informe a duração...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='year'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ano do Projeto</FormLabel>
									<FormControl>
										<Input
											placeholder='Informe o ano...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Separator />
						<FormField
							control={form.control}
							name='demo_link'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link de demonstração</FormLabel>
									<FormControl>
										<Input
											placeholder='Informe o link...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='repo_link'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link do repositório</FormLabel>
									<FormControl>
										<Input
											placeholder='Informe o link...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Separator />

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
					</div>

					{/* Cliente */}
					<div className='border-dashed border-2 p-4 rounded-md space-y-6'>
						<h2>Dados do Cliente</h2>
						<Separator />
						<FormField
							control={form.control}
							name='client_name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome do cliente</FormLabel>
									<FormControl>
										<Input
											placeholder='Digite o nome do cliente...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='client_description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição do cliente</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Digite a descrição do cliente...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='client_location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Localização do cliente</FormLabel>
									<FormControl>
										<Input
											placeholder='Digite a localização do cliente...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='border-dashed border-2 p-4 rounded-md space-y-6'>
						<h2>Imagens</h2>
						{/* Cover */}
						<FormField
							control={form.control}
							name='cover'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Imagem de Capa</FormLabel>
									<FormControl>
										<FileUpload
											accept='image/*'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Gallery */}
						<FormField
							control={form.control}
							name='gallery'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Galeria</FormLabel>
									<FormControl>
										<FileUpload
											accept='image/*'
											multiple
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type='submit'>Salvar Projeto</Button>
				</form>
			</Form>
		</>
	)
}

export default cadastrarProjeto
