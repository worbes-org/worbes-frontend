import { useGlobalContext } from "@/hooks/useGlobalContext";

export function useSelectedRealm() {
  const { realmState } = useGlobalContext();
  return realmState;
}
