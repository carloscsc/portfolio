// src/components/ui/file-upload.tsx
'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Upload, X } from 'lucide-react'

interface FileUploadProps {
	value?: File | File[]
	onChange: (files: File | File[] | undefined) => void
	accept?: string
	multiple?: boolean
	disabled?: boolean
	className?: string
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
	(
		{
			className,
			value,
			onChange,
			accept = 'image/*',
			multiple = false,
			disabled = false,
			...props
		},
		ref
	) => {
		const [dragOver, setDragOver] = React.useState(false)
		const inputRef = React.useRef<HTMLInputElement>(null)

		// Normalizar value para sempre ser array para facilitar o trabalho
		const files = React.useMemo(() => {
			if (!value) return []
			return Array.isArray(value) ? value : [value]
		}, [value])

		const handleFileChange = (newFiles: FileList | null) => {
			if (!newFiles || newFiles.length === 0) {
				onChange(multiple ? [] : undefined)
				return
			}

			const fileArray = Array.from(newFiles)

			if (multiple) {
				onChange(fileArray)
			} else {
				onChange(fileArray[0])
			}
		}

		const removeFile = (index: number) => {
			const newFiles = files.filter((_, i) => i !== index)

			if (multiple) {
				onChange(newFiles)
			} else {
				onChange(undefined)
			}
		}

		const handleDrop = (e: React.DragEvent) => {
			e.preventDefault()
			setDragOver(false)
			if (disabled) return
			handleFileChange(e.dataTransfer.files)
		}

		// Sync com input real quando necessário
		React.useImperativeHandle(ref, () => inputRef.current!)

		return (
			<div className={cn('space-y-4', className)}>
				<input
					ref={inputRef}
					type='file'
					accept={accept}
					multiple={multiple}
					disabled={disabled}
					className='hidden'
					onChange={(e) => handleFileChange(e.target.files)}
				/>

				<div
					onDragOver={(e) => {
						e.preventDefault()
						setDragOver(true)
					}}
					onDragLeave={(e) => {
						e.preventDefault()
						setDragOver(false)
					}}
					onDrop={handleDrop}
					onClick={() => !disabled && inputRef.current?.click()}
					className={cn(
						'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
						dragOver
							? 'border-primary bg-primary/5'
							: 'border-muted-foreground/25 hover:border-muted-foreground/50',
						disabled && 'opacity-50 cursor-not-allowed'
					)}>
					<Upload className='mx-auto h-8 w-8 text-muted-foreground mb-2' />
					<p className='text-sm text-muted-foreground mb-2'>
						Clique ou arraste {multiple ? 'arquivos' : 'um arquivo'} aqui
					</p>
					<Button
						type='button'
						variant='outline'
						size='sm'
						disabled={disabled}>
						Selecionar {multiple ? 'Arquivos' : 'Arquivo'}
					</Button>
				</div>

				{files.length > 0 && (
					<div className='space-y-2'>
						<p className='text-sm font-medium'>
							{files.length} arquivo{files.length > 1 ? 's' : ''} selecionado
							{files.length > 1 ? 's' : ''}
						</p>
						<div className='space-y-2'>
							{files.map((file, index) => (
								<div
									key={`${file.name}-${index}`}
									className='flex items-center justify-between p-3 border rounded-lg bg-muted/50'>
									<div className='flex items-center space-x-3'>
										{file.type.startsWith('image/') && (
											<img
												src={URL.createObjectURL(file)}
												alt={file.name}
												className='h-12 w-12 object-cover rounded border'
												onLoad={(e) => {
													setTimeout(() => {
														URL.revokeObjectURL(
															(e.target as HTMLImageElement).src
														)
													}, 100)
												}}
											/>
										)}
										<div>
											<p className='text-sm font-medium'>{file.name}</p>
											<p className='text-xs text-muted-foreground'>
												{(file.size / 1024 / 1024).toFixed(2)} MB
											</p>
										</div>
									</div>
									<Button
										type='button'
										variant='ghost'
										size='sm'
										onClick={() => removeFile(index)}
										disabled={disabled}>
										<X className='h-4 w-4' />
									</Button>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		)
	}
)

FileUpload.displayName = 'FileUpload'

export { FileUpload }
