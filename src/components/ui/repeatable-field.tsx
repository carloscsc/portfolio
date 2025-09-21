'use client'

import * as React from 'react'
import { useFieldArray, Control } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	FormDescription,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Plus, X } from 'lucide-react'

interface RepeatableStringFieldProps {
	control: Control<any>
	name: string
	label: string
	description?: string
	placeholder?: string
	className?: string
	inputType?: 'text' | 'url' | 'email'
	minItems?: number
	maxItems?: number
	validation?: (value: string) => string | undefined
}

export function RepeatableTextField({
	control,
	name,
	label,
	description,
	placeholder = 'Digite aqui...',
	className,
	inputType = 'text',
	minItems = 0,
	maxItems = 20,
	validation,
}: RepeatableStringFieldProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	})

	return (
		<div className={cn('space-y-4', className)}>
			<div>
				<div className='flex items-center justify-between mb-2'>
					<FormLabel className='text-base font-medium'>{label}</FormLabel>
					<Button
						type='button'
						variant='outline'
						size='sm'
						onClick={() => append('')}
						disabled={fields.length >= maxItems}
						className='flex items-center gap-2'>
						<Plus className='w-4 h-4' />
						Adicionar
					</Button>
				</div>
				{description && (
					<FormDescription className='mb-4'>{description}</FormDescription>
				)}
			</div>

			<div className='space-y-3'>
				{fields.map((field, index) => (
					<div
						key={field.id}
						className='flex gap-2 items-start'>
						<FormField
							control={control}
							name={`${name}.${index}`}
							rules={validation ? { validate: validation } : undefined}
							render={({ field: inputField }) => (
								<FormItem className='flex-1'>
									<FormControl>
										<Input
											{...inputField}
											type={inputType}
											placeholder={`${placeholder} ${index + 1}`}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type='button'
							variant='destructive'
							size='sm'
							onClick={() => remove(index)}
							disabled={fields.length <= minItems}
							className='mt-0'>
							<X className='w-4 h-4' />
						</Button>
					</div>
				))}

				{fields.length === 0 && (
					<div className='text-center py-8 text-muted-foreground border-2 border-dashed rounded-md'>
						<p>Nenhum {label.toLowerCase().slice(0, -1)} adicionado</p>
						<p className='text-sm'>Clique em "Adicionar" para começar</p>
					</div>
				)}
			</div>

			{minItems > 0 && fields.length < minItems && (
				<p className='text-sm text-destructive'>
					Adicione pelo menos {minItems} {label.toLowerCase()}
				</p>
			)}
		</div>
	)
}
