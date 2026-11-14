"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";
const CHILDREN_SELECTOR = "[data-reveal-children]";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function supportsViewTimeline() {
  return (
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("animation-timeline: view()")
  );
}

function markRevealed(el: Element) {
  el.classList.add("is-revealed");
}

function prepareTargets(root: ParentNode = document) {
  const sections = root.querySelectorAll<HTMLElement>(
    "#main-content section, #footer",
  );

  sections.forEach((section, index) => {
    // Hero is already on screen — keep it visible without entrance delay.
    if (index === 0) return;
    if (!section.hasAttribute("data-reveal")) {
      section.setAttribute("data-reveal", "up");
    }

    const grids = section.querySelectorAll<HTMLElement>(
      ":scope > div.mx-auto > div.grid, :scope > div.mx-auto > div.mt-8, :scope > div.mx-auto > div.mt-10, :scope > div.mx-auto > div.mt-12, :scope > div > div.grid, :scope > div > div.mt-8, :scope > div > div.mt-10, :scope > div > div.mt-12",
    );
    grids.forEach((grid) => {
      if (grid.children.length < 2) return;
      if (!grid.hasAttribute("data-reveal-children")) {
        grid.setAttribute("data-reveal-children", "");
      }
    });
  });

  root.querySelectorAll<HTMLElement>(CHILDREN_SELECTOR).forEach((parent) => {
    Array.from(parent.children).forEach((child, index) => {
      if (!(child instanceof HTMLElement)) return;
      if (!child.hasAttribute("data-reveal")) {
        child.setAttribute("data-reveal", "up");
      }
      if (!child.style.getPropertyValue("--reveal-delay")) {
        child.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 70, 420)}ms`,
        );
      }
    });
  });
}

/**
 * Smooth scroll-in reveals for page sections and grids.
 * Uses CSS view() timelines when available; IntersectionObserver otherwise.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      if (prefersReducedMotion()) {
        prepareTargets();
        document
          .querySelectorAll(REVEAL_SELECTOR)
          .forEach((el) => markRevealed(el));
        return;
      }

      if (supportsViewTimeline()) {
        document.documentElement.classList.add("reveal-view-timeline");
        prepareTargets();
        return;
      }

      prepareTargets();
      io?.disconnect();

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      ).filter((el) => !el.classList.contains("is-revealed"));

      if (elements.length === 0) return;

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            markRevealed(entry.target);
            io?.unobserve(entry.target);
          }
        },
        {
          root: null,
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12,
        },
      );

      for (const el of elements) io.observe(el);
    };

    // Wait a frame so route content is in the DOM.
    const frame = window.requestAnimationFrame(setup);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
