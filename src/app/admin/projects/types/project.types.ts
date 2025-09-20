import z from 'zod'
import { ProjectSchema, StoreProjectSchema } from './project.schema'

export type ProjectTypes = z.infer<typeof ProjectSchema>
export type StoreProjectTypes = z.infer<typeof StoreProjectSchema>
