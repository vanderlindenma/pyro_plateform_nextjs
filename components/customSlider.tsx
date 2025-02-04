"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const match_thumb_adjust = (index, max_index) => {
  const mid_point = max_index / 2;
  return (-8 * (index - mid_point)) / mid_point;
};

const CustomSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary/20">
      <SliderPrimitive.Range className="absolute h-full bg-secondary" />
    </SliderPrimitive.Track>

    {Array.from({ length: props.max + 1 }).map((_, index) => (
      <div
        key={index}
        style={{
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          left: `calc(${(index / props.max) * 100}% + ${match_thumb_adjust(
            index,
            props.max
          )}px)`,
        }}
        className={`text-xs text-gray-400 rounded-full flex flex-col justify-center items-center bg-white border h-4 w-4`}
      >
        {index + 1}
      </div>
    ))}

    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
CustomSlider.displayName = SliderPrimitive.Root.displayName;

export { CustomSlider as CustomSlider };
