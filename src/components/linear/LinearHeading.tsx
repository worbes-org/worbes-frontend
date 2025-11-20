import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props = {
  as?: LinearHeadingLevel;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
} & ComponentProps<"h1">;

const LinearHeading: FC<Props> = ({
  as,
  level,
  className,
  children,
  ...props
}) => {
  const HeadingTag = as || (`h${level || 1}` as LinearHeadingLevel);
  const actualLevel = level || 1;

  return (
    <HeadingTag
      className={cn(
        "font-semibold text-[var(--linear-text-primary)] tracking-tight",
        // Level 1
        actualLevel === 1 && "text-4xl leading-tight",
        // Level 2
        actualLevel === 2 && "text-3xl leading-tight",
        // Level 3
        actualLevel === 3 && "text-2xl leading-snug",
        // Level 4
        actualLevel === 4 && "text-xl leading-snug",
        // Level 5
        actualLevel === 5 && "text-lg leading-normal",
        // Level 6
        actualLevel === 6 && "text-base leading-normal",
        className,
      )}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

export default LinearHeading;

