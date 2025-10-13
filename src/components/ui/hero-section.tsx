import React from "react";
import FlipWordsDemo from "./flip-words-demo";
import DirectionAwareHoverDemo from "./direction-aware-hover-demo";

export function HeroSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center min-h-[calc(100vh-5rem)] py-4 sm:py-8">
      {/* Left Panel */}
      <div className="flex flex-col justify-center w-full px-4 sm:px-6 lg:px-0">
        <div className="w-full max-w-xl lg:max-w-2xl">
          <FlipWordsDemo />
        </div>
      </div>
      {/* Right Panel */}
      <div className="flex items-center justify-center w-full">
        <DirectionAwareHoverDemo />
      </div>
    </div>
  );
}