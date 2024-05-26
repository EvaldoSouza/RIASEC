import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to convert DD/MM/YYYY string to a JavaScript Date object
export function converStringToDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
}
