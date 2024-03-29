import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(word: string): string {
  return `${word[0].toUpperCase() + word.slice(1)}`;
}

export const SERVER = process.env.SERVER_ADDRESS;
