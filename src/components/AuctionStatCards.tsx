import Card from "@/components/Card";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionDetail, AuctionHistory } from "@/types/auction";
import { getFloorPrice, getGoldSilverCopper } from "@/utils/currency";
import { formatCurrency } from "@/utils/misc";
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
          isCurrency: true,
        },
        {
          title: t("14-Day Median"),
          value: history.medianLowestPrice,
          isCurrency: true,
        },
        {
          title: t("Current Price"),
          value: getFloorPrice(detail.currentAuctions),
          isCurrency: true,
        },
        {
          title: t("Available Now"),
          value: detail.totalQuantity,
          isCurrency: false,
        },
      ].map((item) => {
        const { gold } = getGoldSilverCopper(item.value);

        return (
          <li key={item.title}>
            <Card theme="primary" padding="md">
              <h3>{item.title}</h3>

              {item.isCurrency ? (
                formatCurrency(item.value)
              ) : (
                <Translation
                  messageKey="{count} items"
                  values={{ count: item.value }}
                />
              )}
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default AuctionStatCards;
