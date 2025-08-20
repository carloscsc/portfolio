'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Sparkles } from 'lucide-react'

// Custom hook for 500px breakpoint
function useIsMobile500() {
	const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

	useEffect(() => {
		const mql = window.matchMedia(`(max-width: 499px)`)
		const onChange = () => {
			setIsMobile(window.innerWidth < 500)
		}
		mql.addEventListener('change', onChange)
		setIsMobile(window.innerWidth < 500)
		return () => mql.removeEventListener('change', onChange)
	}, [])

	return !!isMobile
}

export function ResumeDownload() {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const isMobile = useIsMobile500()

	const handleDownload = (type: 'simplified' | 'formatted') => {
		// Create download link based on type
		const fileName =
			type === 'simplified' ?
				'curriculo-simplificado.txt'
			:	'curriculo-formatado.txt'
		const link = document.createElement('a')
		link.href = `/${fileName}`
		link.download = fileName
		link.click()
		setIsOpen(false) // Close dropdown after download
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div
			className='relative'
			ref={dropdownRef}>
			<Button
				size='lg'
				variant='outline'
				className='border-primary text-primary hover:bg-primary hover:text-black bg-transparent'
				onClick={() => setIsOpen(!isOpen)}>
				<Download className='mr-2 h-4 w-4' />
				Baixe meu currículo
			</Button>

			{isOpen && (
				<div className='absolute top-full left-0 mt-1 z-50 overflow-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-md max-w-[calc(100vw-16px)]'>
					<div className={isMobile ? 'flex flex-col gap-1' : 'flex flex-row gap-1'}>
<div
onClick={() => handleDownload('simplified')}
className='flex flex-1 min-w-0 cursor-pointer select-none items-center gap-1 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground'>
<FileText className='h-4 w-4 flex-shrink-0' />
              <div className='flex flex-col min-w-0'>
                <span className='font-medium truncate'>Versão Simplificada</span>
                <span className='text-xs text-muted-foreground truncate'>
                  Formato conciso
                </span>
              </div>
</div>

<div
onClick={() => handleDownload('formatted')}
className='flex flex-1 min-w-0 cursor-pointer select-none items-center gap-1 rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground'>
<Sparkles className='h-4 w-4 flex-shrink-0' />
              <div className='flex flex-col min-w-0'>
                <span className='font-medium truncate'>Formatado</span>
                <span className='text-xs text-muted-foreground truncate'>
                  Design completo
                </span>
              </div>
</div>
					</div>
				</div>
			)}
		</div>
	)
}
