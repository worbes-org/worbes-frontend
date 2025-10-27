import type { Locale } from "@/constants/i18n";
import type { Realm } from "@/types/game-server";

export function getRealmNameByLocale(realm: Realm, locale: Locale): string {
  const regex = new RegExp(`^${locale}_[A-Z]{2}$`);
  const pairs = Object.entries(realm.name);

  for (const [locale, name] of pairs) {
    if (!regex.test(locale)) {
      continue;
    }

    return name;
  }

  const fallback = realm.name.en_US ?? "N/A";
  return fallback;
}
