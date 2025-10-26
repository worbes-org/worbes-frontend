import { useGlobalContext } from "@/hooks/useGlobalContext";

export function useSelectedRegion() {
  const { regionState } = useGlobalContext();
  return regionState;
}
