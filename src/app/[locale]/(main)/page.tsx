import CategoryPicker from "@/components/CategoryPicker";
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

      <LayoutContainer className="space-y-3 pt-3">
        <CategoryPicker />
      </LayoutContainer>

      <Footer className="mt-auto" />
    </div>
  );
};

export default HomePage;
