"use client";

import AuctionsFilterPanel from "@/components/AuctionsFilterPanel";
import BottomDrawer from "@/components/BottomDrawer";
import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import Responsive from "@/components/Responsive";
import Translation from "@/components/Translation";
import { AuctionsFilter } from "@/types/auction";
import { cn } from "@/utils/styles";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState, type FC } from "react";

type Filter = Pick<
  AuctionsFilter,
  "minQuality" | "maxQuality" | "minItemLevel" | "maxItemLevel" | "expansionId"
>;

type Props = {
  className?: string;
  filter: Filter;
  onChange: (filter: Filter) => void;
};

const AuctionsFilterDialogContainer: FC<Props> = ({
  className,
  filter,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        className={cn("", className)}
        Icon={FunnelIcon}
        theme="primary"
        size="sm"
        onClick={handleToggle(true)}
      />

      <Responsive
        mobile={
          <BottomDrawer
            theme="primary"
            title={<Translation messageKey="Filter by" />}
            isOpen={isOpen}
            onClose={handleToggle(false)}
          >
            <AuctionsFilterPanel
              className="pb-4"
              filter={filter}
              onChange={onChange}
            />
          </BottomDrawer>
        }
        desktop={
          <Modal
            title={<Translation messageKey="Filter by" />}
            visible={isOpen}
            size="md"
            onClose={handleToggle(false)}
          >
            <AuctionsFilterPanel filter={filter} onChange={onChange} />
          </Modal>
        }
      />
    </>
  );

  function handleToggle(visible?: boolean) {
    return () => setIsOpen((prev) => visible ?? !prev);
  }
};

export default AuctionsFilterDialogContainer;
