import AuctionModalContainer from "@/components/AuctionModalContainer";
import { fetchWowheadItem } from "@/injectors/item";
import { notFound } from "next/navigation";
import { AFC } from "react";

type Props = {
  params: Promise<{
    realmId: string;
    auctionId: string;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params }) => {
  const { realmId, auctionId } = await params;
  if (Number.isNaN(Number(realmId)) || Number.isNaN(Number(auctionId))) {
    notFound();
  }

  const item = await fetchWowheadItem(Number(auctionId));
  if (!item) {
    console.error(`Failed to fetch Wowhead item ${auctionId}`);
    notFound();
  }

  return (
    <AuctionModalContainer initialParams={{ realmId, auctionId }} item={item} />
  );
};

export default AuctionDetailPage;
