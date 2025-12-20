import AuctionDetail from "@/components/AuctionDetail";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC, Suspense } from "react";

type Props = {
  className?: string;
  realmId: string;
  auctionId: string;
  itemBonus: Nullable<string>;
};

const AuctionDetailContainer: FC<Props> = ({ className, ...props }) => {
  const {
    settings: { region: selectedRegion },
  } = useSettingsContext();

  return (
    <div className={cn("", className)}>
      <Suspense fallback={<div>Loading...</div>}>
        <AuctionDetail region={selectedRegion} {...props} />
      </Suspense>
    </div>
  );
};

export default AuctionDetailContainer;
