"use client";

import IconButton from "@/components/IconButton";
import Modal from "@/components/Modal";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import Responsive from "@/components/Responsive";
import SideDrawer from "@/components/SideDrawer";
import Translation from "@/components/Translation";
import { cn } from "@/utils/styles";
import {
  ChevronDoubleRightIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import { useState, type FC } from "react";

type Props = {
  className?: string;
};

const FilterDialogContainer: FC<Props> = ({ className }) => {
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
          <SideDrawer
            className="w-[min(20rem,100dvw)] space-y-3 px-3 text-green-300"
            isOpen={isOpen}
            position="right"
            onClose={handleToggle(false)}
          >
            <div className="mt-2.5">
              <IconButton
                className="inline-block self-end"
                Icon={ChevronDoubleRightIcon}
                theme="clear"
                size="md"
                onClick={handleToggle(false)}
              />
              <Translation
                className="text-md relative -top-1 font-semibold"
                messageKey="Filter by"
              />
            </div>

            <FilterContentPanel />
          </SideDrawer>
        }
        desktop={
          <Modal
            title={<Translation messageKey="Filter by" />}
            visible={isOpen}
            size="md"
            onClose={handleToggle(false)}
          >
            <FilterContentPanel />
          </Modal>
        }
      />
    </>
  );

  function handleToggle(visible?: boolean) {
    return () => setIsOpen((prev) => visible ?? !prev);
  }
};

type FilterContentPanelProps = {
  className?: string;
};

const FilterContentPanel: FC<FilterContentPanelProps> = ({ className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <RegionSelector className="w-full" />
      <RealmSelector className="w-full" />
    </div>
  );
};

export default FilterDialogContainer;
