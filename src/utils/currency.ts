import { COPPER_PER_SILVER, SILVER_PER_GOLD } from "@/constants/currency";

export function getGoldSilverCopper(value: number) {
  const gold = Math.floor(value / SILVER_PER_GOLD);
  const silver = Math.floor((value % SILVER_PER_GOLD) / COPPER_PER_SILVER);
  const copper = value % COPPER_PER_SILVER;

  return { gold, silver, copper };
}
