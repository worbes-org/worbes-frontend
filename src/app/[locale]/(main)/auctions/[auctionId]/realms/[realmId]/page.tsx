import AuctionDetail from "@/components/AuctionDetail";
import { Region } from "@/constants/game-server";
import { fetchWowheadItem } from "@/injectors/item";
import { notFound } from "next/navigation";
import { AFC, Suspense } from "react";

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
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AuctionDetail
          region={Region.KR}
          realmId={realmId}
          auctionId={auctionId}
          item={item}
        />
      </Suspense>
    </div>
  );
};

export default AuctionDetailPage;
