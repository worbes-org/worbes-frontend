"use client";

import { useSSRCookies } from "@/hooks/useSSRCookies";
import { safelyGet } from "@/utils/misc";
import cookies from "js-cookie";
import { isFunction } from "lodash-es";
import {
  type SetStateAction,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

type Listener = () => void;
type CleanUpFn = () => void;

type Store<TValue> = {
  subscribe: (callback: Listener) => CleanUpFn;
  get: () => TValue;
  set: (value: TValue) => void;
};

const StoreMap: Record<string, Store<any>> = {};

function getOrCreateStore<TValue>(key: string, defaultValue: TValue) {
  if (!StoreMap[key]) {
    const listenerSet = new Set<Listener>();

    let cachedSerialized = JSON.stringify(defaultValue);
    let cachedValue = defaultValue;

    StoreMap[key] = {
      subscribe: (callback: Listener) => {
        listenerSet.add(callback);
        return () => listenerSet.delete(callback);
      },
      get: () => {
        const serialized = cookies.get(key);
        if (!serialized) {
          return defaultValue;
        }

        if (serialized === cachedSerialized) {
          return cachedValue;
        }

        const value =
          safelyGet<TValue>(() => JSON.parse(serialized)) ?? defaultValue;
        cachedSerialized = serialized;
        cachedValue = value;

        return value;
      },
      set: (value: TValue) => {
        const serialized = JSON.stringify(value);
        cookies.set(key, serialized);
        listenerSet.forEach((listener) => listener());
      },
    };
  }

  return StoreMap[key];
}

const useCookieState = <TValue>(key: string, defaultValue: TValue) => {
  const ssrCookieList = useSSRCookies();

  const initialValue = useMemo(() => {
    const ssrCookie = ssrCookieList.find((cookie) => cookie.name === key);
    const parsed = safelyGet<TValue>(() => JSON.parse(ssrCookie?.value ?? ""));
    return parsed;
  }, [ssrCookieList, key]);

  const store = getOrCreateStore<TValue>(key, initialValue ?? defaultValue);

  const state = useSyncExternalStore<TValue>(
    store.subscribe,
    store.get,
    store.get,
  );
  const setState = useCallback(
    (action: SetStateAction<TValue>) => {
      const prev = store.get();
      const next = isFunction(action) ? action(prev) : action;
      store.set(next);
    },
    [store],
  );

  return [state, setState] as const;
};

export default useCookieState;
