'use client'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Eye, EyeOff, Circle, CircleCheckBig } from 'lucide-react'

interface PasswordInputProps<T extends FieldValues>
	extends UseControllerProps<T> {
	label: string
	helper?: boolean
}

const PasswordInput = <T extends FieldValues>({
	helper = false,
	...props
}: PasswordInputProps<T>) => {
	const [showPassword, setShowPassword] = useState(false)
	const [passRequirimens, setPassRequiriments] = useState({
		minChar: false,
		upperCase: false,
		lowerCase: false,
		specialChar: false,
	})

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const {
		field,
		fieldState: { error },
	} = useController(props)

	const checkPassRequiriments = (password: string) => {
		setPassRequiriments({
			minChar: password.length >= 8,
			upperCase: /[A-Z]/.test(password),
			lowerCase: /[a-z]/.test(password),
			specialChar: /[^a-zA-Z0-9]/.test(password),
		})
	}

	return (
		<div className='space-y-2'>
			<label
				htmlFor={field.name}
				className={cn(
					'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
					error && 'text-destructive'
				)}>
				{props.label}
			</label>

			<div className='relative'>
				<input
					{...field}
					type={showPassword ? 'text' : 'password'}
					id={props.name}
					onChange={(event) => {
						field.onChange(event)
						checkPassRequiriments(event.target.value)
					}}
					className={cn(
						'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
						error && 'ring-red-600 focus-visible:ring-red-600 border-red-600'
					)}
					placeholder='********'
				/>

				<button
					type='button'
					onClick={handleClickShowPassword}
					className='absolute top-1/2 right-2 transform -translate-y-1/2 text-zinc-400'>
					{showPassword ?
						<EyeOff />
					:	<Eye />}
				</button>
			</div>

			{error?.message && (
				<p className='text-xs font-medium text-destructive'>
					{String(error?.message)}
				</p>
			)}

			{helper && (
				<div className='border-input bg-background rounded-md border px-3 py-2 text-xs text-muted-foreground space-x-1 space-y-1'>
					<h2 className='text-md font-semibold mb-2'>A senha precisa ter: </h2>
					<ul>
						<li className='flex items-center gap-1'>
							{passRequirimens.minChar ?
								<CircleCheckBig className='text-green-600 w-3' />
							:	<Circle className='w-3' />}
							Mínimo de 8 caracteres
						</li>

						<li className='flex items-center gap-1'>
							{passRequirimens.upperCase ?
								<CircleCheckBig className='text-green-600 w-3' />
							:	<Circle className='w-3' />}
							Uma ou mais letras maiúsculas
						</li>

						<li className='flex items-center gap-1'>
							{passRequirimens.lowerCase ?
								<CircleCheckBig className='text-green-600 w-3' />
							:	<Circle className='w-3' />}
							Uma ou mais letras minusculas
						</li>

						<li className='flex items-center gap-1'>
							{passRequirimens.specialChar ?
								<CircleCheckBig className='text-green-600 w-3' />
							:	<Circle className='w-3' />}
							Ao menos um caracter especial como: #@!$%&*?_-
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default PasswordInput
