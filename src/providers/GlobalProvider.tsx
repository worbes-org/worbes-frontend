"use client";

import { Region } from "@/constants/game-server";
import useCookieState from "@/hooks/useCookieState";
import type { CategorySelection } from "@/types/category";
import { type Realm } from "@/types/game-server";
import { type Nullable } from "@/types/misc";
import { createContext, type FC, type PropsWithChildren } from "react";

type GlobalContextState = {
  regionState: ReturnType<typeof useCookieState<Nullable<Region>>>;
  realmState: ReturnType<typeof useCookieState<Nullable<Realm>>>;
  categoryState: ReturnType<typeof useCookieState<Nullable<CategorySelection>>>;
};

export const GlobalContext = createContext<Nullable<GlobalContextState>>(null);

type Props = {} & PropsWithChildren;

const GlobalProvider: FC<Props> = ({ children }) => {
  const regionState = useCookieState<Nullable<Region>>("region", Region.KR);
  const realmState = useCookieState<Nullable<Realm>>("realm", null);
  const categoryState = useCookieState<Nullable<CategorySelection>>(
    "category",
    null,
  );

  return (
    <GlobalContext value={{ regionState, realmState, categoryState }}>
      {children}
    </GlobalContext>
  );
};

export default GlobalProvider;
