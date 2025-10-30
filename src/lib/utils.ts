import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBlobURL(filePath: string): string {
  return `${process.env.NEXT_PUBLIC_ASSETS_URL}/${filePath}`;
}

export function clearFileName(fileName: string): string {
  fileName = fileName.trim();
  fileName = fileName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  fileName = fileName.replace(/\s+/g, "-");
  fileName = fileName.replace(/\./g, "-");
  fileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "");
  return fileName.toLowerCase();
}

/**
 * Validate data
 */
export const isValidDate = (date: string): boolean => {
  const [day, month, year] = date.split("/").map(Number);

  if (!day || !month || !year) return false;

  const dateObject = new Date(year, month - 1, day);
  const isValid =
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month - 1 &&
    dateObject.getDate() === day;

  return isValid && year >= 1900 && year <= new Date().getFullYear();
};

// Function to validade CPF
export const isValidCPF = (cpf: string): boolean => {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
};
