import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

const ProjectsList = () => {
	return (
		<div>
			<div className='w-full flex flex-row justify-between items-center border-b pb-2'>
				<h2 className='text-center text-lg'>Projetos</h2>

				<Button
					size='icon'
					asChild>
					<Link href='/admin/projects/cadastrar'>
						<Plus className='w-4 h-4' />
					</Link>
				</Button>
			</div>

			{/* Render the list of projects here */}
		</div>
	)
}
export default ProjectsList
