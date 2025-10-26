import CookiesProvider from "@/providers/CookiesProvider";
import GlobalProvider from "@/providers/GlobalProvider";
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
        <GlobalProvider>
          <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </GlobalProvider>
      </CookiesProvider>
    </IntlProvider>
  );
};

export default RootProvider;
