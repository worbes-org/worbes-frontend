import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
};

const AuctionHistoryChart: FC<Props> = ({ className }) => {
  return <div className={cn("", className)}>AuctionHistoryChart</div>;
};

export default AuctionHistoryChart;
