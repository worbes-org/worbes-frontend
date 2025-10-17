import { routing } from "@/i18n/routing";
import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(req: NextRequest) {
  const response = handleI18nRouting(req);

  return response;
}

export const config = {
  matcher: ["/((?!api|auth|contents|itemfi|_next|graphql|.*\\..*).*)"],
};
