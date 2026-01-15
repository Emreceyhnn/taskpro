/* -------------------------------------------------------------------------- */
/*                              AUTH MIDDLEWARE                               */
/* -------------------------------------------------------------------------- */
/*  Bu middleware:
    - SADECE route guard yapar
    - accessToken VAR/YOK kontrolü yapar
    - redirect yönetir
    - refresh token / backend / async İÇERMEZ
*/
/* -------------------------------------------------------------------------- */

import { getAccessToken } from "../lib/token";

/* -------------------------------------------------------------------------- */
/*                                   STATE                                    */
/* -------------------------------------------------------------------------- */

let isStarted = false;

/* history patch için */
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
  if (window.location.pathname !== "/") {
    window.location.replace("/");
  }
};

const redirectToDashboard = () => {
  if (!window.location.pathname.startsWith("/dashboard")) {
    window.location.replace("/dashboard");
  }
};

/* -------------------------------------------------------------------------- */
/*                              AUTH CHECK (SYNC)                             */
/* -------------------------------------------------------------------------- */

const checkAuth = () => {
  const path = window.location.pathname;
  const hasToken = Boolean(getAccessToken());

  /* 🔒 Login VAR → auth sayfaları yasak */
  if (hasToken && isAuthPage(path)) {
    redirectToDashboard();
    return;
  }

  /* 🔓 Login YOK → protected sayfalar yasak */
  if (!hasToken && isProtectedPath(path)) {
    redirectToLanding();
    return;
  }
};

/* -------------------------------------------------------------------------- */
/*                         ROUTE CHANGE DETECTION                              */
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
/*                              EVENT HANDLERS                                */
/* -------------------------------------------------------------------------- */

const onLocationChange = () => {
  checkAuth();
};

const onFocusCheck = () => {
  checkAuth();
};

const onVisibilityCheck = () => {
  if (document.visibilityState === "visible") {
    checkAuth();
  }
};

/* -------------------------------------------------------------------------- */
/*                              PUBLIC API                                    */
/* -------------------------------------------------------------------------- */

export const startAuthMiddleware = () => {
  if (isStarted) return;
  isStarted = true;

  patchHistoryOnce();

  /* route change */
  window.addEventListener("locationchange", onLocationChange, {
    passive: true,
  });

  /* tab focus / visibility */
  window.addEventListener("focus", onFocusCheck, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityCheck, {
    passive: true,
  });

  /* ilk kontrol */
  checkAuth();
};

export const stopAuthMiddleware = () => {
  if (!isStarted) return;
  isStarted = false;

  window.removeEventListener("locationchange", onLocationChange);
  window.removeEventListener("focus", onFocusCheck);
  document.removeEventListener("visibilitychange", onVisibilityCheck);

  unpatchHistory();
};
