import { cn } from "@/lib/utils";
import React from "react";

export default function DotBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-white dark:bg-zinc-950">
      <div
        className={cn(
          "absolute inset-0 opacity-40",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
    </div>
  );
}