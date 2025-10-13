"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "3D Character Work",
    description: "Stylized and realistic character designs for various projects.",
    header: <Skeleton />,
    icon: <div className="text-xl">👤</div>,
  },
  {
    title: "Environmental Design",
    description: "Immersive 3D environments and architectural visualizations.",
    header: <Skeleton />,
    icon: <div className="text-xl">🏛️</div>,
  },
  {
    title: "Abstract Compositions",
    description: "Experimental renders exploring form, light, and materials.",
    header: <Skeleton />,
    icon: <div className="text-xl">🎨</div>,
  },
  {
    title: "Studio Projects",
    description:
      "Featured work from Vult Studio including client and personal projects.",
    header: <Skeleton />,
    icon: <div className="text-xl">⚡</div>,
  },
  {
    title: "Technical Art",
    description: "Shader development, procedural generation, and pipeline tools.",
    header: <Skeleton />,
    icon: <div className="text-xl">🔧</div>,
  },
  {
    title: "Daily Renders",
    description: "Quick studies and experiments in 3D art and design.",
    header: <Skeleton />,
    icon: <div className="text-xl">✨</div>,
  },
  {
    title: "Animation & Motion",
    description: "Character animation, motion graphics, and dynamic simulations.",
    header: <Skeleton />,
    icon: <div className="text-xl">🎬</div>,
  },
];
