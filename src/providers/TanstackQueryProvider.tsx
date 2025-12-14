"use client";

import { A_MINUTE } from "@/constants/misc";
import { type Nullable } from "@/types/misc";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type FC, type PropsWithChildren } from "react";

let browserQueryClient: Nullable<QueryClient> = null;

const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );

  function getQueryClient() {
    if (isServer) {
      return makeQueryClient();
    }

    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }

    return browserQueryClient;
  }

  function makeQueryClient() {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: A_MINUTE,
        },
      },
    });
  }
};

export default TanstackQueryProvider;
