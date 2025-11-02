import ConditionalLink from "@/components/ConditionalLink";
import type { Locale } from "@/constants/i18n";
import type { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import QueryString from "qs";
import type { FC, PropsWithChildren } from "react";

type Props = {
  className?: string;
  id: number | string;
  iconSize: "tiny" | "small" | "medium" | "large";
  locale: Locale;
  href?: string;
  bonus?: Nullable<string>;
} & PropsWithChildren;

const WowheadItemLink: FC<Props> = ({
  className,
  id,
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
  });

  return (
    <ConditionalLink
      className={cn("", className)}
      href={href ?? `https://www.wowhead.com/${locale}/item=${id}`}
      data-wowhead={dataWowhead}
      data-wh-icon-size={iconSize}
    >
      {children}
    </ConditionalLink>
  );
};

export default WowheadItemLink;
