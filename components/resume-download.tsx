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
      type === 'simplified' 
        ? 'curriculo-simplificado.txt'
        : 'curriculo-formatado.txt'
    const link = document.createElement('a')
    link.href = `/${fileName}`
    link.download = fileName
    link.click()
    setIsOpen(false) // Close dropdown after download
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        size="lg"
        variant="outline"
        className="border-primary text-primary hover:bg-primary hover:text-black bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Download className="mr-2 h-4 w-4" />
        Baixe meu currículo
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-56 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <div
            onClick={() => handleDownload('simplified')}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileText className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Versão Simplificada</span>
              <span className="text-xs text-muted-foreground">
                Formato conciso e direto
              </span>
            </div>
          </div>
          
          <div
            onClick={() => handleDownload('formatted')}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Formatado</span>
              <span className="text-xs text-muted-foreground">
                Design completo e detalhado
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
