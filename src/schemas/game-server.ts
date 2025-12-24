import { RealmNameSchema } from "@/types/realm";
import { z } from "zod";

export const RealmsSchema = z
  .object({
    content: z.array(
      z.object({
        name: RealmNameSchema,
        id: z.number(),
        connected_realm_id: z.number(),
      }),
    ),
  })
  .transform((data) =>
    data.content.map((item) => ({
      name: item.name,
      id: item.id,
      connectedRealmId: item.connected_realm_id,
    })),
  );
