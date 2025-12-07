import { SettingsContext } from "@/providers/SettingsProvider";
import { assert } from "@/utils/assert";
import { useContext } from "react";

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  assert(context, "use <SettingsProvider> to access SettingsContext");

  return context;
}
