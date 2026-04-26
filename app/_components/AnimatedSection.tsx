"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedSection({
  id,
  children,
  className = "",
  delay = 0,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px"
      },
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [delay]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && isVisible) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const speed = 0.15;
        setScrollY(scrolled * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`transition-all duration-[1500ms] ease-out ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-24 scale-95"
      } ${className}`}
      style={{
        transform: isVisible ? `translateY(${scrollY * 0.05}px)` : undefined,
      }}
    >
      {children}
    </div>
  );
}
