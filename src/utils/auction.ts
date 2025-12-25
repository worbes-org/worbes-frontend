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

export function getQualityColor(
  label: Exclude<ReturnType<typeof getQualityLabel>, null>,
) {
  switch (label) {
    case "Poor":
      return "var(--color-gray-400)";
    case "Common":
      return "var(--color-white)";
    case "Uncommon":
      return "var(--color-green-600)";
    case "Rare":
      return "var(--color-blue-700)";
    case "Epic":
      return "var(--color-purple-700)";
    case "Legendary":
      return "var(--color-orange)";
    default:
      console.error(`Quality ${label} not found`);
      return null;
  }
}
