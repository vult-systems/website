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
    <div className="flex flex-col gap-3 w-full px-4 sm:px-0">
      <div className="flex flex-col">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-gray-600 dark:text-gray-400 leading-tight break-words">
          Welcome to my workspace for all things
        </div>
        <div key={currentIndex} className="h-[2rem] sm:h-[2.5rem] md:h-[3rem] lg:h-[3.5rem] xl:h-[4rem] flex items-start max-w-full mt-2">
          <TextGenerateEffect
            words={items[currentIndex].phrase}
            duration={0.6}
            filter={true}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 dark:text-gray-200"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6 sm:mt-8">
        <img
          src="/images/logo.svg"
          alt="Carlos Garcia Logo"
          className="w-6 h-6 sm:w-8 sm:h-8 dark:brightness-[.85]"
        />
        <a
          href={items[currentIndex].href}
          className="text-gray-600 dark:text-gray-400 hover:text-amber-400 transition-colors text-sm tracking-wide"
        >
          {items[currentIndex].link} ›
        </a>
      </div>
    </div>
  );
}