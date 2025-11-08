import AuctionBrowseSection from "@/components/AuctionBrowseSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div>
      <Header className="sticky top-0 z-10" />
      <AuctionBrowseSection className="h-[calc(100dvh-var(--header-height))]" />
      <Footer className="mt-auto shrink-0" />
    </div>
  );
};

export default HomePage;
