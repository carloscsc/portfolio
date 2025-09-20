import { z } from 'zod'

export const ProjectSchema = z.object({
	id: z.string(),
	title: z.string().min(1, 'O título é obrigatório'),
	description: z
		.string()
		.min(10, 'A descrição deve ter pelo menos 10 caracteres'),
	client_name: z.string(),
	client_description: z.string(),
	client_location: z.string(),
	duration: z.string(),
	year: z.number().min(1900).max(new Date().getFullYear()),
	demo_link: z.url().optional(),
	repo_link: z.url().optional(),
	cover: z.string(),
	about_project: z.string(),
	technologies: z.array(z.string()).min(1, 'Adicione ao menos uma tecnologia'),
	functionalities: z
		.array(z.string())
		.min(1, 'Adicione ao menos uma funcionalidade'),
	gallery: z.array(z.string()).optional(),
	challenges: z.array(z.string()).min(1, 'Adicione ao menos um desafio'),
	results: z.array(z.string()).min(1, 'Adicione ao menos um resultado'),
	status: z.enum(['ativo', 'inativo']).default('ativo'),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
})

export const StoreProjectSchema = ProjectSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
}).extend({})
