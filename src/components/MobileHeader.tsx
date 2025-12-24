"use client";

import LayoutContainer from "@/components/LayoutContainer";
import MobileSideMenuTrigger from "@/components/MobileSideMenuTrigger";
import { cn } from "@/utils/styles";
import { AppUrlBuilder } from "@/utils/url";
import Link from "next/link";
import { type FC } from "react";

type Props = {
  className?: string;
};

const DesktopHeader: FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        "h-(--header-height) border-b border-b-gray-600 bg-gray-950",
        className,
      )}
    >
      <LayoutContainer className="flex h-full items-center justify-between gap-x-6">
        <Link
          className="text-xl font-bold text-accent-800 drop-shadow-[0_0_10px_var(--color-accent-900)]"
          href={AppUrlBuilder.home()}
        >
          Worbes
        </Link>
        <MobileSideMenuTrigger />
      </LayoutContainer>
    </header>
  );
};

export default DesktopHeader;
