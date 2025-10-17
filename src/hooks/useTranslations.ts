// eslint-disable-next-line no-restricted-imports
import { useTranslations as _useTranslations } from "next-intl";

// NOTE: allow the use of dot in message keys
function withNormalizedKey(
  rawTranslateFn: ReturnType<typeof _useTranslations>,
) {
  const translateFn = (...args: Parameters<typeof rawTranslateFn>) => {
    const [messageKey, ...rest] = args;

    return rawTranslateFn(
      messageKey.replaceAll(".", "_") as typeof messageKey,
      ...rest,
    );
  };

  return translateFn;
}

export function useTranslations(...args: Parameters<typeof _useTranslations>) {
  const rawTranslateFn = _useTranslations(...args);

  return withNormalizedKey(rawTranslateFn);
}
