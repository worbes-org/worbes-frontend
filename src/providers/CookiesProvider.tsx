"use client";

import { type Nullable } from "@/types/misc";
import { createContext, type FC, type PropsWithChildren } from "react";

type CookiesContextState = {
  ssrCookies: CookieListItem[];
};

export const CookiesContext =
  createContext<Nullable<CookiesContextState>>(null);

type Props = {
  cookies: CookieListItem[];
} & PropsWithChildren;

const CookiesProvider: FC<Props> = ({ cookies, children }) => {
  return (
    <CookiesContext value={{ ssrCookies: cookies }}>{children}</CookiesContext>
  );
};

export default CookiesProvider;
