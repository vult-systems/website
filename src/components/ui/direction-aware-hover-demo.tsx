"use client";

export default function DirectionAwareHoverDemo() {
  const imageUrl = "/profile.jpg";
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Profile Card */}
      <div className="w-full group/bento overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-200">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img 
            src={imageUrl}
            alt="Carlos Garcia"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 group-hover/bento:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
            <p className="font-clarendon text-lg sm:text-xl md:text-2xl tracking-wide text-amber-500">Carlos Garcia</p>
            <p className="font-normal text-xs sm:text-sm md:text-base text-gray-200">3D Artist & Educator</p>
          </div>
        </div>
      </div>
      
      {/* Text Content */}
      <div className="w-full space-y-3">
        <h2 className="text-base sm:text-lg md:text-xl font-normal text-gray-800 dark:text-white">
          Creating at the intersection of art and technology
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
          I'm a 3D artist and educator based in San Antonio, working across digital art, pipeline development, and creative instruction. 
          I believe in bridging theory and practice - helping artists build with intention.
        </p>
        <a href="/about" className="inline-block text-sm tracking-wide text-amber-500 hover:text-amber-600 transition-colors mt-2">
          ABOUT ME ›
        </a>
      </div>
    </div>
  );
}