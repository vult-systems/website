"use client";
import React from "react";
import { PinContainer } from "./3d-pin";

export default function AnimatedPinDemo() {
  return (
    <div className="h-[30rem] md:h-[35rem] lg:h-[40rem] w-full flex items-center justify-center">
      <PinContainer title="Carlos Garcia" href="/about">
        <div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[18rem] sm:w-[20rem] md:w-[24rem] h-[18rem] sm:h-[20rem] md:h-[24rem]">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-white">
            Shaping art, tools, and learning systems
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-gray-400">
              I'm a 3D artist and educator based in San Antonio, working across digital sculpture, pipeline development, and creative instruction. I focus on connecting the making, the method, and the mindset - helping artists build with intention.
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-r from-amber-500 to-amber-600 dark:bg-amber-400" />
        </div>
      </PinContainer>
    </div>
  );
}