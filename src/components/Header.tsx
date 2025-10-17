"use client";

import LayoutContainer from "@/components/LayoutContainer";
import { cn } from "@/utils/styles";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { type FC } from "react";
import { useWindowScroll } from "react-use";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const { y } = useWindowScroll();
  const isScrolled = y > 10;

  return (
    <div
      className={cn(
        "h-16 border-b border-b-transparent bg-gray-950",
        isScrolled && "border-gray-800",
        className,
      )}
    >
      <LayoutContainer className="flex h-full items-center">
        <button>
          <Bars3BottomLeftIcon className="size-9 text-green-200" />
        </button>

        <Link className="ml-4 text-2xl font-extrabold text-green-300" href="/">
          worbes
        </Link>

        <button className="ml-auto">
          <MagnifyingGlassIcon className="size-6 text-green-200" />
        </button>
      </LayoutContainer>
    </div>
  );
};

export default Header;
