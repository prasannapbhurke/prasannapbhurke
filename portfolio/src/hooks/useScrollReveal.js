import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attach this ref to any element to animate it in
 * when it enters the viewport using IntersectionObserver.
 *
 * Options:
 *   threshold  — 0..1, fraction visible before triggering (default 0.12)
 *   delay      — CSS delay in ms (default 0)
 *   direction  — 'up' | 'left' | 'right' | 'none' (default 'up')
 */
export default function useScrollReveal({
  threshold = 0.12,
  delay = 0,
  direction = 'up',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const translateMap = {
      up:    'translateY(36px)',
      left:  'translateX(-36px)',
      right: 'translateX(36px)',
      none:  'none',
    };

    // Set initial hidden state
    el.style.opacity = '0';
    el.style.transform = translateMap[direction] || translateMap.up;
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, direction]);

  return ref;
}
