"use client";

// Adapted from Lightswind UI. Copyright (c) 2025 Muhilan (codewithMUHILAN), MIT License.

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { cn } from "@/lib/utils";

interface TextScrollMarqueeProps {
  children: ReactNode;
  baseVelocity: number;
  className?: string;
  scrollDependent?: boolean;
  delay?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export default function TextScrollMarquee({
  children,
  baseVelocity = 1,
  className,
  scrollDependent = false,
  delay = 0,
  direction = "left",
  pauseOnHover = true,
}: TextScrollMarqueeProps) {
  const reduceMotion = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
    clamp: false,
  });

  // ✅ Use modular wrap from -100% to 0% for seamless loop
  const x = useTransform(baseX, (v) => `${wrap(-100, 0, v % 100)}%`);

  const directionFactor = useRef<number>(direction === "left" ? 1 : -1);
  const hasStarted = useRef(false);
  const isPaused = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      hasStarted.current = true;
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    directionFactor.current = direction === "left" ? 1 : -1;
  }, [direction]);

  useAnimationFrame((_, delta) => {
    if (!hasStarted.current || isPaused.current || reduceMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (scrollDependent) {
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      aria-hidden="true"
      className="flex overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      onMouseEnter={() => {
        if (pauseOnHover) isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
    >
      <motion.div
        className="flex shrink-0 flex-nowrap gap-3 whitespace-nowrap pr-3"
        style={{ x: reduceMotion ? "0%" : x }}
      >
        {[...Array(4)].map((_, index) => (
          <span key={index} className={cn("block", className)}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
