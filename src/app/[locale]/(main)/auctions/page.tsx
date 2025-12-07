import AuctionBrowseSection from "@/components/AuctionBrowseSection";
import LayoutContainer from "@/components/LayoutContainer";
import { type FC } from "react";

const AuctionsPage: FC = () => {
  return (
    <LayoutContainer>
      <AuctionBrowseSection className="h-[calc(100dvh-var(--header-height))]" />
    </LayoutContainer>
  );
};

export default AuctionsPage;
