"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { findPart, findSystem, partsFor, type SystemId } from "@/data/anatomy";
import { TopicNav } from "@/components/learn/topic-nav";

const BodyCanvas = dynamic(
  () => import("@/components/body/body-canvas").then((mod) => mod.BodyCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-muted">Preparing the model…</div>
    ),
  },
);

export function BodyLesson() {
  const [system, setSystem] = useState<SystemId>("organs");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [viewKey, setViewKey] = useState(0);

  const current = findSystem(system);
  const part = selected ? findPart(selected) : null;
  const list = partsFor(system);

  function chooseSystem(next: SystemId) {
    setSystem(next);
    setHovered(null);
    setSelected((currentId) => {
      if (!currentId) return null;
      const currentPart = findPart(currentId);
      return currentPart?.systems.includes(next) ? currentId : null;
    });
  }

  function openPart(id: string, nextSystem?: SystemId) {
    if (nextSystem) setSystem(nextSystem);
    setSelected(id);
    setHovered(null);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Biology</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Human body</h1>
          <p className="mt-1 text-lg text-muted [font-family:var(--font-bengali)]">মানবদেহ</p>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Drag to turn. Scroll to zoom. Click a part.
          <span className="mt-1 block [font-family:var(--font-bengali)]">
            ঘোরাতে টানুন। জুম করতে স্ক্রল করুন। অংশে ক্লিক করুন।
          </span>
        </p>
      </header>

      <TopicNav current="body" />

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Body systems">
        {(["organs", "skeleton", "muscles", "circulation"] as const).map((id) => {
          const item = findSystem(id);
          const active = id === system;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => chooseSystem(id)}
              className={`rounded-full px-4 py-2 text-left ${
                active ? "bg-foreground text-background" : "border border-line bg-card hover:bg-background"
              }`}
            >
              <span className="block text-sm font-medium">{item.nameEn}</span>
              <span
                className={`block text-xs [font-family:var(--font-bengali)] ${
                  active ? "text-background/75" : "text-muted"
                }`}
              >
                {item.nameBn}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-3">
          <div className="relative h-[68vh] min-h-[480px] overflow-hidden rounded-2xl border border-line bg-[#d5cec2]">
            <BodyCanvas
              key={`${viewKey}-${system}`}
              system={system}
              selected={selected}
              hovered={hovered}
              onSelect={setSelected}
              onHover={setHovered}
            />
            <button
              type="button"
              onClick={() => setViewKey((value) => value + 1)}
              className="absolute top-3 right-3 rounded-full border border-[#1c1915]/15 bg-[#fffdf8]/90 px-3 py-1.5 text-xs"
            >
              Reset view
            </button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {list.map((item) => {
              const active = item.id === selected;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => openPart(item.id)}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`rounded-xl px-3 py-2 text-left ${
                      active ? "bg-foreground text-background" : "border border-line bg-card"
                    }`}
                  >
                    <span className="block text-sm">{item.nameEn}</span>
                    <span
                      className={`block text-xs [font-family:var(--font-bengali)] ${
                        active ? "text-background/75" : "text-muted"
                      }`}
                    >
                      {item.nameBn}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-xs leading-5 text-muted">
            Models: Z-Anatomy (
            <a className="underline" href="https://sketchfab.com/Z-Anatomy" target="_blank" rel="noreferrer">
              Sketchfab
            </a>
            ), adapted from{" "}
            <a className="underline" href="https://lifesciencedb.jp/bp3d/" target="_blank" rel="noreferrer">
              BodyParts3D
            </a>{" "}
            by The Database Center for Life Science.{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">
              CC BY-SA 4.0
            </a>
            . Credit the authors. Share adaptations under the same license.
            <span className="mt-1 block [font-family:var(--font-bengali)]">
              মডেল: Z-Anatomy, BodyParts3D থেকে অভিযোজিত, CC BY-SA 4.0। লেখকের নাম উল্লেখ করতে হবে।
            </span>
          </p>
        </div>

        <aside className="rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-4">
          {part ? (
            <article className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-accent">
                  {current.nameEn}
                  <span className="ml-2 [font-family:var(--font-bengali)] normal-case tracking-normal">
                    {current.nameBn}
                  </span>
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{part.nameEn}</h2>
                <p className="text-lg [font-family:var(--font-bengali)]">{part.nameBn}</p>
              </div>
              <Section labelEn="Function" labelBn="কাজ" en={part.functionEn} bn={part.functionBn} />
              <Section labelEn="Works with" labelBn="যার সঙ্গে কাজ করে" en={part.togetherEn} bn={part.togetherBn} />
              {part.notes.length > 0 ? (
                <div className="space-y-3 border-t border-line pt-4">
                  <h3 className="text-xs uppercase tracking-[0.14em] text-muted">
                    Notes <span className="[font-family:var(--font-bengali)] normal-case tracking-normal">নোট</span>
                  </h3>
                  <ul className="space-y-3">
                    {part.notes.map((note) => (
                      <li key={note.en} className="text-sm leading-6">
                        <p>{note.en}</p>
                        <p className="mt-1 text-muted [font-family:var(--font-bengali)]">{note.bn}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {part.links.length > 0 ? (
                <div className="border-t border-line pt-4">
                  <h3 className="text-xs uppercase tracking-[0.14em] text-muted">
                    Open a connected part
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {part.links.map((link) => {
                      const target = findPart(link.id);
                      if (!target) return null;
                      return (
                        <button
                          key={`${link.system}-${link.id}`}
                          type="button"
                          onClick={() => openPart(link.id, link.system)}
                          className="rounded-full border border-line px-3 py-1.5 text-left text-sm hover:bg-background"
                        >
                          {target.nameEn}
                          <span className="ml-1 text-xs text-muted [font-family:var(--font-bengali)]">
                            {target.nameBn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </article>
          ) : (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.14em] text-accent">
                {current.nameEn}
                <span className="ml-2 [font-family:var(--font-bengali)] normal-case tracking-normal">
                  {current.nameBn}
                </span>
              </p>
              <h2 className="text-xl font-semibold tracking-tight">Choose a part</h2>
              <p className="text-sm leading-6">{current.summaryEn}</p>
              <p className="text-sm leading-7 text-muted [font-family:var(--font-bengali)]">{current.summaryBn}</p>
              {system === "circulation" ? (
                <ul className="space-y-2 border-t border-line pt-4 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#9d2e32]" />
                    Arteries leave the heart
                    <span className="text-muted [font-family:var(--font-bengali)]">ধমনী</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3c527c]" />
                    Veins return blood
                    <span className="text-muted [font-family:var(--font-bengali)]">শিরা</span>
                  </li>
                </ul>
              ) : null}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function Section({ labelEn, labelBn, en, bn }: { labelEn: string; labelBn: string; en: string; bn: string }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs uppercase tracking-[0.14em] text-muted">
        {labelEn} <span className="[font-family:var(--font-bengali)] normal-case tracking-normal">{labelBn}</span>
      </h3>
      <p className="text-sm leading-6">{en}</p>
      <p className="text-sm leading-7 text-muted [font-family:var(--font-bengali)]">{bn}</p>
    </section>
  );
}
