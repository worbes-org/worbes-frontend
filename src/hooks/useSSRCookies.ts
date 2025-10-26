import { CookiesContext } from "@/providers/CookiesProvider";
import { assert } from "@/utils/assert";
import { useContext } from "react";

export function useSSRCookies() {
  const context = useContext(CookiesContext);

  assert(context, "use <CookiesProvider> to access CookiesContext");

  return context.ssrCookies;
}
