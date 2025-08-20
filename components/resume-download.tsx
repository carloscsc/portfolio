'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileText, Sparkles } from 'lucide-react'

export function ResumeDownload() {
  const handleDownload = (type: 'simplified' | 'formatted') => {
    // Create download link based on type
    const fileName = type === 'simplified' ? 'curriculo-simplificado.txt' : 'curriculo-formatado.txt'
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    link.click()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='lg'
          variant='outline'
          className='border-primary text-primary hover:bg-primary hover:text-black bg-transparent'
        >
          <Download className='mr-2 h-4 w-4' />
          Baixe meu currículo
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-56'>
        <DropdownMenuItem 
          onClick={() => handleDownload('simplified')}
          className='cursor-pointer'
        >
          <FileText className='mr-2 h-4 w-4' />
          <div className='flex flex-col'>
            <span className='font-medium'>Versão Simplificada</span>
            <span className='text-xs text-muted-foreground'>
              Formato conciso e direto
            </span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDownload('formatted')}
          className='cursor-pointer'
        >
          <Sparkles className='mr-2 h-4 w-4' />
          <div className='flex flex-col'>
            <span className='font-medium'>Formatado</span>
            <span className='text-xs text-muted-foreground'>
              Design completo e detalhado
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
