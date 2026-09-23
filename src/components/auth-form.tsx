"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { api } from "@/lib/api";
import { setToken } from "@/lib/auth-storage";

type Mode = "login" | "register";

type AuthResponse = {
  token: string;
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const body =
        mode === "login" ? { email, password } : { name, email, password };
      const data = await api<AuthResponse>(path, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setToken(data.token);
      router.push("/dashboard");
      router.refresh();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Something went wrong";
      setError(
        message === "Failed to fetch"
          ? "Cannot reach the API. Start MongoDB and the server, then try again."
          : message,
      );
    } finally {
      setPending(false);
    }
  }

  const title = mode === "login" ? "Sign in" : "Create a student account";
  const alternate =
    mode === "login"
      ? { href: "/register", label: "Need an account? Register" }
      : { href: "/login", label: "Already registered? Sign in" };

  return (
    <main className="mx-auto flex w-full max-w-md flex-col px-6 py-16">
      <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-card p-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm leading-6 text-muted">
            {mode === "register"
              ? "Public registration is for students. Other roles are created by an admin."
              : "Use the account email and password issued for your role."}
          </p>
        </div>

        {mode === "register" ? (
          <label className="block space-y-2 text-sm">
            <span>Name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-line bg-background px-3 py-2 outline-none focus:border-accent"
            />
          </label>
        ) : null}

        <label className="block space-y-2 text-sm">
          <span>Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-line bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span>Password</span>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-line bg-background px-3 py-2 outline-none focus:border-accent"
          />
        </label>

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-full bg-accent px-4 py-3 text-sm font-medium text-accent-foreground disabled:opacity-60"
        >
          {pending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
        </button>

        <Link href={alternate.href} className="block text-center text-sm text-accent">
          {alternate.label}
        </Link>
      </form>
    </main>
  );
}
