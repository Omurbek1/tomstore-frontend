const ACTIVE_CATALOG_KEY_STORAGE_KEY = "tomstore:catalog:active";
const PENDING_CATALOG_RESTORE_STORAGE_KEY = "tomstore:catalog:pending-restore";
const CATALOG_SCROLL_STORAGE_KEY_PREFIX = "tomstore:catalog:scroll:";

type CatalogScrollSnapshot = {
  scrollY: number;
  updatedAt: number;
};

const canUseSessionStorage = () =>
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

const getCatalogScrollStorageKey = (restoreKey: string) =>
  `${CATALOG_SCROLL_STORAGE_KEY_PREFIX}${restoreKey}`;

export const setActiveCatalogRestoreKey = (restoreKey: string) => {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(ACTIVE_CATALOG_KEY_STORAGE_KEY, restoreKey);
  } catch {}
};

export const clearActiveCatalogRestoreKey = (restoreKey?: string) => {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    const activeRestoreKey = window.sessionStorage.getItem(
      ACTIVE_CATALOG_KEY_STORAGE_KEY,
    );

    if (!restoreKey || activeRestoreKey === restoreKey) {
      window.sessionStorage.removeItem(ACTIVE_CATALOG_KEY_STORAGE_KEY);
    }
  } catch {}
};

export const markPendingCatalogRestore = () => {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    const activeRestoreKey = window.sessionStorage.getItem(
      ACTIVE_CATALOG_KEY_STORAGE_KEY,
    );

    if (activeRestoreKey) {
      window.sessionStorage.setItem(
        PENDING_CATALOG_RESTORE_STORAGE_KEY,
        activeRestoreKey,
      );
    }
  } catch {}
};

export const hasPendingCatalogRestore = (restoreKey: string) => {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    return (
      window.sessionStorage.getItem(PENDING_CATALOG_RESTORE_STORAGE_KEY) ===
      restoreKey
    );
  } catch {
    return false;
  }
};

export const clearPendingCatalogRestore = (restoreKey?: string) => {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    const pendingRestoreKey = window.sessionStorage.getItem(
      PENDING_CATALOG_RESTORE_STORAGE_KEY,
    );

    if (!restoreKey || pendingRestoreKey === restoreKey) {
      window.sessionStorage.removeItem(PENDING_CATALOG_RESTORE_STORAGE_KEY);
    }
  } catch {}
};

export const saveCatalogScrollSnapshot = (
  restoreKey: string,
  scrollY: number,
) => {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    const snapshot: CatalogScrollSnapshot = {
      scrollY,
      updatedAt: Date.now(),
    };

    window.sessionStorage.setItem(
      getCatalogScrollStorageKey(restoreKey),
      JSON.stringify(snapshot),
    );
  } catch {}
};

export const readCatalogScrollSnapshot = (restoreKey: string) => {
  if (!canUseSessionStorage()) {
    return undefined;
  }

  try {
    const rawSnapshot = window.sessionStorage.getItem(
      getCatalogScrollStorageKey(restoreKey),
    );

    if (!rawSnapshot) {
      return undefined;
    }

    const parsedSnapshot = JSON.parse(rawSnapshot) as CatalogScrollSnapshot;

    if (
      typeof parsedSnapshot?.scrollY !== "number" ||
      Number.isNaN(parsedSnapshot.scrollY)
    ) {
      return undefined;
    }

    return parsedSnapshot;
  } catch {
    return undefined;
  }
};
