import AuctionPrice from "@/components/AuctionPrice";
import Card from "@/components/Card";
import Translation from "@/components/Translation";
import { AuctionDetail } from "@/types/auction";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  detail: AuctionDetail;
};

const CurrentAuctionListCard: FC<Props> = ({ className, detail }) => {
  return (
    <Card className={cn("space-y-4", className)} theme="primary" padding="md">
      <Translation
        className="text-lg font-semibold"
        messageKey="Current Auctions"
        as="h2"
      />

      <ul className="space-y-3">
        {Object.entries(detail.currentAuctions).map(([key, value]) => {
          const price = Number(key);
          const quantity = value;

          return (
            <li key={key}>
              <Card
                className="flex items-center justify-between"
                theme="secondary"
                padding="md"
              >
                <AuctionPrice price={price} />
                <div className="font-semibold text-accent-700">x{quantity}</div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default CurrentAuctionListCard;
