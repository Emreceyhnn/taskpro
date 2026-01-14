// authMiddleware.ts
import { refreshToken } from "./auth";

/* -------------------------------------------------------------------------- */
/*                                   STATE                                    */
/* -------------------------------------------------------------------------- */

let intervalId: number | null = null;
let isChecking = false;

let isHistoryPatched = false;
let originalPushState: History["pushState"] | null = null;
let originalReplaceState: History["replaceState"] | null = null;

/* -------------------------------------------------------------------------- */
/*                                   PATHS                                    */
/* -------------------------------------------------------------------------- */

const isProtectedPath = (path: string) =>
  path === "/dashboard" || path.startsWith("/dashboard/");

const isAuthPage = (path: string) =>
  path === "/" || path === "/auth/sign-in" || path === "/auth/sign-up";

/* -------------------------------------------------------------------------- */
/*                                 REDIRECTS                                  */
/* -------------------------------------------------------------------------- */

const redirectToLanding = () => {
  if (window.location.pathname !== "/") window.location.replace("/");
};

const redirectToDashboard = () => {
  if (!window.location.pathname.startsWith("/dashboard")) {
    window.location.replace("/dashboard");
  }
};

/* -------------------------------------------------------------------------- */
/*                              ROUTE CHANGE HOOK                             */
/* -------------------------------------------------------------------------- */

const emitLocationChange = () => {
  window.dispatchEvent(new Event("locationchange"));
};

const patchHistoryOnce = () => {
  if (isHistoryPatched) return;

  originalPushState = history.pushState;
  originalReplaceState = history.replaceState;

  history.pushState = function (this: History, ...args) {
    originalPushState!.apply(this, args);
    emitLocationChange();
  } as History["pushState"];

  history.replaceState = function (this: History, ...args) {
    originalReplaceState!.apply(this, args);
    emitLocationChange();
  } as History["replaceState"];

  window.addEventListener("popstate", emitLocationChange, { passive: true });

  isHistoryPatched = true;
};

const unpatchHistory = () => {
  if (!isHistoryPatched) return;

  if (originalPushState) history.pushState = originalPushState;
  if (originalReplaceState) history.replaceState = originalReplaceState;

  window.removeEventListener("popstate", emitLocationChange);

  originalPushState = null;
  originalReplaceState = null;
  isHistoryPatched = false;
};

/* -------------------------------------------------------------------------- */
/*                                AUTH CHECK                                  */
/* -------------------------------------------------------------------------- */

let isLoggedIn: boolean | null = null;

const checkAuth = async () => {
  const path = window.location.pathname;

  if (isChecking) return;
  isChecking = true;

  // 🔥 AUTH STATE HENÜZ BİLİNMİYORSA → 1 KERE REFRESH DENE
  if (isLoggedIn === null) {
    try {
      await refreshToken();
      isLoggedIn = true;
    } catch {
      isLoggedIn = false;
    }
  }

  // 🔒 LOGIN VAR → auth sayfaları yasak
  if (isLoggedIn && isAuthPage(path)) {
    redirectToDashboard();
    isChecking = false;
    return;
  }

  // 🔓 LOGIN YOK → protected sayfalar yasak
  if (!isLoggedIn && isProtectedPath(path)) {
    redirectToLanding();
    isChecking = false;
    return;
  }

  isChecking = false;
};

/* -------------------------------------------------------------------------- */
/*                              EVENT HANDLERS                                */
/* -------------------------------------------------------------------------- */

const onFocusCheck = () => void checkAuth();

const onVisibilityCheck = () => {
  if (document.visibilityState === "visible") void checkAuth();
};

const onLocationChange = () => void checkAuth();

/* -------------------------------------------------------------------------- */
/*                              PUBLIC API                                    */
/* -------------------------------------------------------------------------- */

export const startAuthMiddleware = () => {
  if (intervalId !== null) return;

  patchHistoryOnce();

  // Route değişiminde anında kontrol
  window.addEventListener("locationchange", onLocationChange, {
    passive: true,
  });

  // İlk açılış
  void checkAuth();

  // Periyodik kontrol
  intervalId = window.setInterval(() => void checkAuth(), 60_000);

  // Tab focus / visibility
  window.addEventListener("focus", onFocusCheck, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityCheck, {
    passive: true,
  });
};

export const stopAuthMiddleware = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }

  window.removeEventListener("locationchange", onLocationChange);
  window.removeEventListener("focus", onFocusCheck);
  document.removeEventListener("visibilitychange", onVisibilityCheck);

  unpatchHistory();
};
