import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import Input from "@/components/Input";
import MenuTrigger from "@/components/MenuTrigger";
import Responsive from "@/components/Responsive";
import SearchableListSelector from "@/components/SearchableListSelector";
import { Locale } from "@/constants/i18n";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useRealms } from "@/hooks/useRealms";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { SettingsState } from "@/providers/SettingsProvider";
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
  const isSmBreakpoint = useBreakpoint("sm");
  const t = useTranslations();
  const locale = useLocale();

  const { settings, onSettingsChange } = useSettingsContext();

  const { data: realms, isLoading } = useRealms(settings.region);

  const label = settings.realm
    ? getRealmNameByLocale(settings.realm, locale)
    : "";

  return (
    <MenuTrigger
      className={cn("", className)}
      closeOnClickAway={isSmBreakpoint}
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
        <Responsive
          mobile={
            <BottomDrawer
              className="h-[90dvh]"
              title={t("Select Realm")}
              theme="secondary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <RegionMenuContent
                listClassName="h-[calc(90dvh-7rem)]"
                realms={realms ?? []}
                settings={settings}
                onSettingsChange={onSettingsChange}
                onClose={onClose}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel
              className="overflow-hidden"
              isOpen={isOpen}
              position="bottom"
            >
              <RegionMenuContent
                listClassName="max-h-60"
                realms={realms ?? []}
                settings={settings}
                onSettingsChange={onSettingsChange}
                onClose={onClose}
              />
            </DropdownPanel>
          }
        />
      )}
    />
  );
};

const RegionMenuContent: FC<{
  className?: string;
  listClassName?: string;
  realms: Realm[];
  settings: SettingsState["settings"];
  onClose: () => void;
  onSettingsChange: SettingsState["onSettingsChange"];
}> = ({
  className,
  listClassName,
  realms,
  settings,
  onSettingsChange,
  onClose,
}) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <SearchableListSelector
      className={cn("divide-y divide-gray-600", className)}
      input={{
        className: "border-none",
        size: "lg",
        autoFocus: true,
        placeholder: t("Search realm..."),
        leftIcon: <MagnifyingGlassIcon />,
      }}
      selector={{
        listClassName: cn("scrollbar-hide overflow-y-auto", listClassName),
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
  );

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

export default RegionMenuTrigger;
