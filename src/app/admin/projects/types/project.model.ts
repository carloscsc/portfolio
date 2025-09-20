import mongoose, { Model, Schema } from 'mongoose'
import { StoreProjectTypes } from './project.types'

const ProjectMongooseSchema = new Schema<StoreProjectTypes>(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		client_name: { type: String, required: true },
		client_description: { type: String, required: true },
		client_location: { type: String, required: true },
		duration: { type: String, required: true },
		year: { type: Number, required: true },
		demo_link: { type: String },
		repo_link: { type: String },
		cover: { type: String, required: true },
		about_project: { type: String, required: true },
		technologies: { type: [String], required: true },
		functionalities: { type: [String], required: true },
		gallery: { type: [String] },
		challenges: { type: [String], required: true },
		results: { type: [String], required: true },
		status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
	},
	{
		timestamps: true,
	}
)

const Project: Model<StoreProjectTypes> =
	mongoose.models.Project ||
	mongoose.model<StoreProjectTypes>('Project', ProjectMongooseSchema)

export default Project
