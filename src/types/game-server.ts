import { RealmsSchema } from "@/schemas/game-server";
import type { RealmNameSchema } from "@/types/realm";
import type { z } from "zod";

export type RealmName = z.infer<typeof RealmNameSchema>;

export type Realm = z.infer<typeof RealmsSchema>[number];
