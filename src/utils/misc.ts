import { type Optional } from "@/types/misc";

export function safelyGet<TValue>(callback: () => TValue): Optional<TValue> {
  try {
    return callback();
  } catch {
    return undefined;
  }
}

export function formatNumber(value: number) {
  return Intl.NumberFormat("en-US").format(value);
}

export function compactObject<T extends Record<string, unknown>>(object: T): T {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => !!value),
  ) as T;
}
