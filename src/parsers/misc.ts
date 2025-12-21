import type { Nullable } from "@/types/misc";

export function safeParseInt(value: unknown): Nullable<number> {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const num = Number(value);
  return Number.isFinite(num) ? Math.floor(num) : null;
}

export function safeParseString(value: unknown): Nullable<string> {
  if (value == null) {
    return null;
  }

  if (typeof value === "object" && "#text" in value) {
    return safeParseString(value["#text"]);
  }

  const str = String(value).trim();
  return str || null;
}
