import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BriefcaseIcon, Lock } from 'lucide-react'
import ProjectsList from './projects/projects-list'

const AdminTabs = () => {
	return (
		<div className='mx-auto w-full max-w-4xl border border-white/10 p-5'>
			<Tabs
				defaultValue='projetos'
				className='flex flex-row gap-10'>
				<TabsList className='w-[150px] flex-col h-screen justify-start'>
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
				<TabsContent value='projetos'>
					<ProjectsList />
				</TabsContent>
				<TabsContent value='password'>Change your password here.</TabsContent>
			</Tabs>
		</div>
	)
}
export default AdminTabs
