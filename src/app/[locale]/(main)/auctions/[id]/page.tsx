import { AFC } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const AuctionDetailPage: AFC<Props> = async ({ params }) => {
  const { id } = await params;

  return <div>Auction Detail Page: {id}</div>;
};

export default AuctionDetailPage;
