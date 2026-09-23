"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";
import { can, type Role, type User } from "@/lib/types";

const workspaces: Record<string, { title: string; detail: string }> = {
  super_admin: {
    title: "Platform control",
    detail: "Add future roles here, then assign them when you create accounts.",
  },
  admin: {
    title: "Operations",
    detail: "Create advertiser, teacher, and student accounts for the platform.",
  },
  advertiser: {
    title: "Campaigns",
    detail: "Campaign tools will live in this workspace.",
  },
  teacher: {
    title: "Classes",
    detail: "Preview the human body lesson your students use.",
  },
  student: {
    title: "Learning",
    detail: "Start with the human body: organs, skeleton, muscles, and circulation.",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/login");
      return;
    }

    let active = true;

    async function load() {
      try {
        const profile = await api<{ user: User }>("/auth/me");
        if (!active) return;
        setUser(profile.user);

        const requests: Promise<void>[] = [];
        if (can(profile.user, "users:read")) {
          requests.push(
            api<{ users: User[] }>("/users").then((userList) => {
              if (active) setUsers(userList.users);
            }),
          );
        }
        if (can(profile.user, "roles:read")) {
          requests.push(
            api<{ roles: Role[] }>("/roles").then((roleList) => {
              if (active) setRoles(roleList.roles);
            }),
          );
        }
        await Promise.all(requests);
      } catch (caught) {
        if (!active) return;
        setError(caught instanceof Error ? caught.message : "Could not load dashboard");
        if (!getToken()) router.replace("/login");
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [router]);

  async function refreshLists(current: User) {
    await Promise.all([
      can(current, "users:read")
        ? api<{ users: User[] }>("/users").then((userList) => setUsers(userList.users))
        : Promise.resolve(),
      can(current, "roles:read")
        ? api<{ roles: Role[] }>("/roles").then((roleList) => setRoles(roleList.roles))
        : Promise.resolve(),
    ]);
  }

  async function createUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    try {
      await api("/users", {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
          roleSlug: String(form.get("roleSlug") ?? ""),
        }),
      });
      event.currentTarget.reset();
      setNotice("User created");
      await refreshLists(user);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create user");
    }
  }

  async function createRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    setError("");
    setNotice("");
    const form = new FormData(event.currentTarget);
    const permissions = String(form.get("permissions") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    try {
      await api("/roles", {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          slug: String(form.get("slug") ?? ""),
          description: String(form.get("description") ?? ""),
          permissions,
        }),
      });
      event.currentTarget.reset();
      setNotice("Role created");
      await refreshLists(user);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not create role");
    }
  }

  if (loading) {
    return <main className="px-6 py-16 text-sm text-muted">Loading your workspace...</main>;
  }

  if (!user) {
    return <main className="px-6 py-16 text-sm text-danger">{error || "Sign in required"}</main>;
  }

  const workspace = workspaces[user.role.slug] ?? {
    title: user.role.name,
    detail: user.role.description,
  };
  const assignableRoles = roles.filter((role) => {
    if (can(user, "*") || user.role.permissions.includes("*")) return true;
    return role.slug !== "super_admin" && role.slug !== "admin" && !role.permissions.includes("*");
  });

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-accent">{user.role.name}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{user.name}</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
        </div>
        <span className="rounded-full border border-line bg-card px-3 py-1 text-xs uppercase tracking-wide">
          {user.status}
        </span>
      </section>

      <section className="rounded-3xl border border-line bg-card p-6">
        <h2 className="text-xl font-semibold">{workspace.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{workspace.detail}</p>
        <p className="mt-4 font-mono text-xs text-muted">
          Permissions: {user.role.permissions.join(", ")}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/learn/body"
            className="inline-flex rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground"
          >
            Human body
          </Link>
          <Link
            href="/learn/cell"
            className="inline-flex rounded-full border border-line px-4 py-2 text-sm"
          >
            Plant cell
          </Link>
        </div>
      </section>

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {notice ? <p className="text-sm text-accent">{notice}</p> : null}

      {can(user, "users:write") ? (
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={createUser} className="space-y-4 rounded-3xl border border-line bg-card p-6">
            <h2 className="text-lg font-semibold">Create user</h2>
            <Field name="name" label="Name" />
            <Field name="email" label="Email" type="email" />
            <Field name="password" label="Password" type="password" />
            <label className="block space-y-2 text-sm">
              <span>Role</span>
              <select
                name="roleSlug"
                required
                className="w-full rounded-xl border border-line bg-background px-3 py-2"
              >
                {assignableRoles.map((role) => (
                  <option key={role._id} value={role.slug}>
                    {role.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground">
              Create user
            </button>
          </form>
          <UserTable users={users} />
        </section>
      ) : null}

      {can(user, "roles:write") ? (
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={createRole} className="space-y-4 rounded-3xl border border-line bg-card p-6">
            <h2 className="text-lg font-semibold">Add a role</h2>
            <p className="text-sm text-muted">
              Use a new slug such as <span className="font-mono">moderator</span> and permissions
              such as <span className="font-mono">reports:read</span>.
            </p>
            <Field name="name" label="Name" />
            <Field name="slug" label="Slug" />
            <Field name="description" label="Description" />
            <Field name="permissions" label="Permissions (comma separated)" />
            <button type="submit" className="rounded-full bg-accent px-4 py-2 text-sm text-accent-foreground">
              Save role
            </button>
          </form>
          <RoleTable roles={roles} />
        </section>
      ) : null}
    </main>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <label className="block space-y-2 text-sm">
      <span>{label}</span>
      <input
        required={name !== "description"}
        name={name}
        type={type}
        className="w-full rounded-xl border border-line bg-background px-3 py-2 outline-none focus:border-accent"
      />
    </label>
  );
}

function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className="border-b border-line px-6 py-4">
        <h2 className="text-lg font-semibold">People</h2>
      </div>
      <ul className="divide-y divide-line">
        {users.map((person) => (
          <li key={person._id} className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
            <div>
              <p className="font-medium">{person.name}</p>
              <p className="text-muted">{person.email}</p>
            </div>
            <span className="rounded-full bg-background px-3 py-1 text-xs">{person.role?.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleTable({ roles }: { roles: Role[] }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-card">
      <div className="border-b border-line px-6 py-4">
        <h2 className="text-lg font-semibold">Roles</h2>
      </div>
      <ul className="divide-y divide-line">
        {roles.map((role) => (
          <li key={role._id} className="px-6 py-4 text-sm">
            <p className="font-medium">
              {role.name} <span className="font-mono text-xs text-muted">{role.slug}</span>
            </p>
            <p className="mt-1 text-muted">{role.permissions.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
