import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

interface CheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
	className?: string
	label: string
	description?: string | React.ReactElement
}

import { cn } from '@/lib/utils'

// }

const Checkbox = <T extends FieldValues>({
	className,
	label,
	description,
	...props
}: CheckboxProps<T>) => {
	const {
		field,

		fieldState: { error },
	} = useController(props)
	return (
		<div className='space-y-3'>
			<label
				htmlFor={field.name}
				className={cn(
					'select-none cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
					error && 'text-destructive'
				)}>
				{label}
			</label>
			<div className='flex flex-row items-center space-x-3 space-y-0 '>
				<CheckboxPrimitive.Root
					{...field}
					checked={field.value}
					onCheckedChange={field.onChange}
					id={field.name}
					className={cn(
						'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
						error && 'ring-red-600 focus-visible:ring-red-600 border-red-600',
						className
					)}
					{...props}>
					<CheckboxPrimitive.Indicator
						className={cn('flex items-center justify-center text-current')}>
						<Check className='h-4 w-4' />
					</CheckboxPrimitive.Indicator>
				</CheckboxPrimitive.Root>

				<label
					htmlFor={field.name}
					className={cn(
						'select-none text-sm leading-relaxed cursor-pointer',
						error && 'text-destructive'
					)}>
					{description}
				</label>
			</div>

			{error?.message && (
				<p className='text-xs font-medium text-destructive '>
					{String(error?.message)}
				</p>
			)}
		</div>
	)
}
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

export default Checkbox
