"use client";

import IconButton from "@/components/IconButton";
import LayoutContainer from "@/components/LayoutContainer";
import SideDrawer from "@/components/SideDrawer";
import SideMenuPanel from "@/components/SideMenuPanel";
import Translation from "@/components/Translation";
import { HEADER_NAV_ITEMS } from "@/constants/navigation";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { cn } from "@/utils/styles";
import { AppUrlBuilder } from "@/utils/url";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, type FC } from "react";
import { useWindowScroll } from "react-use";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const { y } = useWindowScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathnameWithoutLocale();

  const activeItem = HEADER_NAV_ITEMS.find((item) => item.href === pathname);
  const isScrolled = y > 10;

  return (
    <>
      <div
        className={cn(
          "h-(--header-height) border-b border-b-transparent bg-gray-950",
          isScrolled && "border-gray-800",
          className,
        )}
      >
        <LayoutContainer className="flex h-full items-center">
          <Link
            className="ml-4 text-2xl font-extrabold text-green-300"
            href={AppUrlBuilder.home()}
          >
            worbes
          </Link>

          <nav className="-mb-1 ml-14 flex gap-x-9 not-md:hidden">
            {HEADER_NAV_ITEMS.map((item) => {
              const isActive = activeItem?.href === item.href;

              return (
                <Link
                  className={cn(
                    isActive
                      ? "font-extrabold text-green-100"
                      : "font-bold text-gray-400",
                  )}
                  key={item.href}
                  href={item.href}
                >
                  <Translation messageKey={item.label} />
                </Link>
              );
            })}
          </nav>

          <IconButton
            className="ml-auto"
            theme="clear"
            size="md"
            Icon={Bars3CenterLeftIcon}
            onClick={handleToggleSideMenu(true)}
          />
        </LayoutContainer>
      </div>

      <SideDrawer
        className="w-full max-w-md"
        isOpen={menuOpen}
        position="right"
        onClose={handleToggleSideMenu(false)}
      >
        {({ onClose }) => <SideMenuPanel onClose={onClose} />}
      </SideDrawer>
    </>
  );

  function handleToggleSideMenu(isOpen: boolean) {
    return () => setMenuOpen(isOpen);
  }
};

export default Header;
