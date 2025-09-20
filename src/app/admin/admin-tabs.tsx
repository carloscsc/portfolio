import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BriefcaseIcon, Lock } from 'lucide-react'
import ProjectsList from './projects/projects-list'

const AdminTabs = () => {
	return (
		<div className='mx-auto w-full max-w-4xl border border-white/10 p-5'>
			<Tabs
				defaultValue='projetos'
				className='flex flex-row gap-4'>
				<TabsList className='flex-col h-screen justify-start w-[200px]'>
					<TabsTrigger
						className='w-full gap-2 justify-start'
						value='projetos'>
						<BriefcaseIcon className='w-4 h-4' /> Projetos
					</TabsTrigger>
					<TabsTrigger
						className='w-full gap-2 justify-start'
						value='password'>
						<Lock className='w-4 h-4' /> Password
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value='projetos'
					className='w-full m-0'>
					<ProjectsList />
				</TabsContent>
				<TabsContent
					value='password'
					className='w-full m-0'>
					Change your password here.
				</TabsContent>
			</Tabs>
		</div>
	)
}
export default AdminTabs
