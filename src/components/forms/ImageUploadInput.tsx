'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, Control, FieldValues, FieldPath } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { X, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	name: TName
	control: Control<TFieldValues>
	label?: string
	accept?: string
	maxSize?: number
	layout?: 'vertical' | 'horizontal'
}

export function ImageUploadInput<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	name,
	control,
	label,
	accept = 'image/*',
	maxSize = 5242880, // 5MB
	layout = 'vertical',
}: ImageUploadInputProps<TFieldValues, TName>) {
	const {
		field: { onChange },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: { required: 'Image is required' },
	})

	const [preview, setPreview] = useState<string | null>(null)

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0]
			onChange(file) // Pass an array with a single FileType object
			setPreview(URL.createObjectURL(file))
		},
		[onChange]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { [accept]: [] },
		maxSize,
		multiple: false,
	})

	const removeImage = () => {
		onChange([]) // Pass an empty array when removing the image
		setPreview(null)
	}

	return (
		<div className='space-y-2'>
			{label && (
				<label
					htmlFor={name}
					className={cn(
						'select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
						error && 'text-destructive'
					)}>
					{label}
				</label>
			)}

			<div
				{...getRootProps()}
				className={cn(
					'border-2 border-dashed rounded-md p-4 text-center cursor-pointer',
					isDragActive ? 'border-primary' : 'border-gray-300',
					error && 'border-red-500'
				)}>
				<Input
					{...getInputProps()}
					id={name}
				/>
				{preview ?
					<div className='relative inline-block'>
						<Image
							src={preview}
							alt='Preview'
							width={200}
							height={200}
							className='max-w-full h-auto'
						/>
						<button
							onClick={(e) => {
								e.stopPropagation()
								removeImage()
							}}
							className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'>
							<X size={16} />
						</button>
					</div>
				:	<div
						className={cn(
							'flex items-center justify-center space-y-2 space-x-2',
							layout === 'vertical' ? 'flex-col' : 'flex-row'
						)}>
						<Upload
							size={24}
							className={layout === 'vertical' ? 'mb-2' : 'mr-2'}
						/>
						<p>Adicione uma imagem</p>
					</div>
				}
			</div>
			{error && <p className='text-destructive text-sm'>{error.message}</p>}
		</div>
	)
}
