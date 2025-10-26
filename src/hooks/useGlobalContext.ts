import { GlobalContext } from "@/providers/GlobalProvider";
import { assert } from "@/utils/assert";
import { useContext } from "react";

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  assert(context, "use <GlobalProvider> to access GlobalContext");

  return context;
}
