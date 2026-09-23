import Link from "next/link";

const topics = [
  { href: "/learn/body", id: "body", en: "Human body", bn: "মানবদেহ" },
  { href: "/learn/cell", id: "cell", en: "Plant cell", bn: "উদ্ভিদকোষ" },
] as const;

export function TopicNav({ current }: { current: "body" | "cell" }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Biology topics">
      {topics.map((topic) => {
        const active = topic.id === current;
        return (
          <Link
            key={topic.id}
            href={topic.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm ${
              active ? "bg-accent text-accent-foreground" : "border border-line bg-card hover:bg-background"
            }`}
          >
            {topic.en}
            <span className={`ml-2 [font-family:var(--font-bengali)] ${active ? "text-accent-foreground/80" : "text-muted"}`}>
              {topic.bn}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
