"use client";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function DirectionAwareHoverDemo() {
  const imageUrl = "/profile.jpg"; // Using your profile image from the pixelated demo
  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-full w-full px-4 sm:px-0">
      <div className="h-full w-full relative flex items-center justify-center">
        <DirectionAwareHover 
          imageUrl={imageUrl}
          className="h-[250px] w-[320px] sm:h-[300px] sm:w-[400px] md:h-[400px] md:w-[500px]"
          imageClassName="grayscale hover:grayscale-0 transition-all duration-300"
        >
          <div className="flex flex-col gap-2">
            <p className="font-clarendon text-lg sm:text-xl md:text-2xl tracking-wide text-amber-400">Carlos Garcia</p>
            <p className="font-normal text-xs sm:text-sm md:text-base text-gray-200">3D Artist & Educator</p>
          </div>
        </DirectionAwareHover>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] mx-auto sm:mx-0">
        <div className="text-base sm:text-lg md:text-xl font-normal text-gray-800 dark:text-white">
          Creating at the intersection of art and technology
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base space-y-2">
          I'm a 3D artist and educator based in San Antonio, working across digital art, pipeline development, and creative instruction. 
          I believe in bridging theory and practice - helping artists build with intention.
        </p>
        <a href="/about" className="text-sm tracking-wide text-gray-600 dark:text-gray-400 hover:text-amber-400 transition-colors mt-2">
          ABOUT ME ›
        </a>
      </div>
    </div>
  );
}