import type { Metadata } from "next";
import { BodyLesson } from "@/components/body/body-lesson";

export const metadata: Metadata = {
  title: "Human body · Pattho",
  description: "An interactive high-school biology lesson on the human body, in English and Bangla.",
};

export default function HumanBodyPage() {
  return <BodyLesson />;
}
