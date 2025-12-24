import { getGoldSilverCopper } from "@/utils/currency";
import { formatNumber } from "@/utils/misc";
import { cn } from "@/utils/styles";
import { FC } from "react";

const CURRENCY_STYLES = {
  GOLD: "text-yellow",
  SILVER: "text-gray-300",
  COPPER: "text-copper",
} as const;

type Props = {
  className?: string;
  price: number;
  compact?: boolean;
};

const AuctionPrice: FC<Props> = ({ className, price, compact }) => {
  const { gold, silver, copper } = getGoldSilverCopper(price);
  const hasValue = gold > 0 || silver > 0 || copper > 0;

  return (
    <div className={cn(!compact && "flex items-center gap-1", className)}>
      {compact ? (
        gold > 0 ? (
          <span className={CURRENCY_STYLES.GOLD}>{formatNumber(gold)}g</span>
        ) : silver > 0 ? (
          <span className={CURRENCY_STYLES.SILVER}>
            {formatNumber(silver)}s
          </span>
        ) : (
          <span className={CURRENCY_STYLES.COPPER}>
            {formatNumber(copper)}c
          </span>
        )
      ) : (
        <>
          {gold > 0 && (
            <span className={CURRENCY_STYLES.GOLD}>{formatNumber(gold)}g</span>
          )}
          {silver > 0 && (
            <span className={CURRENCY_STYLES.SILVER}>
              {formatNumber(silver)}s
            </span>
          )}
          {(copper > 0 || !hasValue) && (
            <span className={CURRENCY_STYLES.COPPER}>
              {formatNumber(copper)}c
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default AuctionPrice;
