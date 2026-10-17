"use client";

import {
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "ara-wishlist-v1";
const EVENT = "ara-wishlist";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function readIds(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(EVENT));
}

export function useWishlist() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ids = useMemo(() => readIds(raw), [raw]);

  const isWishlisted = useCallback(
    (productId: string) => ids.includes(productId),
    [ids],
  );

  const toggle = useCallback((productId: string) => {
    const current = readIds(getSnapshot());
    if (current.includes(productId)) {
      writeIds(current.filter((id) => id !== productId));
    } else {
      writeIds([...current, productId]);
    }
  }, []);

  return { ids, isWishlisted, toggle, count: ids.length };
}
