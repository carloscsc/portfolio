import z from 'zod'
import { ProjectsSchema } from './project.schema'

type ProjectTypes = z.infer<typeof ProjectsSchema>
