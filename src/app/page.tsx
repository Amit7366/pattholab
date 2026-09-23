import Link from "next/link";

const roles = [
  {
    name: "Super admin",
    detail: "Owns roles, admins, and every future module.",
  },
  {
    name: "Admin",
    detail: "Creates accounts and runs day-to-day operations.",
  },
  {
    name: "Advertiser",
    detail: "Reserved for campaigns and placements.",
  },
  {
    name: "Teacher",
    detail: "Opens the same body lesson students study.",
  },
  {
    name: "Student",
    detail: "Turns the model and reads each part in English and Bangla.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="grid gap-10 md:grid-cols-[1.3fr_0.7fr] md:items-end">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            High-school biology
          </p>
          <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-balance">
            Turn the body. Click a part. Read what it does.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-muted">
            A 3D human body for organs, skeleton, muscles, and circulation. Every label is in
            English and Bangla.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/learn/body"
              className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
            >
              Open the human body
            </Link>
            <Link
              href="/learn/cell"
              className="rounded-full border border-line bg-card px-5 py-3 text-sm font-medium"
            >
              Open the plant cell
            </Link>
            <Link
              href="/register"
              className="rounded-full border border-line bg-card px-5 py-3 text-sm font-medium"
            >
              Join as a student
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-line bg-card p-6">
          <p className="text-sm text-muted">Four systems in one model</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between border-b border-line pb-3">
              <span>Organs</span>
              <span className="[font-family:var(--font-bengali)] text-muted">অঙ্গ</span>
            </li>
            <li className="flex items-center justify-between border-b border-line pb-3">
              <span>Skeleton</span>
              <span className="[font-family:var(--font-bengali)] text-muted">কঙ্কাল</span>
            </li>
            <li className="flex items-center justify-between border-b border-line pb-3">
              <span>Muscles</span>
              <span className="[font-family:var(--font-bengali)] text-muted">পেশি</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Circulation</span>
              <span className="[font-family:var(--font-bengali)] text-muted">সংবহন</span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {roles.map((role) => (
          <article key={role.name} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="font-semibold">{role.name}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{role.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
