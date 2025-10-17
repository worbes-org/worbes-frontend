import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HomeBackground from "@/components/HomeBackground";
import LayoutContainer from "@/components/LayoutContainer";
import Translation from "@/components/Translation";
import { cn } from "@/utils/styles";
import { type FC } from "react";

const HomePage: FC = () => {
  return (
    <div className={cn("flex min-h-lvh flex-col")}>
      <Header className="sticky top-0 z-10" />
      <HomeBackground className="absolute inset-0 top-16 -z-10" />

      <LayoutContainer>
        <div className="mt-3 rounded-3xl bg-gray-950/80 p-8">
          <Translation
            className="text-4xl text-green-300"
            as="h1"
            messageKey="world"
          />
        </div>
      </LayoutContainer>

      <Footer className="mt-auto" />
    </div>
  );
};

export default HomePage;
