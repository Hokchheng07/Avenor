"use client";

// Adapted from Lightswind UI. Copyright (c) 2025 Muhilan (codewithMUHILAN), MIT License.

import React, { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Custom container className */
  containerClassName?: string;
  /** Custom text className */
  textClassName?: string;
  /** Enable blur animation effect */
  enableBlur?: boolean;
  /** Base opacity when text is out of view */
  baseOpacity?: number;
  /** Animation delay between words in seconds */
  staggerDelay?: number;
  /** Viewport threshold for triggering animation */
  threshold?: number;
  /** Text size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  /** Text alignment */
  align?: "left" | "center" | "right";
  /** Color variant */
  variant?: "default" | "muted" | "accent" | "primary";
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
};

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = false,
  baseOpacity = 0.1,
  staggerDelay = 0.045,
  threshold = 0.35,
  size = "lg",
  align = "left",
  variant = "default",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    amount: threshold,
    once: true,
  });

  // Split text into words and spaces, ensuring each part is an object
  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((part, index) => {
      return {
        value: part,
        isSpace: part.match(/^\s+$/) && part.length > 0,
        originalIndex: index,
      };
    }).filter((item) => item.value.length > 0);
  }, [children]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur && !reduceMotion ? "blur(3px)" : "blur(0px)",
      transform: reduceMotion ? "translateY(0)" : "translateY(18px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transform: "translateY(0)",
      transition: {
        duration: reduceMotion ? 0.2 : 0.55,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("transform-gpu", containerClassName)}
    >
      <motion.p
        className={cn(
          "leading-relaxed font-semibold",
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          textClassName
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {splitText.map((item) => (
          item.isSpace ? (
            <span key={`space-${item.originalIndex}`}>{item.value}</span>
          ) : (
            <motion.span
              key={`word-${item.originalIndex}`}
              className="inline-block"
              variants={wordVariants}
            >
              {item.value}
            </motion.span>
          )
        ))}
      </motion.p>
    </motion.div>
  );
}

export default ScrollReveal;
