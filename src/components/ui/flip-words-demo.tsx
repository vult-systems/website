import React from "react";
import { TextGenerateEffect } from "./text-generate-effect";

export default function FlipWordsDemo() {
  const items = [
    { phrase: "digital artwork & exploration", link: "ART", href: "/art" },
    { phrase: "technical solutions & tools", link: "CODE", href: "/code" },
    { phrase: "educational resources", link: "LEARN", href: "/learn" },
    { phrase: "thoughts & documentation", link: "LOG", href: "/log" },
    { phrase: "studio practice & projects", link: "VULT", href: "/vult" }
  ];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % items.length);
    }, 6000); // Total duration for each phrase

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-gray-400 leading-tight break-words md:break-normal">
          Welcome to my workspace for all things
        </h1>
        <div key={currentIndex} className="min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] flex items-start w-full mt-2">
          <TextGenerateEffect
            words={items[currentIndex].phrase}
            duration={0.6}
            filter={true}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm tracking-wide pt-2">
        <a
          href={items[currentIndex].href}
          className="text-gray-400 hover:text-amber-400 transition-colors"
        >
          {items[currentIndex].link} ›
        </a>
      </div>
    </div>
  );
}