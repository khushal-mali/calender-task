import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | null) => {
  if (date === null) return;

  const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with a leading zero if needed
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const year = date.getFullYear(); // Get the full year

  return `${day}-${month}-${year}`;
};
