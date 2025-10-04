import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBlobURL(filePath: string): string {
  return `${process.env.NEXT_PUBLIC_BLOB_URL}/${filePath}`;
}

export function clearFileName(fileName: string): string {
  fileName = fileName.trim();
  fileName = fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  fileName = fileName.replace(/\s+/g, "-");
  fileName = fileName.replace(/\./g, "-");
  fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");
  return fileName.toLowerCase();
}
