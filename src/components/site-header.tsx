"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { clearToken, isSignedIn, subscribeAuth } from "@/lib/auth-storage";

export function SiteHeader() {
  const router = useRouter();
  const signedIn = useSyncExternalStore(subscribeAuth, isSignedIn, () => false);

  function signOut() {
    clearToken();
    router.push("/");
  }

  return (
    <header className="border-b border-line bg-card/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Pattho
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm">
          <Link href="/learn/body" className="rounded-full px-4 py-2 hover:bg-background">
            Human body
          </Link>
          <Link href="/learn/cell" className="rounded-full px-4 py-2 hover:bg-background">
            Plant cell
          </Link>
          {signedIn ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-foreground hover:bg-background"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="rounded-full border border-line px-4 py-2 hover:bg-background"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full px-4 py-2 hover:bg-background">
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-accent px-4 py-2 text-accent-foreground"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
