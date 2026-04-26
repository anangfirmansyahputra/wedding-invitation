"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-in" | "zoom-in";

const animationClasses: Record<AnimationType, { from: string; to: string }> = {
  "fade-up": { from: "opacity-0 translate-y-8", to: "opacity-100 translate-y-0" },
  "fade-down": { from: "opacity-0 -translate-y-8", to: "opacity-100 translate-y-0" },
  "fade-left": { from: "opacity-0 translate-x-8", to: "opacity-100 translate-x-0" },
  "fade-right": { from: "opacity-0 -translate-x-8", to: "opacity-100 translate-x-0" },
  "fade-in": { from: "opacity-0", to: "opacity-100" },
  "zoom-in": { from: "opacity-0 scale-95", to: "opacity-100 scale-100" },
};

// Animated text/content component
export function AnimatedText({
  children,
  className = "",
  delay = 0,
  animation = "fade-up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [delay, hasAnimated]);

  const animClass = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? animClass.to : animClass.from
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} id={id} className={className}>
      {children}
    </div>
  );
}

// Parallax Background Component - separate layer for parallax effect
export function ParallaxBackground({
  children,
  speed = 0.3,
  className = "",
  disableOnScroll = false,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  disableOnScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const isHoveringWishes = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && !isHoveringWishes.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const relativeScroll = scrolled - elementTop;
        setOffset(relativeScroll * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  // Handle wishes hover detection for disabling parallax
  useEffect(() => {
    if (!disableOnScroll) return;

    const handleMouseEnter = () => {
      isHoveringWishes.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringWishes.current = false;
    };

    // Use event delegation to handle wishes scroll element
    const addListeners = () => {
      const wishesElements = document.querySelectorAll(".wishes-scroll");
      wishesElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    // Try immediately
    addListeners();

    // Also try after a delay in case element is not mounted yet
    const timeoutId = setTimeout(addListeners, 100);

    // Use MutationObserver to watch for new elements
    const observer = new MutationObserver(() => {
      addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      const wishesElements = document.querySelectorAll(".wishes-scroll");
      wishesElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [disableOnScroll]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
}
