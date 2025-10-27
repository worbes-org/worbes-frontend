import type { RealmNameSchema } from "@/types/realm";
import type { z } from "zod";

export type RealmName = z.infer<typeof RealmNameSchema>;

export type Realm = {
  name: RealmName;
  id: number;
  connectedRealmId: number;
};
