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

const ImageHeader = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[16rem] rounded-lg overflow-hidden">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
    />
  </div>
);

export function FeaturesSection() {
  const features: Feature[] = [
    {
      title: "Art",
      description: "3D renders, character work, and experimental compositions exploring form, light, and storytelling.",
      icon: <div className="text-xl">🎨</div>,
      href: "/art",
      header: <ImageHeader src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop" alt="Art Work" />,
    },
    {
      title: "Code",
      description: "Pipeline tools, technical art solutions, and software built to bridge creativity and efficiency.",
      icon: <div className="text-xl">💻</div>,
      href: "/code",
      header: <ImageHeader src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop" alt="Code Work" />,
    },
    {
      title: "Learn",
      description: "Tutorials, courses, and resources for artists navigating 3D workflows and creative development.",
      icon: <div className="text-xl">📚</div>,
      href: "/learn",
      header: <ImageHeader src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop" alt="Learn Work" />,
    },
    {
      title: "Log",
      description: "Reflections on process, technique, and the evolving practice of making meaningful work.",
      icon: <div className="text-xl">📝</div>,
      href: "/log",
      header: <ImageHeader src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&h=600&fit=crop" alt="Log Work" />,
    },
    {
      title: "Vult",
      description: "Studio work, client projects, and collaborative endeavors pushing creative boundaries.",
      icon: <div className="text-xl">⚡</div>,
      href: "/vult",
      header: <ImageHeader src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&h=600&fit=crop" alt="Vult Studio Work" />,
    }
  ];

  return (
    <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20 overflow-hidden">
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

        {/* Horizontal Scrolling Features */}
        <div className="relative">
          <div className="flex gap-6 animate-scroll">
            {[...features, ...features, ...features].map((feature, i) => (
              <a 
                key={i} 
                href={feature.href} 
                className="flex-shrink-0 w-[350px] sm:w-[400px] group/bento"
              >
                <div className="shadow-input flex flex-col justify-between space-y-2 rounded-lg border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-zinc-950/50 dark:shadow-none h-full">
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
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
