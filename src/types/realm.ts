import { z } from "zod";

export const RealmNameSchema = z.object({
  de_DE: z.string().optional(),
  en_GB: z.string().optional(),
  en_US: z.string().optional(),
  es_ES: z.string().optional(),
  es_MX: z.string().optional(),
  fr_FR: z.string().optional(),
  it_IT: z.string().optional(),
  ko_KR: z.string().optional(),
  pt_BR: z.string().optional(),
  ru_RU: z.string().optional(),
  zh_CN: z.string().optional(),
  zh_TW: z.string().optional(),
});
