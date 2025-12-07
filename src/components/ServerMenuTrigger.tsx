import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import MenuTrigger from "@/components/MenuTrigger";
import RegionMenuTrigger from "@/components/RegionMenuTrigger";
import SegmentedControl from "@/components/SegmentedControl";
import Separator from "@/components/Separator";
import Translation from "@/components/Translation";
import { Region } from "@/constants/game-server";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { Realm } from "@/types/game-server";
import { Nullable } from "@/types/misc";
import { getRealmNameByLocale } from "@/utils/realm";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { FC } from "react";

type Props = {
  className?: string;
};

const ServerMenuTrigger: FC<Props> = ({ className }) => {
  const t = useTranslations();
  const locale = useLocale();

  const { settings, onSettingsChange } = useSettingsContext();

  const isRegionSelected = !!settings.realm;

  return (
    <MenuTrigger
      className={className}
      menu={{ position: "bottom-right" }}
      renderButton={({ onClick }) => (
        <Button
          className="relative"
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
      renderMenu={({ isOpen }) => (
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

          <div className="mt-6 flex flex-col gap-y-2">
            <Translation messageKey="Select Region" />
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

          <Separator className="mt-5" orientation="horizontal" />

          <div className="mt-5 space-y-3">
            <Translation messageKey="Select Realm" as="h2" />
            <RegionMenuTrigger />
          </div>
        </DropdownPanel>
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

export default ServerMenuTrigger;
