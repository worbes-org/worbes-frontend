import DropdownPanel from "@/components/DropdownPanel";
import Input from "@/components/Input";
import MenuTrigger from "@/components/MenuTrigger";
import SearchableListSelector from "@/components/SearchableListSelector";
import { Locale } from "@/constants/i18n";
import { useAuctionFilter } from "@/hooks/useAuctionFilter";
import { useRealms } from "@/hooks/useRealms";
import { useTranslations } from "@/hooks/useTranslations";
import { Realm } from "@/types/game-server";
import { ListSelectorOption } from "@/types/selector";
import { getRealmNameByLocale } from "@/utils/realm";
import { cn } from "@/utils/styles";
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { FC } from "react";

type Props = {
  className?: string;
};

const RegionMenuTrigger: FC<Props> = ({ className }) => {
  const locale = useLocale();
  const t = useTranslations();

  const { filter, onFilterChange } = useAuctionFilter();

  const { data: realms, isLoading } = useRealms(filter.region);

  const label = filter.realm ? getRealmNameByLocale(filter.realm, locale) : "";

  return (
    <MenuTrigger
      className={cn("", className)}
      renderButton={({ onClick }) => (
        <div
          className={cn(isLoading && "cursor-wait")}
          role="button"
          onClick={onClick}
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
      renderMenu={({ isOpen }) => (
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
              selectedValues: filter.realm ? [filter.realm.id] : [],
              onSelect: (option) =>
                onFilterChange({ ...filter, realm: option.metadata ?? null }),
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
