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

  return <RootProvider locale={locale}>{children}</RootProvider>;
};

export default MainLayout;
