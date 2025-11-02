import AuctionTable from "@/components/AuctionTable";
import BlockSection from "@/components/BlockSection";
import CategorySelector from "@/components/CategorySelector";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import FilterDialogContainer from "@/components/FilterDialogContainer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBackground from "@/components/HomeBackground";
import Input from "@/components/Input";
import LayoutContainer from "@/components/LayoutContainer";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

        <div className="flex h-[calc(100dvh-10rem)] flex-col">
          <CategorySelector className="w-full" />

          <div className="mt-3 flex gap-x-2">
            <FilterDialogContainer />
            <Input
              className="w-full"
              theme="primary"
              size="md"
              placeholder="Search"
              LeftIcon={MagnifyingGlassIcon}
            />
          </div>

          <AuctionTable className="mt-6 scrollbar-hide h-full flex-1 overflow-auto" />
        </div>
      </LayoutContainer>

      <Footer className="mt-auto shrink-0" />
    </div>
  );
};

export default HomePage;
