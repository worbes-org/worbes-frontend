import GlobalProvider from "@/providers/AuctionFilterProvider";
import IntlProvider from "@/providers/IntlProvider";
import TanstackQueryProvider from "@/providers/TanstackQueryProvider";
import { cookies } from "next/headers";
import { type AFC, type PropsWithChildren } from "react";
import { SyncedStorageProvider } from "synced-storage/react";

type Props = {
  locale: string;
} & PropsWithChildren;

const RootProvider: AFC<Props> = async ({ locale, children }) => {
  return (
    <IntlProvider locale={locale}>
      <TanstackQueryProvider>
        <SyncedStorageProvider ssrCookies={(await cookies()).getAll()}>
          <GlobalProvider>{children}</GlobalProvider>
        </SyncedStorageProvider>
      </TanstackQueryProvider>
    </IntlProvider>
  );
};

export default RootProvider;
