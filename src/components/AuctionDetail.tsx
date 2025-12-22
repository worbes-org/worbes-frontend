"use client";

import AuctionHistoryContainer, {
  AuctionHistoryContainerSkeleton,
} from "@/components/AuctionHistoryContainer";
import CurrentAuctionListCard from "@/components/CurrentAuctionListCard";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import Translation from "@/components/Translation";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { Nullable } from "@/types/misc";
import { WowheadItem } from "@/types/wowhead";
import { cn } from "@/utils/styles";
import { FC, Suspense } from "react";

type Props = {
  className?: string;
  realmId: string;
  auctionId: string;
  item: WowheadItem;
  itemBonus?: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  realmId,
  auctionId,
  item,
  itemBonus,
}) => {
  const {
    settings: { region },
  } = useSettingsContext();
  const { data: detail } = useAuctionDetail({
    region,
    realmId,
    auctionId,
    itemBonus,
  });

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-x-4">
        <ImageWithPlaceholder
          className="size-16 overflow-hidden rounded-xl border-2 border-accent-600"
          src={item.iconUrl}
          alt={item.name}
        />
        <div>
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          <div className="flex items-center gap-x-2">
            <Translation
              className="text-sm text-gray-200"
              messageKey="{level} Level"
              values={{ level: item.level }}
            />
            <div className="size-1 rounded-full bg-gray-200" />
            <div className="text-sm text-gray-200">{item.subClassLabel}</div>
            {!!itemBonus && (
              <>
                <div className="size-1 rounded-full bg-gray-200" />
                <div className="text-sm text-gray-200">{itemBonus}</div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-x-6">
        <div className="flex-1">
          <Suspense fallback={<AuctionHistoryContainerSkeleton />}>
            <AuctionHistoryContainer
              detail={detail}
              realmId={realmId}
              auctionId={auctionId}
              itemBonus={itemBonus}
            />
          </Suspense>
        </div>

        <CurrentAuctionListCard
          className="min-w-96 self-start"
          detail={detail}
        />
      </div>
    </div>
  );
};

export const AuctionDetailSkeleton: FC<{ className?: string }> = ({
  className,
}) => {
  return <div className={cn("", className)}>Loading...</div>;
};

export default AuctionDetail;
