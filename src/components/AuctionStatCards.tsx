import Card from "@/components/Card";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionDetail, AuctionHistory } from "@/types/auction";
import { FC } from "react";

type Props = {
  className?: string;
  detail: AuctionDetail;
  history: AuctionHistory;
};

const AuctionStatCards: FC<Props> = ({ className, detail, history }) => {
  const t = useTranslations();

  return (
    <ul className="grid grid-cols-4 gap-x-4">
      {[
        {
          title: t("14-Day Average"),
          value: history.averageLowestPrice,
        },
        {
          title: t("14-Day Median"),
          value: history.medianLowestPrice,
        },
        // {
        //   title: t("Current Price"),
        //   value: detail.currentAuctions,
        // }
        {
          title: t("Available Now"),
          value: detail.totalQuantity,
        },
      ].map((item) => (
        <li key={item.title}>
          <Card theme="primary" padding="md">
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default AuctionStatCards;
