import type { Metadata } from "next";
import { CellLesson } from "@/components/cell/cell-lesson";

export const metadata: Metadata = {
  title: "Plant cell · Pattho",
  description: "An interactive high-school lesson on the plant cell, in English and Bangla.",
};

export default function PlantCellPage() {
  return <CellLesson />;
}
