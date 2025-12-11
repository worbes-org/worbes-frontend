import Button from "@/components/Button";
import LanguageMenuTrigger from "@/components/LanguageMenuTrigger";
import MenuTrigger from "@/components/MenuTrigger";
import Separator from "@/components/Separator";
import ServerMenuTrigger from "@/components/ServerMenuTrigger";
import SideDrawer from "@/components/SideDrawer";
import Translation from "@/components/Translation";
import { HEADER_NAV_ITEMS } from "@/constants/navigation";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { cn } from "@/utils/styles";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const MobileSideMenuTrigger = () => {
  const pathname = usePathnameWithoutLocale();

  const navItems = HEADER_NAV_ITEMS.map((item) => ({
    ...item,
    isActive: item.href === pathname,
  }));

  return (
    <MenuTrigger
      closeOnClickAway={false}
      renderButton={({ onClick }) => (
        <Button className="px-2" theme="primary" size="md" onClick={onClick}>
          <Bars3BottomRightIcon className="size-6 text-gray-300" />
        </Button>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <SideDrawer
          className="flex h-full w-full max-w-72 flex-col bg-gray-900"
          position="right"
          isOpen={isOpen}
          onClose={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Translation
              className="text-lg font-semibold text-gray-100"
              messageKey="Menu"
            />
            <button
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200"
              onClick={onClose}
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          <Separator orientation="horizontal" />

          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                      item.isActive
                        ? "bg-accent-600/15 text-accent-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-gray-100",
                    )}
                    href={item.href}
                    onClick={onClose}
                  >
                    <item.Icon
                      className={cn(
                        "size-5",
                        item.isActive ? "text-accent-500" : "text-gray-400",
                      )}
                    />

                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Separator orientation="horizontal" />

          <div className="space-y-3 px-4 py-4">
            <Translation
              className="px-1 text-xs font-medium tracking-wider text-gray-500"
              as="p"
              messageKey="Search Settings"
            />
            <div className="flex items-center gap-2">
              <ServerMenuTrigger className="flex-1" buttonClassName="w-full" />
              <LanguageMenuTrigger />
            </div>
          </div>
        </SideDrawer>
      )}
    />
  );
};

export default MobileSideMenuTrigger;
