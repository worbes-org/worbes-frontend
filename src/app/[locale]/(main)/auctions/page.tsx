import AuctionBrowseSection from "@/components/AuctionBrowseSection";
import { type FC } from "react";

const AuctionsPage: FC = () => {
  return (
    <AuctionBrowseSection className="min-h-[calc(100dvh-var(--header-height))] pb-6" />
  );
};

export default AuctionsPage;
