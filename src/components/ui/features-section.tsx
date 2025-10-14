import React from "react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  header: React.ReactNode;
}

interface FeaturedArt {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  category: string;
}

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[16rem] rounded-lg overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
    />
  </div>
);

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    character: "🎭",
    environment: "🌄",
    "3d": "🎨",
    technical: "⚙️",
    experiment: "🧪",
  };
  return icons[category] || "🎨";
};

export function FeaturesSection({ featuredArt = [] }: { featuredArt?: FeaturedArt[] }) {
  const [isPaused, setIsPaused] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Convert featured art to features
  const features: Feature[] = featuredArt.map((art) => ({
    title: art.title,
    description: art.description,
    icon: <div className="text-xl">{getCategoryIcon(art.category)}</div>,
    href: `/art/${art.slug}`,
    header: <ImageHeader src={art.heroImage} alt={art.title} />,
  }));

  // If there are no featured items, render nothing (no example/static fallbacks)
  if (features.length === 0) return null;

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 3; // Divide by 3 since content is tripled
      scrollRef.current.scrollTo({
        left: index * window.innerWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000); // Resume after 3s
    }
  };

  const scrollPrev = () => {
    const newIndex = currentIndex === 0 ? features.length - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };

  const scrollNext = () => {
    const newIndex = currentIndex === features.length - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };

  return (
    <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-gray-800 dark:text-white mb-4">
            Recent Updates
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed">
            Latest posts and projects from across my practice — new renders, tools in development, tutorials, reflections, and studio work. Check back regularly to see what I'm currently exploring and building.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Features */}
      <div className="relative overflow-hidden">
        {/* Navigation Buttons */}
        {features.length > 0 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-amber-500 hover:text-white"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm shadow-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-amber-500 hover:text-white"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div 
          ref={scrollRef}
          className={`flex gap-6 ${!isPaused ? 'animate-scroll' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {(() => {
            // triple the features array for a seamless loop effect
            const tripled = [...features, ...features, ...features];
            return tripled.map((feature, i) => (
            <a 
              key={i} 
              href={feature.href} 
              className="flex-shrink-0 w-[350px] sm:w-[400px] group/bento shadow-input rounded-xl border border-transparent dark:border-white/[0.2] bg-white dark:bg-black p-4 transition duration-200 hover:shadow-xl dark:shadow-none"
            >
              <div className="flex flex-col justify-between space-y-4 h-full">
                {feature.header}
                <div className="transition duration-200 group-hover/bento:translate-x-2">
                  {feature.icon}
                  <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
                    {feature.title}
                  </div>
                  <div className="font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300">
                    {feature.description}
                  </div>
                </div>
              </div>
            </a>
            ));
          })()}
        </div>
      </div>

      {/* Build CSS in JS to avoid template literal interpolation inside JSX which can break some parsers */}
      <style>{(() => {
        const translatePct = (100 / 3).toFixed(6) + "%"; // -33.333333%
        return `@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-${translatePct}); } } .animate-scroll { animation: scroll 45s linear infinite; will-change: transform; }`;
      })()}</style>
    </section>
  );
}
