import { ListSelectorOption } from "@/types/selector";

export const QUALITY = Object.freeze({
  MIN: 1,
  MAX: 6,
});

export const QUALITY_LABELS = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Artifact",
] as const;

export const ITEM_LEVEL = Object.freeze({
  MIN: 1,
  MAX: 999,
});

export const EXPANSIONS = [
  { value: 1, label: "Vanilla" },
  { value: 2, label: "The Burning Crusade" },
  { value: 3, label: "Wrath of the Lich King" },
  { value: 4, label: "Cataclysm" },
  { value: 5, label: "Mists of Pandaria" },
  { value: 6, label: "Warlords of Draenor" },
  { value: 7, label: "Legion" },
  { value: 8, label: "Battle for Azeroth" },
  { value: 9, label: "Shadowlands" },
  { value: 10, label: "Dragonflight" },
  { value: 11, label: "The War Within" },
] as const satisfies ListSelectorOption<number>[];
