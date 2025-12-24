import { COPPER_PER_SILVER, SILVER_PER_GOLD } from "@/constants/currency";

export function getGoldSilverCopper(value: number) {
  const gold = Math.floor(value / SILVER_PER_GOLD);
  const silver = Math.floor((value % SILVER_PER_GOLD) / COPPER_PER_SILVER);
  const copper = value % COPPER_PER_SILVER;

  return { gold, silver, copper };
}

export function getFloorPrice(currentAuctions: Record<string, number>) {
  return Math.min(...Object.keys(currentAuctions).map(Number));
}

export function formatPriceCompact(copper: number) {
  const { gold } = getGoldSilverCopper(copper);
  return `${gold.toLocaleString()}g`;
}

export function formatPriceDetailed(value: number) {
  const { gold, silver, copper } = getGoldSilverCopper(value);

  const parts: string[] = [];
  if (gold > 0) {
    parts.push(`${gold.toLocaleString()}g`);
  }
  if (silver > 0) {
    parts.push(`${silver}s`);
  }
  if (copper > 0) {
    parts.push(`${copper}c`);
  }

  return parts.length > 0 ? parts.join(" ") : "0c";
}

export function formatQuantityCompact(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}k`;
  }

  return value.toLocaleString();
}
