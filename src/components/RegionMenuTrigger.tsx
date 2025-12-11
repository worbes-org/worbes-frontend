import DropdownPanel from "@/components/DropdownPanel";
import Input from "@/components/Input";
import MenuTrigger from "@/components/MenuTrigger";
import SearchableListSelector from "@/components/SearchableListSelector";
import { Locale } from "@/constants/i18n";
import { useRealms } from "@/hooks/useRealms";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Realm } from "@/types/game-server";
import { ListSelectorOption } from "@/types/selector";
import { getRealmNameByLocale } from "@/utils/realm";
import { cn } from "@/utils/styles";
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { noop } from "lodash-es";
import { useLocale } from "next-intl";
import { FC } from "react";

type Props = {
  className?: string;
};

const RegionMenuTrigger: FC<Props> = ({ className }) => {
  const locale = useLocale();
  const t = useTranslations();

  const { settings, onSettingsChange } = useSettingsContext();

  const { data: realms, isLoading } = useRealms(settings.region);

  const label = settings.realm
    ? getRealmNameByLocale(settings.realm, locale)
    : "";

  return (
    <MenuTrigger
      className={cn("", className)}
      renderButton={({ onClick }) => (
        <div
          className={cn(isLoading && "cursor-wait")}
          role="button"
          onClick={isLoading ? noop : onClick}
        >
          <Input
            className="pointer-events-none"
            size="md"
            placeholder={t("Search realm...")}
            isLoading={isLoading}
            value={label}
            rightIcon={<ChevronUpDownIcon />}
          />
        </div>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <DropdownPanel
          className="overflow-hidden"
          isOpen={isOpen}
          position="bottom"
        >
          <SearchableListSelector
            className="divide-y divide-gray-600"
            input={{
              className: "border-none",
              size: "md",
              autoFocus: true,
              placeholder: t("Search realm..."),
              leftIcon: <MagnifyingGlassIcon />,
            }}
            selector={{
              listClassName: "scrollbar-hide max-h-80 overflow-y-auto",
              fadeGradientClassName: { to: "to-gray-900" },
              options: buildRealmOptions(realms ?? [], locale),
              selectedValues: settings.realm ? [settings.realm.id] : [],
              onSelect: (option) => {
                onSettingsChange({
                  ...settings,
                  realm: option.metadata ?? null,
                });
                onClose();
              },
            }}
          />
        </DropdownPanel>
      )}
    />
  );
};

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

export default RegionMenuTrigger;
