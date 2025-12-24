import { type Optional } from "@/types/misc";
import { getGoldSilverCopper } from "@/utils/currency";

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

export function formatCurrency(value: number) {
  const { gold, silver, copper } = getGoldSilverCopper(value);

  if (gold > 0) {
    return `${formatNumber(gold)}g`;
  }

  if (silver > 0) {
    return `${formatNumber(silver)}s`;
  }

  return `${formatNumber(copper)}c`;
}

export function compactObject<T extends Record<string, unknown>>(object: T): T {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => !!value),
  ) as T;
}
