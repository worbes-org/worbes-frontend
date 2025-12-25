"use client";

import AuctionHistoryContainer, {
  AuctionHistoryContainerSkeleton,
} from "@/components/AuctionHistoryContainer";
import CurrentAuctionListCard from "@/components/CurrentAuctionListCard";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import Skeleton from "@/components/Skeleton";
import Translation from "@/components/Translation";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { Nullable } from "@/types/misc";
import { WowheadItem } from "@/types/wowhead";
import { cn } from "@/utils/styles";
import { FC, Suspense } from "react";

type Props = {
  className?: string;
  historyClassName?: string;
  auctionsClassName?: string;
  realmId: string;
  auctionId: string;
  item: WowheadItem;
  itemBonus?: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  historyClassName,
  auctionsClassName,
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

      <div className="flex gap-4 not-lg:flex-col">
        <div className={cn("w-full flex-1 self-start", historyClassName)}>
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
          className={cn("w-full self-start lg:max-w-96", auctionsClassName)}
          detail={detail}
        />
      </div>
    </div>
  );
};

export const AuctionDetailSkeleton: FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-x-4">
        <Skeleton className="size-16" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-7 w-full max-w-50" />
          <Skeleton className="h-5 w-full max-w-40" />
        </div>
      </div>

      <div className="flex gap-4 not-lg:flex-col">
        <AuctionHistoryContainerSkeleton className="flex-1" />
        <Skeleton className="h-145.5 w-full lg:max-w-96" />
      </div>
    </div>
  );
};

export default AuctionDetail;
