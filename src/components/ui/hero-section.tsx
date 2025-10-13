import React from "react";
import FlipWordsDemo from "./flip-words-demo";
import DirectionAwareHoverDemo from "./direction-aware-hover-demo";

export function HeroSection() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center min-h-screen py-8 sm:py-12 lg:py-4">
      {/* Left Panel */}
      <div className="flex flex-col justify-center w-full lg:px-0">
        <div className="w-full max-w-xl mx-auto lg:mx-0">
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