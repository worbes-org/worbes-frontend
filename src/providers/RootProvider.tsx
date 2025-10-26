import CookiesProvider from "@/providers/CookiesProvider";
import IntlProvider from "@/providers/IntlProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { cookies } from "next/headers";
import { type AFC, type PropsWithChildren } from "react";

type Props = {
  locale: string;
} & PropsWithChildren;

const RootProvider: AFC<Props> = async ({ locale, children }) => {
  return (
    <IntlProvider locale={locale}>
      <CookiesProvider cookies={(await cookies()).getAll()}>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </CookiesProvider>
    </IntlProvider>
  );
};

export default RootProvider;
