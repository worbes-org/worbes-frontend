import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import MenuTrigger from "@/components/MenuTrigger";
import RegionMenuTrigger from "@/components/RegionMenuTrigger";
import SegmentedControl from "@/components/SegmentedControl";
import Separator from "@/components/Separator";
import Translation from "@/components/Translation";
import { Region } from "@/constants/game-server";
import { useAuctionFilter } from "@/hooks/useAuctionFilter";
import { FC } from "react";

type Props = {
  className?: string;
};

const ServerMenuTrigger: FC<Props> = ({ className }) => {
  const { filter, onFilterChange } = useAuctionFilter();

  return (
    <MenuTrigger
      className={className}
      menu={{ position: "bottom-right" }}
      renderButton={({ onClick }) => (
        <Button theme="primary" size="md" onClick={onClick}>
          <Translation messageKey="Select Realm" />
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
              value={filter.region}
              options={Object.values(Region).map((region) => ({
                value: region,
                label: region,
              }))}
              onChange={(region) => onFilterChange({ region, realm: null })}
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
};

export default ServerMenuTrigger;
