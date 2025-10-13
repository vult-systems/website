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

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[16rem] rounded-xl overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
    />
  </div>
);

const items = [
  {
    title: "3D Character Work",
    description: "Stylized and realistic character designs for various projects.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop" alt="3D Character" />,
    icon: <div className="text-xl">👤</div>,
  },
  {
    title: "Environmental Design",
    description: "Immersive 3D environments and architectural visualizations.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop" alt="Environment" />,
    icon: <div className="text-xl">🏛️</div>,
  },
  {
    title: "Abstract Compositions",
    description: "Experimental renders exploring form, light, and materials.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop" alt="Abstract" />,
    icon: <div className="text-xl">🎨</div>,
  },
  {
    title: "Studio Projects",
    description:
      "Featured work from Vult Studio including client and personal projects.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&h=600&fit=crop" alt="Studio Work" />,
    icon: <div className="text-xl">⚡</div>,
  },
  {
    title: "Technical Art",
    description: "Shader development, procedural generation, and pipeline tools.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop" alt="Technical" />,
    icon: <div className="text-xl">🔧</div>,
  },
  {
    title: "Daily Renders",
    description: "Quick studies and experiments in 3D art and design.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&h=600&fit=crop" alt="Daily Render" />,
    icon: <div className="text-xl">✨</div>,
  },
  {
    title: "Animation & Motion",
    description: "Character animation, motion graphics, and dynamic simulations.",
    header: <ImageHeader src="https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=1600&h=600&fit=crop" alt="Animation" />,
    icon: <div className="text-xl">🎬</div>,
  },
];
