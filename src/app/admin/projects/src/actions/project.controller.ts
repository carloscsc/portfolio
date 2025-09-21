'use server'
import ResponseType from '@/shared/types/response.type'
import { StoreProjectTypes, Project, StoreProjectSchema } from '../types'

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

	await connect()

	const project = new Project(ProjectData)
	const savedProject = await project.save()

	// const savedProjectObj = savedProject.toObject()

	// const { __v, _id, ...projectWithoutV } = savedProjectObj

	// const returnedProjectObj = {
	// 	...projectWithoutV,
	// 	_id: _id.toString(),
	// }

	return {
		isSuccess: true,
		project: savedProject.toJSON(),
	}
}
