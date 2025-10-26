import BlockSection from "@/components/BlockSection";
import CategoryFilterTrigger from "@/components/CategoryFilterTrigger";
import CategorySelector from "@/components/CategorySelector";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBackground from "@/components/HomeBackground";
import LayoutContainer from "@/components/LayoutContainer";
import { cn } from "@/utils/styles";
import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div className={cn("flex min-h-lvh flex-col")}>
      <Header className="sticky top-0 z-10" />
      <HomeBackground className="fixed inset-0 top-16 -z-10" />

      <LayoutContainer className="flex gap-x-6 py-6">
        <BlockSection className="h-fit min-w-[15rem] not-lg:hidden">
          <CategorySelector />
        </BlockSection>

        <BlockSection className="min-h-lvh flex-1">
          <CategoryFilterTrigger />
        </BlockSection>
      </LayoutContainer>

      <Footer className="mt-auto" />
    </div>
  );
};

export default HomePage;
