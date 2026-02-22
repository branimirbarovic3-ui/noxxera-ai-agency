import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal Hook
 * Implements Intersection Observer for scroll-triggered animations
 * Based on UI/UX Pro Max Motion-Driven principles
 */
export const useScrollReveal = (options: any = {}) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Optionally unobserve after reveal
                    if (options.once !== false) {
                        observer.unobserve(element);
                    }
                } else if (options.once === false) {
                    setIsVisible(false);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options.threshold, options.rootMargin, options.once]);

    return { ref, isVisible };
};

/**
 * useParallax Hook
 * Creates parallax scrolling effect
 */
export const useParallax = (speed = 0.5) => {
    const ref = useRef<HTMLElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * speed;
            setOffset(rate);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return { ref, offset };
};

/**
 * useHoverEffect Hook
 * Manages hover state with smooth transitions
 */
export const useHoverEffect = () => {
    const [isHovered, setIsHovered] = useState(false);

    const hoverProps = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return { isHovered, hoverProps };
};
