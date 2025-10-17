import { useTranslations } from "@/hooks/useTranslations";
import type { AppConfig } from "next-intl";
import { createElement, type ComponentProps, type JSX } from "react";

type Props<T extends keyof JSX.IntrinsicElements = "span"> = {
  messageKey: keyof AppConfig["Messages"];
  values?: Record<string, string | number>;
  as?: T;
} & Omit<ComponentProps<T>, "children">;

const Translation = <T extends keyof JSX.IntrinsicElements = "span">({
  messageKey,
  values,
  as,
  ...props
}: Props<T>) => {
  const t = useTranslations();

  return createElement(as || "span", props, t(messageKey, values));
};

export default Translation;
