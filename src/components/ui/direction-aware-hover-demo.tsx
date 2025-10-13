"use client";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export default function DirectionAwareHoverDemo() {
  const imageUrl = "/profile.jpg"; // Using your profile image from the pixelated demo
  return (
    <div className="flex flex-col gap-8 max-w-full">
      <div className="h-full w-full relative flex items-center justify-center">
        <DirectionAwareHover 
          imageUrl={imageUrl}
          className="h-[300px] w-[400px] sm:h-[350px] sm:w-[450px] md:h-[400px] md:w-[500px]"
          imageClassName="grayscale hover:grayscale-0 transition-all duration-300"
        >
          <div className="flex flex-col gap-2">
            <p className="font-clarendon text-xl sm:text-2xl tracking-wide text-amber-400">Carlos Garcia</p>
            <p className="font-normal text-sm sm:text-base text-gray-200">3D Artist & Educator</p>
          </div>
        </DirectionAwareHover>
      </div>
      <div className="flex flex-col gap-3 w-[400px] sm:w-[450px] md:w-[500px]">
        <div className="text-lg sm:text-xl font-normal text-white">
          Creating at the intersection of art and technology
        </div>
        <p className="text-gray-400 text-sm sm:text-base space-y-2">
          I'm a 3D artist and educator based in San Antonio, working across digital art, pipeline development, and creative instruction. 
          I believe in bridging theory and practice - helping artists build with intention.
        </p>
        <a href="/about" className="text-sm tracking-wide text-gray-400 hover:text-amber-400 transition-colors mt-2">
          ABOUT ME ›
        </a>
      </div>
    </div>
  );
}