import Header from "@/components/Header";
import RootProvider from "@/providers/RootProvider";
import { type AFC, type PropsWithChildren } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

const MainLayout: AFC<PropsWithChildren<Props>> = async ({
  params,
  children,
}) => {
  const { locale } = await params;

  return (
    <RootProvider locale={locale}>
      <Header className="sticky top-0 z-10" />
      {children}
    </RootProvider>
  );
};

export default MainLayout;
