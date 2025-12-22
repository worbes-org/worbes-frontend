import AuctionHistoryChart from "@/components/AuctionHistoryChart";
import AuctionStatCards from "@/components/AuctionStatCards";
import Card from "@/components/Card";
import SegmentedControl from "@/components/SegmentedControl";
import Translation from "@/components/Translation";
import { useAuctionHistory } from "@/hooks/useAuctionHistory";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionDetail } from "@/types/auction";
import { Maybe, Timeframe } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC, useState } from "react";

type Props = {
  className?: string;
  detail: AuctionDetail;
  realmId: string;
  auctionId: string;
  itemBonus: Maybe<string>;
};

const AuctionHistoryContainer: FC<Props> = ({
  className,
  detail,
  realmId,
  auctionId,
  itemBonus,
}) => {
  const t = useTranslations();

  const {
    settings: { region },
  } = useSettingsContext();
  const [timeframe, setTimeframe] = useState<Timeframe>(Timeframe.ONE_WEEK);

  const { data } = useAuctionHistory({
    region,
    realmId,
    auctionId,
    timeframe,
    itemBonus,
  });

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="space-y-6" theme="primary" padding="md">
        <div className="flex items-center justify-between">
          <div>
            <Translation
              className="block text-sm"
              messageKey="Current Lowest Price"
            />
            <span className="text-2xl font-semibold">??</span>
          </div>

          <SegmentedControl
            size="sm"
            value={timeframe}
            options={[
              { value: Timeframe.ONE_WEEK, label: t("7d") },
              { value: Timeframe.TWO_WEEKS, label: t("14d") },
              { value: Timeframe.ONE_MONTH, label: t("30d") },
            ]}
            onChange={handleTimeframeChange}
          />
        </div>

        <AuctionHistoryChart />
      </Card>

      <AuctionStatCards detail={detail} history={data} />
    </div>
  );

  function handleTimeframeChange(timeframe: Timeframe) {
    setTimeframe(timeframe);
  }
};

export const AuctionHistoryContainerSkeleton: FC<{ className?: string }> = ({
  className,
}) => {
  return <div className={cn("", className)}>Loading...</div>;
};

export default AuctionHistoryContainer;
