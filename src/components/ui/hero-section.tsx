import React from "react";
import FlipWordsDemo from "./flip-words-demo";
import DirectionAwareHoverDemo from "./direction-aware-hover-demo";

export function HeroSection() {
  return (
    <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-8 sm:py-12 lg:py-4">
      {/* Left Panel */}
      <div className="flex flex-col justify-center w-full">
        <div className="w-full">
          <FlipWordsDemo />
        </div>
      </div>
      {/* Right Panel */}
      <div className="w-full">
        <DirectionAwareHoverDemo />
      </div>
    </div>
  );
}