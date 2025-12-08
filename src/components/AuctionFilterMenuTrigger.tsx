import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import MenuTrigger from "@/components/MenuTrigger";
import MinMaxInput from "@/components/MinMaxInput";
import Translation from "@/components/Translation";
import { ITEM_LEVEL } from "@/constants/auction";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  onChange: (filter: AuctionsFilter) => void;
};

const AuctionFilterMenuTrigger: FC<Props> = ({
  className,
  filter,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <MenuTrigger
      className={className}
      renderButton={({ onClick }) => (
        <Button
          className="flex items-center gap-x-2"
          onClick={onClick}
          theme="primary"
          size="md"
        >
          <FunnelIcon className="size-5 text-gray-300" />
          <Translation messageKey="Filter" />
        </Button>
      )}
      renderMenu={({ isOpen }) => (
        <DropdownPanel
          className="z-20 w-90"
          isOpen={isOpen}
          position="bottom-right"
          padding="sm"
        >
          <Translation
            className="text-lg font-medium"
            messageKey="Filter"
            as="h2"
          />

          <div className="mt-4 space-y-2">
            <Translation
              className="text-gray-200"
              messageKey="Item Level"
              as="h3"
            />
            <MinMaxInput
              size="md"
              value={{ min: filter.minItemLevel, max: filter.maxItemLevel }}
              limit={{ min: ITEM_LEVEL.MIN, max: ITEM_LEVEL.MAX }}
              minPlaceholder={t("Min")}
              maxPlaceholder={t("Max")}
              onChange={(value) =>
                onChange({
                  ...filter,
                  minItemLevel: value.min,
                  maxItemLevel: value.max,
                })
              }
            />
          </div>
        </DropdownPanel>
      )}
    />
  );
};

export default AuctionFilterMenuTrigger;
