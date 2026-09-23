"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { cellPartsFor, findCellGroup, findCellPart, type CellGroupId } from "@/data/plant-cell";
import { TopicNav } from "@/components/learn/topic-nav";

const CellCanvas = dynamic(() => import("@/components/cell/cell-canvas").then((mod) => mod.CellCanvas), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-muted">Preparing the cell…</div>
  ),
});

const groupOrder = ["all", "boundary", "nucleus", "organelles"] as const;

export function CellLesson() {
  const [group, setGroup] = useState<CellGroupId>("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [viewKey, setViewKey] = useState(0);

  const current = findCellGroup(group);
  const part = selected ? findCellPart(selected) : null;
  const list = cellPartsFor(group);

  function chooseGroup(next: CellGroupId) {
    setGroup(next);
    setHovered(null);
    setSelected((currentId) => {
      if (!currentId || next === "all") return currentId;
      const currentPart = findCellPart(currentId);
      return currentPart?.group === next ? currentId : null;
    });
  }

  function openPart(id: string, nextGroup?: CellGroupId) {
    if (nextGroup && nextGroup !== "all") setGroup(nextGroup);
    setSelected(id);
    setHovered(null);
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Biology</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Plant cell</h1>
          <p className="mt-1 text-lg text-muted [font-family:var(--font-bengali)]">উদ্ভিদকোষ</p>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted">
          Drag to turn. Scroll to zoom. Click an organelle.
          <span className="mt-1 block [font-family:var(--font-bengali)]">
            ঘোরাতে টানুন। জুম করতে স্ক্রল করুন। অঙ্গাণুতে ক্লিক করুন।
          </span>
        </p>
      </header>

      <TopicNav current="cell" />

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Cell regions">
        {groupOrder.map((id) => {
          const item = findCellGroup(id);
          const active = id === group;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => chooseGroup(id)}
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
          <div className="relative h-[68vh] min-h-[480px] overflow-hidden rounded-2xl border border-line bg-[#e4edd6]">
            <CellCanvas
              key={viewKey}
              group={group}
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
            Model: “Plant CELL” by{" "}
            <a className="underline" href="https://sketchfab.com/naratech" target="_blank" rel="noreferrer">
              NaraXR
            </a>{" "}
            on{" "}
            <a
              className="underline"
              href="https://sketchfab.com/3d-models/plant-cell-7fe3ac29756a45c6b678804a8da8a760"
              target="_blank"
              rel="noreferrer"
            >
              Sketchfab
            </a>
            ,{" "}
            <a className="underline" href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noreferrer">
              CC BY-NC 4.0
            </a>
            . Credit the author. Non-commercial use.
            <span className="mt-1 block [font-family:var(--font-bengali)]">
              মডেল: NaraXR-এর “Plant CELL”, Sketchfab, CC BY-NC 4.0। লেখকের নাম উল্লেখ করতে হবে। অবাণিজ্যিক ব্যবহার।
            </span>
          </p>
        </div>

        <aside className="rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-4">
          {part ? (
            <article className="space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-accent">
                  {findCellGroup(part.group).nameEn}
                  <span className="ml-2 [font-family:var(--font-bengali)] normal-case tracking-normal">
                    {findCellGroup(part.group).nameBn}
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
                  <h3 className="text-xs uppercase tracking-[0.14em] text-muted">Open a connected part</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {part.links.map((link) => {
                      const target = findCellPart(link.id);
                      if (!target) return null;
                      return (
                        <button
                          key={`${link.group}-${link.id}`}
                          type="button"
                          onClick={() => openPart(link.id, link.group)}
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
