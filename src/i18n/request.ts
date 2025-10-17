import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

// NOTE: allow the use of dot in message keys
const normalizeMessageKeys = (messages: Record<string, string>) =>
  Object.entries(messages).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key.replaceAll(".", "_")]: value,
    }),
    {},
  );

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const localeMessages = (await import(`@/locales/${locale}.json`)).default;
  const fallbackMessages = (
    await import(`@/locales/${routing.defaultLocale}.json`)
  ).default;

  const rawMessages = {
    ...fallbackMessages,
    ...localeMessages,
  };
  const normalizedMessages = normalizeMessageKeys(rawMessages);

  return {
    locale,
    messages: normalizedMessages,
  };
});
