"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { Locale } from "@/constants/i18n";
import { useRealms } from "@/hooks/useRealms";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { useTranslations } from "@/hooks/useTranslations";
import type { Realm } from "@/types/game-server";
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
};

const RealmSelector: FC<Props> = ({ className }) => {
  const t = useTranslations();
  const locale = useLocale();

  const [selectedRegion] = useSelectedRegion();
  const [selectedRealm, setSelectedRealm] = useSelectedRealm();

  const { data: realms, isLoading } = useRealms(selectedRegion);

  const options = useMemo(
    () => buildRealmOptions(realms ?? [], locale),
    [realms, locale],
  );

  const selectedValues = selectedRealm ? [selectedRealm.id] : [];
  const label = selectedRealm
    ? t("Selected realm: {selectedRealm}", {
        selectedRealm: getRealmNameByLocale(selectedRealm, locale),
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
                className="max-h-[calc(70dvh-7.5rem)] overflow-y-auto"
                options={options}
                selectedValues={selectedValues}
                onSelect={handleSelect}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
              <ListSelector
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
    setSelectedRealm(option.metadata);
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
