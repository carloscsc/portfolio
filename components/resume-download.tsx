'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, FileText, Sparkles } from 'lucide-react'

export function ResumeDownload() {
const [isOpen, setIsOpen] = useState(false)
const dropdownRef = useRef<HTMLDivElement>(null)

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
className='border-primary text-primary hover:bg-primary hover:text-black bg-transparent hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-black transition-all duration-300 touch-target'
onClick={() => setIsOpen(!isOpen)}>
<Download className='mr-2 h-4 w-4' />
Baixe meu currículo
</Button>

{isOpen && (
<div className='absolute top-full left-0 mt-1 z-50 overflow-hidden rounded-md border bg-popover p-2 text-popover-foreground shadow-md max-w-[calc(100vw-16px)] animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200'>
					<div className='flex flex-col gap-1'>
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
