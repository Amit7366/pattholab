export type Role = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  role: Role;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export function can(user: User | null, permission: string) {
  if (!user) return false;
  const permissions = user.role?.permissions ?? [];
  return permissions.includes("*") || permissions.includes(permission);
}
