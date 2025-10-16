import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

type options = {
	value: string
	label: string
}

interface CheckboxProps<T extends FieldValues> extends UseControllerProps<T> {
	title: string
	label: string
	options: options[]
}

const Radio = <T extends FieldValues>({ ...props }: CheckboxProps<T>) => {
	const {
		field,
		fieldState: { error },
	} = useController(props)

	return (
		<div className='space-y-4'>
			<label
				htmlFor={field.name}
				className={cn(
					'select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
					error && 'text-destructive'
				)}>
				{props.title}
			</label>

			<RadioGroup
				defaultValue={props.options[0].value}
				onValueChange={field.onChange}
				name={field.name}>
				{props.options.map((option) => (
					<div
						className='flex items-center space-x-2'
						key={option.label}>
						<RadioGroupItem
							value={option.value}
							id={option.value}
						/>

						<label
							htmlFor={option.value}
							className={cn(
								'select-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							)}>
							{option.label}
						</label>
					</div>
				))}
			</RadioGroup>

			{error?.message && (
				<p className='text-xs font-medium text-destructive'>
					{String(error?.message)}
				</p>
			)}
		</div>
	)
}

export default Radio
