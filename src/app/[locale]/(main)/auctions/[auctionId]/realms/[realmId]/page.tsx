import AuctionDetail, {
  AuctionDetailSkeleton,
} from "@/components/AuctionDetail";
import { fetchWowheadItem } from "@/injectors/item";
import { notFound } from "next/navigation";
import { AFC, Suspense } from "react";

type Props = {
  params: Promise<{
    realmId: string;
    auctionId: string;
  }>;
  searchParams: Promise<{
    itemBonus: string;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params, searchParams }) => {
  const { itemBonus } = await searchParams;
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
    <Suspense fallback={<AuctionDetailSkeleton />}>
      <AuctionDetail
        realmId={realmId}
        auctionId={auctionId}
        item={item}
        itemBonus={itemBonus}
      />
    </Suspense>
  );
};

export default AuctionDetailPage;
