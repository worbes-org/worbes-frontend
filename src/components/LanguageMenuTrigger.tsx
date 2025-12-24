import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import MenuTrigger from "@/components/MenuTrigger";
import Responsive from "@/components/Responsive";
import { Locale } from "@/constants/i18n";
import { usePathnameWithoutLocale } from "@/hooks/usePathnameWithoutLocale";
import { useTranslations } from "@/hooks/useTranslations";
import { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  className?: string;
};

const LanguageMenuTrigger: FC<Props> = ({ className }) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathnameWithoutLocale();

  return (
    <MenuTrigger
      className={cn("", className)}
      renderButton={({ onClick }) => (
        <Button className="px-2" theme="tertiary" size="md" onClick={onClick}>
          <GlobeAltIcon className="size-6 text-gray-300" />
        </Button>
      )}
      renderMenu={({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Language")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ListSelector
                options={Object.values(Locale).map((locale) => ({
                  value: locale,
                  label: getLanguageLabel(locale),
                }))}
                selectedValues={[locale]}
                onSelect={handleSelect}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel
              className="w-40 overflow-hidden"
              isOpen={isOpen}
              position="bottom-right"
            >
              <ListSelector
                options={Object.values(Locale).map((locale) => ({
                  value: locale,
                  label: getLanguageLabel(locale),
                }))}
                selectedValues={[locale]}
                onSelect={handleSelect}
              />
            </DropdownPanel>
          }
        />
      )}
    />
  );

  function handleSelect(option: ListSelectorOption<Locale>) {
    router.replace(`/${option.value}`);
  }

  function getLanguageLabel(locale: Locale) {
    switch (locale) {
      case Locale.KOREAN:
        return "한국어";
      case Locale.ENGLISH:
        return "English";
      default:
        console.warn(`Unsupported locale: ${locale}`);
        return "";
    }
  }
};

export default LanguageMenuTrigger;
