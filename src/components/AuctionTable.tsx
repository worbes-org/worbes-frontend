"use client";

import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import Table from "@/components/Table";
import WowheadItemLink from "@/components/WowheadItemLink";
import { COPPER_PER_SILVER, SILVER_PER_GOLD } from "@/constants/currency";
import { useTranslations } from "@/hooks/useTranslations";
import type { Auction } from "@/types/auction";
import type { TableColumn } from "@/types/table";
import { isBrowser } from "@/utils/env";
import { formatNumber } from "@/utils/misc";
import { cn } from "@/utils/styles";
import { AppUrlBuilder } from "@/utils/url";
import { useLocale } from "next-intl";
import { type FC } from "react";

type Props = {
  className?: string;
  values: Auction[];
  isLoading: boolean;
  onLastVisible: () => void;
};

const AuctionTable: FC<Props> = ({
  className,
  values,
  isLoading,
  onLastVisible,
}) => {
  const columns = useColumns();

  return (
    <Table
      className={cn("@container/auction-table", className)}
      tableClassName="table-fixed"
      columns={columns}
      values={values}
      rowSize="md"
      isLoading={isLoading}
      placeholderRowCount={30}
      keyExtractor={(value) => value.uuid}
      onLastVisible={onLastVisible}
      onRowsRendered={handleRowsRendered}
    />
  );

  function handleRowsRendered() {
    if (!isBrowser()) {
      return;
    }

    window.$WowheadPower?.refreshLinks?.();
  }

  function useColumns(): TableColumn<Auction>[] {
    const t = useTranslations();
    const locale = useLocale();

    return [
      {
        key: "item",
        label: t("ITEM"),
        align: "left",
        className: "truncate",
        headClassName: "w-[max(20rem,20cqw)]",
        render: (auction: Auction) => (
          <div className="inline-flex items-center gap-x-2">
            <WowheadItemLink
              className="peer space-x-1 truncate"
              href={AppUrlBuilder.auctionDetail(auction)}
              id={auction.itemId}
              level={auction.itemLevel}
              locale={locale}
              iconSize="md"
              bonus={auction.itemBonus}
            />
            {!!auction.craftingTier && (
              <ImageWithPlaceholder
                className="size-4 peer-empty:hidden"
                src={AppUrlBuilder.craftingTierImage(auction.craftingTier)}
                alt={t("Crafting Tier")}
              />
            )}
          </div>
        ),
      },
      {
        key: "price",
        label: t("PRICE"),
        headClassName: "w-[max(9rem,10cqw)]",
        render: (auction: Auction) => {
          const gold = Math.floor(auction.lowestPrice / SILVER_PER_GOLD);
          const silver = Math.floor(
            (auction.lowestPrice % SILVER_PER_GOLD) / COPPER_PER_SILVER,
          );

          return (
            <div className="inline-flex items-center gap-x-2">
              <div className="moneygold w-24 text-right">
                {formatNumber(gold)}
              </div>
              <div className="moneysilver w-8 text-right">
                {formatNumber(silver)}
              </div>
            </div>
          );
        },
      },
      {
        key: "itemLevel",
        label: t("LEVEL"),
        headClassName: "w-[max(5rem,10cqw)]",
        render: (auction: Auction) => auction.itemLevel,
      },
      {
        key: "quantity",
        label: t("QUANTITY"),
        headClassName: "w-[max(6rem,10cqw)]",
        render: (auction: Auction) => auction.totalQuantity,
      },
    ];
  }
};

export default AuctionTable;
