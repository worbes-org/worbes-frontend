import { useGlobalContext } from "@/hooks/useGlobalContext";

export function useCategorySelection() {
  const { categoryState } = useGlobalContext();
  return categoryState;
}
