import { cn } from "@/utils/styles";
import Link from "next/link";
import type { ComponentProps, FC } from "react";

type Props = {
  className?: string;
  href: string;
} & ComponentProps<"a">;

const ConditionalLink: FC<Props> = ({
  className,
  href,
  children,
  ...props
}) => {
  const isExternal = href.includes("://");

  return (
    <>
      {isExternal ? (
        <a
          className={cn("", className)}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          {...props}
        >
          {children}
        </a>
      ) : (
        <Link className={cn("", className)} href={href} {...props}>
          {children}
        </Link>
      )}
    </>
  );
};

export default ConditionalLink;
