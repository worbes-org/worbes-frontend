import { getGoldSilverCopper } from "@/utils/currency";
import { formatNumber } from "@/utils/misc";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  price: number;
};

const AuctionPrice: FC<Props> = ({ className, price }) => {
  const { gold, silver, copper } = getGoldSilverCopper(price);

  return (
    <div className={cn("", className)}>
      {gold > 0 ? (
        <div className="text-yellow">{formatNumber(gold)}g</div>
      ) : silver > 0 ? (
        <div className="text-shadow-accent-300">{formatNumber(silver)}s</div>
      ) : (
        <div className="text-[#cd7f32]">{formatNumber(copper)}c</div>
      )}
    </div>
  );
};

export default AuctionPrice;
