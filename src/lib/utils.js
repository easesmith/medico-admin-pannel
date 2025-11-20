import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function customId(id, prefix = "ID") {
  if (!id) return "";
  const part = `${id.slice(0, 4)}-${id.slice(-4)}`.toUpperCase();
  return `#${prefix}-${part}`;
}

export function buildQuery(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === "all"
    )
      return;
    query.append(key, value);
  });

  return query.toString(); // returns clean query string
}
