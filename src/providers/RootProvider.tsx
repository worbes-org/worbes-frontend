import IntlProvider from "@/providers/IntlProvider";
import PageTransitionIndicatorProvider from "@/providers/PageTransitionIndicatorProvider";
import SettingsProvider from "@/providers/SettingsProvider";
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
      <PageTransitionIndicatorProvider>
        <TanstackQueryProvider>
          <SyncedStorageProvider ssrCookies={(await cookies()).getAll()}>
            <SettingsProvider>{children}</SettingsProvider>
          </SyncedStorageProvider>
        </TanstackQueryProvider>
      </PageTransitionIndicatorProvider>
    </IntlProvider>
  );
};

export default RootProvider;
