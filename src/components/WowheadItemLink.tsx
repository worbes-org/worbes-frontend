import ConditionalLink from "@/components/ConditionalLink";
import type { Locale } from "@/constants/i18n";
import type { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import QueryString from "qs";
import type { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
  id: number | string;
  level: number;
  iconSize: "sm" | "md" | "lg";
  locale: Locale;
  href: string;
  bonus?: Nullable<string>;
} & PropsWithChildren;

const WowheadItemLink: FC<Props> = ({
  className,
  id,
  level,
  iconSize,
  locale,
  href,
  bonus,
  children,
}) => {
  const dataWowhead = QueryString.stringify({
    item: id,
    domain: locale,
    bonus,
    ilvl: level,
  });

  return (
    <ConditionalLink
      className={cn("", className)}
      href={href}
      data-wowhead={dataWowhead}
      data-wh-icon-size={getIconSize(iconSize)}
      onClickCapture={handleClickCapture}
    >
      {children}
    </ConditionalLink>
  );

  function getIconSize(iconSize: "sm" | "md" | "lg") {
    switch (iconSize) {
      case "sm":
        return "tiny";
      case "md":
        return "small";
      case "lg":
        return "large";
      default:
        return "medium";
    }
  }

  // NOTE: Prevent default behavior from wowhead tooltip
  function handleClickCapture(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation();
  }
};

export default WowheadItemLink;
