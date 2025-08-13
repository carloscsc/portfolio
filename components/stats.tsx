import { cn } from '@/lib/utils'

interface StatProps {
	value: string
	label: string
}

function StatItem({ value, label }: StatProps) {
	return (
		<div className='text-center'>
			<div className='text-4xl font-bold text-primary mb-2'>{value}</div>
			<div className='text-sm text-gray-400'>{label}</div>
		</div>
	)
}

export function Stats({ className = '' }: { className?: string }) {
	return (
		<div className={cn('grid grid-cols-2 md:grid-cols-4 gap-8', className)}>
			<StatItem
				value='12+'
				label='Anos de Experiência'
			/>
			<StatItem
				value='100+'
				label='Projetos Concluídos'
			/>
			<StatItem
				value='10+'
				label='Clientes felizes'
			/>
			<StatItem
				value='0'
				label='Clientes insatisfeitos'
			/>
		</div>
	)
}
