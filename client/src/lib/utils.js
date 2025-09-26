import clsx from "clsx";
import { twMerge } from "tailwind-merge"; // ✅ correct package

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
