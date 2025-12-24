import AuctionPrice from "@/components/AuctionPrice";
import Card from "@/components/Card";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionDetail, AuctionHistory } from "@/types/auction";
import { getFloorPrice } from "@/utils/currency";
import { cn } from "@/utils/styles";
import {
  ChartBarIcon,
  CubeIcon,
  CurrencyDollarIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  className?: string;
  detail: AuctionDetail;
  history: AuctionHistory;
};

const AuctionStatCards: FC<Props> = ({ className, detail, history }) => {
  const t = useTranslations();

  const stats = [
    {
      title: t("14-Day Average"),
      value: history.averageLowestPrice,
      isCurrency: true,
      Icon: ChartBarIcon,
      iconColor: "text-blue",
    },
    {
      title: t("14-Day Median"),
      value: history.medianLowestPrice,
      isCurrency: true,
      Icon: ScaleIcon,
      iconColor: "text-purple-400",
    },
    {
      title: t("Current Price"),
      value: getFloorPrice(detail.currentAuctions),
      isCurrency: true,
      Icon: CurrencyDollarIcon,
      iconColor: "text-green",
    },
    {
      title: t("Available Now"),
      value: detail.totalQuantity,
      isCurrency: false,
      Icon: CubeIcon,
      iconColor: "text-orange",
    },
  ];

  return (
    <ul className={cn("grid grid-cols-2 gap-4 md:grid-cols-4", className)}>
      {stats.map((item) => (
        <li key={item.title}>
          <Card
            className="flex h-30 flex-col justify-between"
            theme="primary"
            padding="md"
          >
            <h3 className="flex gap-x-2.5 text-sm">
              <item.Icon
                className={cn(
                  "size-6 shrink-0 rounded-md border p-1",
                  item.iconColor,
                )}
              />
              <span className="text-gray-300">{item.title}</span>
            </h3>

            {item.isCurrency ? (
              <AuctionPrice price={item.value} compact />
            ) : (
              <Translation
                className="text-yellow"
                messageKey="{count} items"
                values={{ count: item.value }}
              />
            )}
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatCards;
