const TOKEN_KEY = "pattho_token";
const AUTH_EVENT = "pattho-auth";

function emitAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  emitAuthChange();
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  emitAuthChange();
}

export function subscribeAuth(onChange: () => void) {
  window.addEventListener(AUTH_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(AUTH_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function isSignedIn() {
  return Boolean(getToken());
}
