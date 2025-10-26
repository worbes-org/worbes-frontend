import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import { cn } from "@/utils/styles";
import { type FC } from "react";

type Props = {
  className?: string;
};

const HomeBackground: FC<Props> = ({ className }) => {
  return (
    <div className={cn("h-200", className)}>
      <ImageWithPlaceholder
        className="h-200 opacity-50"
        imgClassName="object-cover object-center"
        src="/images/home-background.png"
        alt="Home Background"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950"
        role="presentation"
      />
    </div>
  );
};

export default HomeBackground;
