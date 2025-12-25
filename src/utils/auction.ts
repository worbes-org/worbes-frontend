import { EXPANSIONS, QUALITY, QUALITY_LABELS } from "@/constants/auction";

export function getExpansionLabel(value: number) {
  const label = EXPANSIONS.find(
    (expansion) => expansion.value === value,
  )?.label;
  if (!label) {
    console.error(`Expansion ${value} not found`);
    return null;
  }

  return label;
}

export function getQualityLabel(value: number) {
  const label = QUALITY_LABELS[value - QUALITY.MIN];
  if (!label) {
    console.error(`Quality ${value} not found`);
    return null;
  }

  return label;
}
