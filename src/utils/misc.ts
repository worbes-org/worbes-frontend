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
