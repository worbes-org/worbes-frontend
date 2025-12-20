import { type Region } from "@/constants/game-server";
import { RealmsSchema } from "@/schemas/game-server";
import { type Realm } from "@/types/game-server";
import type { Nullable } from "@/types/misc";
import { useQuery } from "@tanstack/react-query";

export function useRealms(region: Nullable<Region>) {
  const query = useQuery<Realm[]>({
    queryKey: ["realms", region],
    queryFn: async () => {
      const response = await fetch(`/api/realms?region=${region}`);
      const data = await response.json();
      const parsed = RealmsSchema.parse(data);
      return parsed;
    },
    enabled: !!region,
  });

  return query;
}
