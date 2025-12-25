import AuctionFilterMenu from "@/components/AuctionFilterMenu";
import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import MenuTrigger from "@/components/MenuTrigger";
import Responsive from "@/components/Responsive";
import Translation from "@/components/Translation";
import { useBreakpoint } from "@/hooks/useBreakpoint";
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
  const isSmBreakpoint = useBreakpoint("sm");
  const t = useTranslations();

  return (
    <MenuTrigger
      className={className}
      closeOnClickAway={isSmBreakpoint}
      renderButton={({ onClick }) => (
        <Button
          className="flex items-center gap-x-2 not-sm:px-2.5"
          theme="primary"
          size="md"
          type="button"
          onClick={onClick}
        >
          <FunnelIcon className="size-5 text-gray-300" />
          <Translation messageKey="Filter" />
        </Button>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Filter")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <AuctionFilterMenu filter={filter} onChange={onChange} />
            </BottomDrawer>
          }
          desktop={
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
              <AuctionFilterMenu
                className="mt-4"
                filter={filter}
                onChange={onChange}
              />
            </DropdownPanel>
          }
        />
      )}
    />
  );
};

export default AuctionFilterMenuTrigger;
