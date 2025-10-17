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
    <div className={cn("h-28 border-t border-t-gray-800 py-6", className)}>
      <LayoutContainer className="space-y-1">
        <Link
          className="inline-block text-2xl font-extrabold text-green-300"
          href="/"
        >
          Worbes
        </Link>
        <p className="text-sm text-gray-400">
          &copy; {now.getFullYear()} Worbes. All rights reserved.
        </p>
      </LayoutContainer>
    </div>
  );
};

export default Footer;
