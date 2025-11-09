"use client";

import IconButton from "@/components/IconButton";
import LayoutContainer from "@/components/LayoutContainer";
import SideDrawer from "@/components/SideDrawer";
import SideMenuPanel from "@/components/SideMenuPanel";
import { cn } from "@/utils/styles";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState, type FC } from "react";
import { useWindowScroll } from "react-use";

type Props = {
  className?: string;
};

const Header: FC<Props> = ({ className }) => {
  const { y } = useWindowScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const isScrolled = y > 10;

  return (
    <>
      <div
        className={cn(
          "h-16 border-b border-b-transparent bg-gray-950",
          isScrolled && "border-gray-800",
          className,
        )}
      >
        <LayoutContainer className="flex h-full items-center">
          <Link
            className="ml-4 text-2xl font-extrabold text-green-300"
            href="/"
          >
            worbes
          </Link>

          <IconButton
            className="ml-auto"
            theme="secondary"
            size="md"
            Icon={Bars3BottomLeftIcon}
            onClick={handleToggleSideMenu(true)}
          />
        </LayoutContainer>
      </div>

      <SideDrawer
        isOpen={menuOpen}
        position="right"
        onClose={handleToggleSideMenu(false)}
      >
        <SideMenuPanel />
      </SideDrawer>
    </>
  );

  function handleToggleSideMenu(isOpen: boolean) {
    return () => setMenuOpen(isOpen);
  }
};

export default Header;
