import { type Locale } from "@/constants/i18n";
import IntlProvider from "@/providers/IntlProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { type AFC, type PropsWithChildren } from "react";

type Props = {
  locale: Locale;
} & PropsWithChildren;

const RootProvider: AFC<Props> = async ({ locale, children }) => {
  return (
    <IntlProvider locale={locale}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </IntlProvider>
  );
};

export default RootProvider;
