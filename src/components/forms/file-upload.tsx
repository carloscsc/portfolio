// src/components/ui/file-upload.tsx
"use client";

import { Upload } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    ref,
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

    React.useImperativeHandle(ref, () => inputRef.current!);

    return (
      <div className={cn("space-y-4", className)}>
        <input
          ref={inputRef}
          id="file-upload-input"
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        <label
          htmlFor="file-upload-input"
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setDragOver(false);
          }}
          onDrop={handleDrop}
          className={cn(
            "border border-border border-dashed rounded-lg p-6 text-center cursor-pointer  block",
            dragOver && !disabled && "bg-accent/50",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          )}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Clique ou arraste {multiple ? "arquivos" : "um arquivo"} aqui
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled}
            tabIndex={-1}
          >
            Selecionar {multiple ? "Arquivos" : "Arquivo"}
          </Button>
        </label>
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
