import AuctionModalContainer from "@/components/AuctionModalContainer";
import { injectWowheadItem } from "@/injectors/item";
import { parseItemBonus } from "@/parsers/item";
import { Nullable } from "@/types/misc";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AFC } from "react";

type Props = {
  params: Promise<{
    realmId: string;
    auctionId: string;
  }>;
  searchParams: Promise<{
    itemBonus: Nullable<string>;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params, searchParams }) => {
  const { itemBonus: _itemBonus } = await searchParams;
  const itemBonus = _itemBonus ? parseItemBonus(_itemBonus) : null;

  const { realmId, auctionId } = await params;
  if (Number.isNaN(Number(realmId)) || Number.isNaN(Number(auctionId))) {
    notFound();
  }

  const locale = await getLocale();
  const item = await injectWowheadItem({ itemId: Number(auctionId), locale });
  if (!item) {
    console.error(`Failed to fetch Wowhead item ${auctionId}`);
    notFound();
  }

  return (
    <AuctionModalContainer
      initialParams={{ realmId, auctionId }}
      item={item}
      itemBonus={itemBonus}
    />
  );
};

export default AuctionDetailPage;
