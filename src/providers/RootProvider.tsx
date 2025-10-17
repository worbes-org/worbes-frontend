import { type Locale } from "@/constants/i18n";
import IntlProvider from "@/providers/IntlProvider";
import { type AFC, type PropsWithChildren } from "react";

type Props = {
  locale: Locale;
};

const RootProvider: AFC<PropsWithChildren<Props>> = async ({
  locale,
  children,
}) => {
  return <IntlProvider locale={locale}>{children}</IntlProvider>;
};

export default RootProvider;
