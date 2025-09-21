'use server'
import ResponseType from '@/shared/types/response.type'
import { StoreProjectTypes, StoreProjectSchema } from '../types'
import { Project } from '../types/project.model'
import connect from '@/lib/db'

export async function store(
	ProjectData: StoreProjectTypes
): Promise<ResponseType> {
	const validate = StoreProjectSchema.safeParse(ProjectData)

	if (!validate.success) {
		console.log(validate.error)
		return {
			isSuccess: false,
			message: {
				type: 'error',
				text: 'Dados inválidos. Verifique as informações e tente novamente.',
			},
		}
	}

	// TODO: fazer upload das imagens

	// await connect()

	// const project = new Project(ProjectData)
	// const savedProject = await project.save()

	return {
		isSuccess: true,
		// project: savedProject.toJSON(),
	}
}
