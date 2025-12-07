"use client";

import { Region } from "@/constants/game-server";
import { type Realm } from "@/types/game-server";
import { type Nullable } from "@/types/misc";
import { createContext, type FC, type PropsWithChildren } from "react";
import { useCookieState } from "synced-storage/react";

type AuctionFilterState = {
  filter: {
    region: Region;
    realm: Nullable<Realm>;
  };
  onFilterChange: (filter: AuctionFilterState["filter"]) => void;
};

export const AuctionFilterContext =
  createContext<Nullable<AuctionFilterState>>(null);

type Props = {} & PropsWithChildren;

const AuctionFilterProvider: FC<Props> = ({ children }) => {
  const [region, setRegion] = useCookieState<Region>("region", Region.KR);
  const [realm, setRealm] = useCookieState<Nullable<Realm>>("realm", null);

  const onChange = (filter: AuctionFilterState["filter"]) => {
    setRegion(filter.region);
    setRealm(filter.realm);
  };

  return (
    <AuctionFilterContext
      value={{ filter: { region, realm }, onFilterChange: onChange }}
    >
      {children}
    </AuctionFilterContext>
  );
};

export default AuctionFilterProvider;
