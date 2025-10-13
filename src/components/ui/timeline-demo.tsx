"use client";
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2022-Present",
      content: (
        <div>
          <p className="mb-2 text-sm font-bold text-neutral-900 md:text-base dark:text-white">
            University of the Incarnate Word
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>Instructor & Academic Services Coordinator - Character Modeling</strong>
          </p>
          <div className="mb-6">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Designed courses in Character Modeling and Environments Art aligned with industry standards
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Recruited, interviewed, and onboarded additional modeling faculty
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Served as Faculty Advisor and student mentorship coordinator
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              • Designed, created, and instructed modeling concentration courses
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-2 text-sm font-bold text-neutral-900 md:text-base dark:text-white">
            343 Industries (Contract)
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>3D Character Modeling</strong>
          </p>
          <div className="mb-6">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Worked with Character Art Lead and Character artists to create believable sci-fi armors
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Created armor sets for Season 5 & 6 "Cyber Showdown" operation
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Developed Halo Character Core variation assets utilizing 343's internal Create Set workflow
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop"
              alt="character modeling"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop"
              alt="game assets"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <p className="mb-2 text-sm font-bold text-neutral-900 md:text-base dark:text-white">
            BioWare (Contract)
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>Lead Character Artist - Star Wars: The Old Republic</strong>
          </p>
          <div className="mb-6">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Worked with team lead and Lucasarts to push the Modernization efforts for 3D Character Art
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Created Platinum Armor Sets for the Modernization Team
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Converted Legacy Character Assets to SWTOR character specifications
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              • Directed internal character team to maintain new practices and onboarded junior artist
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2018-2022",
      content: (
        <div>
          <p className="mb-2 text-sm font-bold text-neutral-900 md:text-base dark:text-white">
            Qualcomm (Contract)
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>Lead Character Artist - Character Supervisor</strong>
          </p>
          <div className="mb-6">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Clients include: Warner Bros, BBC, International Outource Studios, National Advertising Agencies
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Worked with International Character team to maintain Snapdragon IP: Corbin, Cong, Blade of Alanla
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Developed internal Cinematic/Marketing/Real-time character pipelines
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              • Created and Optimized 3D characters for runtime on various platforms and devices
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop"
              alt="commercial work"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop"
              alt="character development"
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div>
          <p className="mb-2 text-sm font-bold text-neutral-900 md:text-base dark:text-white">
            University of the Incarnate Word
          </p>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>MGD in Game Environment Arts</strong> (2023 - Present)
          </p>
          <p className="mb-6 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            <strong>BFA in 3D Animation and Game Design</strong> (2013 - 2017)
          </p>
          <div className="mb-6">
            <p className="mb-2 text-sm font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
              <strong>Academic Experience:</strong>
            </p>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300 mb-1">
              • Class Creatives, Inc - Vice President and Instructor (2019-2021)
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              • Kajaani University, Finland - Part-time Instructor (2019-2020)
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
