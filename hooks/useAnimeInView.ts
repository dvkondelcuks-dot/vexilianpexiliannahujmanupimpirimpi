"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Animator<T extends HTMLElement> = (node: T) => void;

export function useAnimeInView<T extends HTMLElement>(animator: Animator<T>, threshold = 0.52) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const stableAnimator = useCallback(animator, [animator]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => stableAnimator(node), 180);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, stableAnimator, threshold]);

  return ref;
}