// src/components/ui/file-upload.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadProps {
  value?: File | File[];
  onChange: (files: File | File[] | undefined) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      onChange,
      accept = "image/*",
      multiple = false,
      disabled = false,
    },
    ref
  ) => {
    const [dragOver, setDragOver] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (newFiles: FileList | null) => {
      if (!newFiles || newFiles.length === 0) {
        onChange(multiple ? [] : undefined);
        return;
      }

      const fileArray = Array.from(newFiles);

      if (multiple) {
        onChange(fileArray);
      } else {
        onChange(fileArray[0]);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (disabled) return;
      handleFileChange(e.dataTransfer.files);
    };

    // Sync com input real quando necessário
    React.useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className={cn("space-y-4", className)}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Clique ou arraste {multiple ? "arquivos" : "um arquivo"} aqui
          </p>
          <Button type="button" variant="outline" size="sm" disabled={disabled}>
            Selecionar {multiple ? "Arquivos" : "Arquivo"}
          </Button>
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
