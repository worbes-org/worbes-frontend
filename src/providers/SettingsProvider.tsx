"use client";

import { Region } from "@/constants/game-server";
import { useRealms } from "@/hooks/useRealms";
import { type Realm } from "@/types/game-server";
import { type Nullable } from "@/types/misc";
import {
  createContext,
  useEffect,
  type FC,
  type PropsWithChildren,
} from "react";
import { useCookieState } from "synced-storage/react";

export type SettingsState = {
  settings: {
    region: Region;
    realm: Nullable<Realm>;
  };
  setSettings: (settings: SettingsState["settings"]) => void;
};

export const SettingsContext = createContext<Nullable<SettingsState>>(null);

type Props = {} & PropsWithChildren;

const SettingsProvider: FC<Props> = ({ children }) => {
  const [region, setRegion] = useCookieState<Region>("region", Region.KR, {
    strategy: "cookie",
    path: "/",
  });
  const [realm, setRealm] = useCookieState<Nullable<Realm>>("realm", null, {
    strategy: "cookie",
    path: "/",
  });

  const { data: realms } = useRealms(region);

  useEffect(() => {
    if (realm || !realms?.[0]) {
      return;
    }

    setSettings({ region, realm: realms[0] });
  }, [region, realm, realms]);

  return (
    <SettingsContext
      value={{
        settings: { region, realm },
        setSettings,
      }}
    >
      {children}
    </SettingsContext>
  );

  function setSettings(settings: SettingsState["settings"]) {
    setRegion(settings.region);
    setRealm(settings.realm);
  }
};

export default SettingsProvider;
