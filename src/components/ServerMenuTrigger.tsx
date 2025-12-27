import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import MenuTrigger from "@/components/MenuTrigger";
import RegionMenuTrigger from "@/components/RegionMenuTrigger";
import Responsive from "@/components/Responsive";
import SegmentedControl from "@/components/SegmentedControl";
import Separator from "@/components/Separator";
import Translation from "@/components/Translation";
import { Region } from "@/constants/game-server";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { SettingsState } from "@/providers/SettingsProvider";
import { Realm } from "@/types/game-server";
import { Nullable } from "@/types/misc";
import { getRealmNameByLocale } from "@/utils/realm";
import { cn } from "@/utils/styles";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { FC } from "react";

type Props = {
  className?: string;
  buttonClassName?: string;
};

const ServerMenuTrigger: FC<Props> = ({ className, buttonClassName }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isSmBreakpoint = useBreakpoint("sm");

  const { settings, setSettings } = useSettingsContext();

  const isRegionSelected = !!settings.realm;

  return (
    <MenuTrigger
      className={className}
      closeOnClickAway={isSmBreakpoint}
      renderButton={({ onClick }) => (
        <Button
          className={cn("relative", buttonClassName)}
          theme="primary"
          size="md"
          onClick={onClick}
        >
          {buildButtonLabel({ ...settings, isRegionSelected })}
          {!isRegionSelected && (
            <ExclamationCircleIcon className="absolute -top-2 -right-2 size-5.5 rounded-full bg-red p-0.5" />
          )}
        </Button>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Select Region & Server")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ServerMenuContent
                settings={settings}
                onSettingsChange={setSettings}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel
              className="w-100"
              isOpen={isOpen}
              position="bottom-right"
              padding="sm"
            >
              <div>
                <Translation
                  className="text-lg font-medium"
                  messageKey="Select Region & Server"
                  as="h2"
                />
                <Translation
                  className="text-sm text-gray-400"
                  messageKey="Select game region and server"
                  as="p"
                />
              </div>

              <ServerMenuContent
                className="mt-6"
                settings={settings}
                onSettingsChange={setSettings}
              />
            </DropdownPanel>
          }
        />
      )}
    />
  );

  function buildButtonLabel(args: {
    region: Region;
    realm: Nullable<Realm>;
    isRegionSelected: boolean;
  }) {
    if (args.isRegionSelected && args.realm) {
      const realmName = getRealmNameByLocale(args.realm, locale);
      return `${args.region}-${realmName}`;
    }

    return t("Select Realm");
  }
};

const ServerMenuContent: FC<{
  className?: string;
  settings: SettingsState["settings"];
  onSettingsChange: SettingsState["setSettings"];
}> = ({ className, settings, onSettingsChange }) => {
  return (
    <div className={cn("space-y-5", className)}>
      <div className="space-y-3">
        <Translation messageKey="Select Region" as="h2" />
        <SegmentedControl
          size="md"
          fullWidth
          value={settings.region}
          options={Object.values(Region).map((region) => ({
            value: region,
            label: region,
          }))}
          onChange={(region) => onSettingsChange({ region, realm: null })}
        />
      </div>

      <Separator orientation="horizontal" />

      <div className="space-y-3">
        <Translation messageKey="Select Realm" as="h2" />
        <RegionMenuTrigger />
      </div>
    </div>
  );
};

export default ServerMenuTrigger;
