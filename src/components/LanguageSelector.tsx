import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { Locale } from "@/constants/i18n";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTranslations } from "@/hooks/useTranslations";
import { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
  value: Locale;

  onChange?: (locale: Locale) => void;
};

const LanguageSelector: FC<Props> = ({
  className,
  value,

  onChange,
}) => {
  const t = useTranslations();
  const isMdBreakpoint = useBreakpoint("md");

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      label={t("Language: {selectedLanguage}", {
        selectedLanguage: getLanguageLabel(value),
      })}
      placeholder={t("Select language")}
      closeOnClickAway={isMdBreakpoint}
      LeftIcon={GlobeAltIcon}
      RightIcon={ChevronDownIcon}
    >
      {({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Select language")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ListSelector
                options={Object.values(Locale).map((locale) => ({
                  value: locale,
                  label: getLanguageLabel(locale),
                }))}
                selectedValues={[value]}
                onSelect={handleSelect}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
              <ListSelector
                options={Object.values(Locale).map((locale) => ({
                  value: locale,
                  label: getLanguageLabel(locale),
                }))}
                selectedValues={[value]}
                onSelect={handleSelect}
              />
            </DropdownPanel>
          }
        />
      )}
    </SelectorTrigger>
  );

  function handleSelect(option: ListSelectorOption<Locale>) {
    onChange?.(option.value);
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

export default LanguageSelector;
