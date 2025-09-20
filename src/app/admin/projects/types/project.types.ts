import z from 'zod'
import { ProjectSchema, StoreProjectSchema } from './project.schema'

type ProjectTypes = z.infer<typeof ProjectSchema>
type StoreProjectTypes = z.infer<typeof StoreProjectSchema>
