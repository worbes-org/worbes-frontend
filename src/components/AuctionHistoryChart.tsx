"use client";

import { useTranslations } from "@/hooks/useTranslations";
import { AuctionHistory } from "@/types/auction";
import {
  formatPriceCompact,
  formatPriceDetailed,
  formatQuantityCompact,
} from "@/utils/currency";
import { cn } from "@/utils/styles";
import { useLocale } from "next-intl";
import { FC, useId, useMemo } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA_KEY = {
  TIME: "time",
  PRICE: "price",
  QUANTITY: "quantity",
} as const;

const COLORS = {
  PRICE: "var(--color-blue)",
  QUANTITY: "var(--color-purple-500)",
  GRID: "var(--color-gray-600)",
  TEXT: "var(--color-gray-300)",
  BACKGROUND: "var(--color-gray-900)",
  BORDER: "var(--color-gray-500)",
} as const;

type Props = {
  className?: string;
  history: AuctionHistory;
};

const AuctionHistoryChart: FC<Props> = ({ className, history }) => {
  const t = useTranslations();
  const locale = useLocale();
  const gradientId = useId();

  const chartData = useMemo(() => {
    return history.data.map((item) => ({
      [DATA_KEY.TIME]: item.time,
      [DATA_KEY.PRICE]: item.lowestPrice,
      [DATA_KEY.QUANTITY]: item.totalQuantity,
    }));
  }, [history, locale]);

  return (
    <div className={cn("h-80", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.PRICE} stopOpacity={0.4} />
              <stop
                offset="50%"
                stopColor={COLORS.QUANTITY}
                stopOpacity={0.2}
              />
              <stop offset="95%" stopColor={COLORS.PRICE} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.GRID}
            strokeOpacity={0.5}
          />

          <XAxis
            dataKey={DATA_KEY.TIME}
            stroke={COLORS.TEXT}
            tick={{ fill: COLORS.TEXT, fontSize: 11 }}
            tickLine={{ stroke: COLORS.GRID }}
            axisLine={{ stroke: COLORS.GRID }}
            minTickGap={40}
            tickFormatter={(date: Date) =>
              date.toLocaleDateString(locale, {
                month: "short",
                day: "numeric",
              })
            }
          />

          <YAxis
            yAxisId="left"
            stroke={COLORS.PRICE}
            tick={{ fill: COLORS.PRICE, fontSize: 11 }}
            tickLine={{ stroke: COLORS.GRID }}
            axisLine={{ stroke: COLORS.GRID }}
            tickFormatter={formatPriceCompact}
            width={60}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={COLORS.QUANTITY}
            tick={{ fill: COLORS.QUANTITY, fontSize: 11 }}
            tickLine={{ stroke: COLORS.GRID }}
            axisLine={{ stroke: COLORS.GRID }}
            tickFormatter={formatQuantityCompact}
            width={50}
          />

          <Tooltip
            wrapperClassName="flex flex-col gap-1.5 rounded-xl text-xs"
            contentStyle={{
              backgroundColor: COLORS.BACKGROUND,
              borderColor: COLORS.BORDER,
            }}
            labelFormatter={(label: Date) =>
              label.toLocaleString(locale, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            formatter={(value: number, name: string) => {
              if (name === DATA_KEY.PRICE) {
                return [formatPriceDetailed(value), t("Price")];
              }

              return [formatQuantityCompact(value), t("Quantity")];
            }}
          />

          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => {
              if (value === DATA_KEY.PRICE) {
                return t("Price");
              }

              if (value === DATA_KEY.QUANTITY) {
                return t("Quantity");
              }

              return value;
            }}
          />

          <Area
            yAxisId="left"
            type="monotone"
            dataKey={DATA_KEY.PRICE}
            fill={`url(#${gradientId})`}
            fillOpacity={0.6}
            stroke="none"
            legendType="none"
            tooltipType="none"
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey={DATA_KEY.PRICE}
            stroke={COLORS.PRICE}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: COLORS.PRICE }}
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey={DATA_KEY.QUANTITY}
            stroke={COLORS.QUANTITY}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: COLORS.QUANTITY }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AuctionHistoryChart;
