import IconButton from "@/components/IconButton";
import LanguageSelector from "@/components/LanguageSelector";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import Translation from "@/components/Translation";
import { HEADER_NAV_ITEMS } from "@/constants/navigation";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Locale, useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  className?: string;
  onClose: () => void;
};

const SideMenuPanel: FC<Props> = ({ className, onClose }) => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();

  const [selectedRegion, setSelectedRegion] = useSelectedRegion();
  const [selectedRealm, setSelectedRealm] = useSelectedRealm();
  const locale = useLocale();

  const activeItem = HEADER_NAV_ITEMS.find((item) => item.href === pathname);

  return (
    <div className={cn("space-y-6 p-5", className)}>
      <IconButton
        theme="secondary"
        size="md"
        Icon={XMarkIcon}
        aria-label={t("Close")}
        onClick={onClose}
      />

      <nav className="space-y-1 sm:hidden">
        {HEADER_NAV_ITEMS.map((item) => {
          const isActive = activeItem?.href === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center rounded-xl px-3 py-2 transition-colors",
                "hover:bg-green-900/40 hover:text-green-100",
                isActive
                  ? "bg-green-900/60 font-extrabold text-green-100"
                  : "font-bold text-gray-300",
              )}
              onClick={onClose}
            >
              <span className="truncate">
                <Translation messageKey={item.label} />
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="h-px bg-gray-800 sm:hidden" role="separator" />

      <div className="space-y-4 not-sm:rounded-xl not-sm:border not-sm:border-gray-800/70 not-sm:bg-gray-900/50 not-sm:p-4">
        <h3 className="text-lg font-bold text-green-300">
          <Translation messageKey="Settings" />
        </h3>

        <LanguageSelector value={locale} onChange={handleLanguageChange} />
        <RegionSelector value={selectedRegion} onChange={setSelectedRegion} />
        <RealmSelector
          region={selectedRegion}
          value={selectedRealm}
          onChange={setSelectedRealm}
        />
      </div>
    </div>
  );

  function handleLanguageChange(locale: Locale) {
    router.replace(`/${locale}${pathname}`);
  }
};

export default SideMenuPanel;
