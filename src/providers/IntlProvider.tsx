import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { type AFC, type PropsWithChildren } from "react";

type Props = {
  locale: string;
} & PropsWithChildren;

const IntlProvider: AFC<Props> = async ({ locale, children }) => {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider now={new Date()}>{children}</NextIntlClientProvider>
  );
};

export default IntlProvider;
