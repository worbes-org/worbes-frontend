import IconButton from "@/components/IconButton";
import LanguageSelector from "@/components/LanguageSelector";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { cn } from "@/utils/styles";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Locale, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  className?: string;
  onClose: () => void;
};

const SideMenuPanel: FC<Props> = ({ className, onClose }) => {
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useSelectedRegion();
  const [selectedRealm, setSelectedRealm] = useSelectedRealm();
  const locale = useLocale();

  return (
    <div className={cn("space-y-4 p-5", className)}>
      <IconButton
        theme="secondary"
        size="md"
        Icon={XMarkIcon}
        onClick={onClose}
      />

      <LanguageSelector value={locale} onChange={handleLanguageChange} />
      <RegionSelector value={selectedRegion} onChange={setSelectedRegion} />
      <RealmSelector
        region={selectedRegion}
        value={selectedRealm}
        onChange={setSelectedRealm}
      />
    </div>
  );

  function handleLanguageChange(locale: Locale) {
    router.replace(`/${locale}`);
  }
};

export default SideMenuPanel;
