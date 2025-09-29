import anime from 'animejs';

// Default animation configurations
export const defaultAnimations = {
  fadeIn: {
    duration: 800,
    easing: 'easeOutCubic',
    opacity: [0, 1],
  },
  fadeInUp: {
    duration: 800,
    easing: 'easeOutCubic',
    opacity: [0, 1],
    translateY: [30, 0],
  },
  fadeInDown: {
    duration: 800,
    easing: 'easeOutCubic',
    opacity: [0, 1],
    translateY: [-30, 0],
  },
  slideInLeft: {
    duration: 800,
    easing: 'easeOutCubic',
    opacity: [0, 1],
    translateX: [-50, 0],
  },
  slideInRight: {
    duration: 800,
    easing: 'easeOutCubic',
    opacity: [0, 1],
    translateX: [50, 0],
  },
  scaleIn: {
    duration: 600,
    easing: 'easeOutBack',
    opacity: [0, 1],
    scale: [0.8, 1],
  },
  bounceIn: {
    duration: 1000,
    easing: 'easeOutBounce',
    opacity: [0, 1],
    scale: [0.3, 1],
  },
};

// Animation utility functions
export const animateElement = (
  target: string | Element | NodeList,
  animation: Partial<anime.AnimeParams> = {}
): anime.AnimeInstance => {
  return anime({
    targets: target,
    ...animation,
  });
};

// Stagger animation for multiple elements
export const staggerAnimation = (
  targets: string | Element | NodeList,
  baseAnimation: Partial<anime.AnimeParams> = {},
  staggerDelay: number = 100
): anime.AnimeInstance => {
  return anime({
    targets,
    ...baseAnimation,
    delay: anime.stagger(staggerDelay),
  });
};

// Progress bar animation
export const animateProgressBar = (
  target: string | Element,
  percentage: number,
  duration: number = 2000
): anime.AnimeInstance => {
  return anime({
    targets: target,
    width: `${percentage}%`,
    duration,
    easing: 'easeOutCubic',
  });
};

// Counter animation
export const animateCounter = (
  target: string | Element,
  endValue: number,
  duration: number = 2000,
  suffix: string = ''
): anime.AnimeInstance => {
  const obj = { count: 0 };
  
  return anime({
    targets: obj,
    count: endValue,
    duration,
    easing: 'easeOutCubic',
    round: 1,
    update: () => {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        element.textContent = Math.round(obj.count) + suffix;
      }
    },
  });
};

// Typewriter effect
export const typewriterAnimation = (
  target: string | Element,
  text: string,
  duration: number = 3000
): anime.AnimeInstance => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return anime({});
  
  element.textContent = '';
  
  return anime({
    targets: { progress: 0 },
    progress: text.length,
    duration,
    easing: 'linear',
    round: 1,
    update: (anim) => {
      const progress = Math.round((anim.animatables[0].target as any).progress);
      element.textContent = text.substring(0, progress);
    },
  });
};

// Hover animations
export const createHoverAnimation = (
  element: Element,
  hoverConfig: Partial<anime.AnimeParams> = {},
  leaveConfig: Partial<anime.AnimeParams> = {}
) => {
  const defaultHover = {
    scale: 1.05,
    duration: 300,
    easing: 'easeOutCubic',
  };
  
  const defaultLeave = {
    scale: 1,
    duration: 300,
    easing: 'easeOutCubic',
  };
  
  element.addEventListener('mouseenter', () => {
    anime({
      targets: element,
      ...defaultHover,
      ...hoverConfig,
    });
  });
  
  element.addEventListener('mouseleave', () => {
    anime({
      targets: element,
      ...defaultLeave,
      ...leaveConfig,
    });
  });
};

// Timeline animations
export const createTimeline = (): anime.AnimeTimelineInstance => {
  return anime.timeline({
    easing: 'easeOutCubic',
    duration: 800,
  });
};

// Scroll-triggered animations
export const createScrollAnimation = (
  elements: NodeListOf<Element> | Element[],
  animationConfig: Partial<anime.AnimeParams> = defaultAnimations.fadeInUp,
  observerConfig: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        anime({
          targets: entry.target,
          ...animationConfig,
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerConfig);
  
  elements.forEach((element) => {
    // Set initial state
    anime.set(element, {
      opacity: 0,
      translateY: animationConfig.translateY ? animationConfig.translateY[0] : 0,
      translateX: animationConfig.translateX ? animationConfig.translateX[0] : 0,
      scale: animationConfig.scale ? animationConfig.scale[0] : 1,
    });
    
    observer.observe(element);
  });
  
  return observer;
};

// Loading animations
export const showLoadingAnimation = (target: string | Element): anime.AnimeInstance => {
  return anime({
    targets: target,
    rotate: '1turn',
    duration: 1000,
    loop: true,
    easing: 'linear',
  });
};

export const hideLoadingAnimation = (target: string | Element): anime.AnimeInstance => {
  return anime({
    targets: target,
    opacity: 0,
    scale: 0,
    duration: 300,
    easing: 'easeOutCubic',
  });
};

// Page transition animations
export const pageTransition = {
  enter: (target: string | Element): anime.AnimeInstance => {
    return anime({
      targets: target,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutCubic',
    });
  },
  
  exit: (target: string | Element): anime.AnimeInstance => {
    return anime({
      targets: target,
      opacity: [1, 0],
      translateY: [0, -20],
      duration: 400,
      easing: 'easeInCubic',
    });
  },
};

// Utility to check if reduced motion is preferred
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Adaptive animation that respects user preferences
export const createAdaptiveAnimation = (
  target: string | Element | NodeList,
  animationConfig: Partial<anime.AnimeParams>
): anime.AnimeInstance | null => {
  if (prefersReducedMotion()) {
    // Apply instant changes without animation
    anime.set(target, {
      opacity: animationConfig.opacity ? animationConfig.opacity[1] || 1 : 1,
      translateX: 0,
      translateY: 0,
      scale: 1,
    });
    return null;
  }
  
  return anime({
    targets: target,
    ...animationConfig,
  });
};