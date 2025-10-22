import { type Region } from "@/constants/game-server";
import { type Realm } from "@/types/game-server";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const RealmsResponseSchema = z.object({
  content: z.array(
    z.object({
      name: z.object(),
      id: z.number(),
      connected_realm_id: z.number(),
    }),
  ),
});

export function useRealms(region: Region) {
  const query = useQuery<Realm[]>({
    queryKey: ["realms", region],
    queryFn: async () => {
      const response = await fetch(`/api/realms?region=${region}`);
      const data = await response.json();
      const parsed = RealmsResponseSchema.parse(data);

      const realms = parsed.content.map((item) => ({
        ...item,
        connectedRealmId: item.connected_realm_id,
      }));

      return realms;
    },
  });

  return query;
}
