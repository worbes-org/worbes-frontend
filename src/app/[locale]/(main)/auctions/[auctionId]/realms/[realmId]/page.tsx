import { AFC } from "react";

type Props = {
  params: Promise<{
    auctionId: string;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params }) => {
  const { auctionId } = await params;

  return <div>Auction Detail Page: {auctionId}</div>;
};

export default AuctionDetailPage;
