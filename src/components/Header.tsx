"use client";

import LanguageMenuTrigger from "@/components/LanguageMenuTrigger";
import LayoutContainer from "@/components/LayoutContainer";
import ServerMenuTrigger from "@/components/ServerMenuTrigger";
import { HEADER_NAV_ITEMS } from "@/constants/navigation";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { cn } from "@/utils/styles";
import { AppUrlBuilder } from "@/utils/url";
import Link from "next/link";
import { type FC } from "react";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const pathname = usePathnameWithoutLocale();

  const navItems = HEADER_NAV_ITEMS.map((item) => ({
    ...item,
    isActive: item.href === pathname,
  }));

  return (
    <header
      className={cn(
        "h-(--header-height) border-b border-b-gray-600",
        className,
      )}
    >
      <LayoutContainer className="flex h-full items-center justify-between gap-x-6">
        <nav>
          <ul className="flex items-center gap-x-8">
            <li>
              <Link
                className="text-xl font-bold text-accent-800 drop-shadow-[0_0_10px_var(--color-accent-900)]"
                href={AppUrlBuilder.home()}
              >
                Worbes
              </Link>
            </li>

            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "align-sub font-semibold",
                    item.isActive
                      ? "text-white drop-shadow-[0_0_6px_var(--color-gray-400)]"
                      : "text-gray-300 hover:text-gray-100",
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-2">
          <LanguageMenuTrigger />
          <ServerMenuTrigger />
        </div>
      </LayoutContainer>
    </header>
  );
};

export default Header;
