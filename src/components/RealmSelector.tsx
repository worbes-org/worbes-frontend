"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { Region } from "@/constants/game-server";
import type { Locale } from "@/constants/i18n";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useRealms } from "@/hooks/useRealms";
import { useTranslations } from "@/hooks/useTranslations";
import type { Realm } from "@/types/game-server";
import { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
import { getRealmNameByLocale } from "@/utils/realm";
import { cn } from "@/utils/styles";
import {
  BuildingOfficeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { useMemo, type FC } from "react";

type Props = {
  className?: string;
  region: Nullable<Region>;
  value: Nullable<Realm>;
  onChange: (value: Realm) => void;
};

const RealmSelector: FC<Props> = ({ className, region, value, onChange }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isMdBreakpoint = useBreakpoint("md");

  const { data: realms, isLoading } = useRealms(region);

  const options = useMemo(
    () => buildRealmOptions(realms ?? [], locale),
    [realms, locale],
  );

  const selectedValues = value ? [value.id] : [];
  const label = value
    ? t("Realm: {selectedRealm}", {
        selectedRealm: getRealmNameByLocale(value, locale),
      })
    : "";

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      isLoading={isLoading}
      label={label}
      placeholder={t("Select realm")}
      closeOnClickAway={isMdBreakpoint}
      LeftIcon={BuildingOfficeIcon}
      RightIcon={ChevronDownIcon}
    >
      {({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Select realm")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ListSelector
                className="scrollbar-hide max-h-[calc(70dvh-7.5rem)] overflow-y-auto"
                options={options}
                selectedValues={selectedValues}
                onSelect={handleSelect}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
              <ListSelector
                className="scrollbar-hide max-h-[max(7rem,50dvh)] overflow-y-auto"
                options={options}
                selectedValues={selectedValues}
                onSelect={handleSelect}
              />
            </DropdownPanel>
          }
        />
      )}
    </SelectorTrigger>
  );

  function handleSelect(option: ListSelectorOption<number, Realm>) {
    if (!option.metadata) {
      return;
    }

    onChange(option.metadata);
  }

  function buildRealmOptions(
    realms: Realm[],
    locale: Locale,
  ): ListSelectorOption<number, Realm>[] {
    return realms.map((realm) => ({
      label: getRealmNameByLocale(realm, locale),
      value: realm.id,
      metadata: realm,
    }));
  }
};

export default RealmSelector;
