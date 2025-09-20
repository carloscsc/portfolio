import { LogOut } from 'lucide-react'
import AdminTabs from './admin-tabs'

const AdminPage = () => {
	return (
		<>
			<div className='flex flex-row justify-between items-center mx-auto w-full max-w-4xl'>
				<h1 className='text-center text-4xl p-4 ps-0'>&lt;Admin /&gt;</h1>
				<LogOut className='cursor-pointer' />
			</div>
			<AdminTabs />

			<footer className='mt-5 mb-4 text-center text-sm text-gray-500'>
				{new Date().getFullYear()}&copy; Carlos Sabo Cantanzaro - Todos os
				direitos reservados.
			</footer>
		</>
	)
}

export default AdminPage
