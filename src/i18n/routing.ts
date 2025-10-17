import { DEFAULT_LOCALE, Locale } from "@/constants/i18n";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: Object.values(Locale),
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "as-needed",
  localeDetection: true,
});
