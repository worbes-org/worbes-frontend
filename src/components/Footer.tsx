import LayoutContainer from "@/components/LayoutContainer";
import { cn } from "@/utils/styles";
import { useNow } from "next-intl";
import Link from "next/link";
import { type FC } from "react";

type Props = {
  className?: string;
};

const Footer: FC<Props> = ({ className }) => {
  const now = useNow();

  return (
    <div
      className={cn(
        "box-border h-12 border-t border-t-gray-900/40 pt-2",
        className,
      )}
    >
      <LayoutContainer>
        <Link
          className="inline text-base font-extrabold text-green-300"
          href="/"
        >
          Worbes
        </Link>
        <p className="ml-7 inline-block text-xs text-gray-600">
          &copy; {now.getFullYear()} Worbes. All rights reserved.
        </p>
      </LayoutContainer>
    </div>
  );
};

export default Footer;
