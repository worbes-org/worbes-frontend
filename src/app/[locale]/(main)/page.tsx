import AuctionTable from "@/components/AuctionTable";
import BlockSection from "@/components/BlockSection";
import CategorySelector from "@/components/CategorySelector";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBackground from "@/components/HomeBackground";
import LayoutContainer from "@/components/LayoutContainer";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div>
      <Header className="sticky top-0 z-10" />
      <HomeBackground className="fixed inset-0 top-12.5 -z-10" />

      <LayoutContainer className="grid grid-cols-1 gap-x-6 py-6 lg:grid-cols-[15rem_1fr]">
        <BlockSection className="sticky top-22 h-156 not-lg:hidden">
          <CategorySelectorPanel className="scrollbar-hide h-full overflow-y-auto" />
        </BlockSection>

        <div className="flex h-[calc(100dvh-10rem)] flex-col space-y-6">
          <div className="flex flex-col">
            <div className="flex gap-x-4 not-xs:flex-col not-xs:gap-y-2">
              <RegionSelector className="w-full" />
              <RealmSelector className="w-full" />
            </div>
            <CategorySelector className="not-lg:mt-6 lg:hidden" />
          </div>

          <AuctionTable className="scrollbar-hide h-full flex-1 overflow-auto" />
        </div>
      </LayoutContainer>

      <Footer className="mt-auto shrink-0" />
    </div>
  );
};

export default HomePage;
