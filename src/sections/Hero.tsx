import React, { useEffect, useRef } from 'react';
import { getHeroData } from '../utils/dataLoader';
import {
  typewriterAnimation,
  staggerAnimation,
  animateElement,
  createAdaptiveAnimation,
  createTimeline,
  animateCounter
} from '../utils/animations';

const Hero: React.FC = () => {
  const data = getHeroData();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasAnimated.current) return;
    
    const initAnimations = () => {
      hasAnimated.current = true;

      // Create main timeline
      const timeline = createTimeline();

      // Initial state - hide all elements
      if (containerRef.current) {
        createAdaptiveAnimation(containerRef.current, {
          opacity: 0,
          translateY: 50,
          duration: 0
        });
      }

      // Timeline sequence
      timeline
        // Fade in container
        .add({
          targets: containerRef.current,
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 800,
          easing: 'easeOutCubic'
        })
        // Animate title text (without name)
        .add({
          targets: titleRef.current,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: 'easeOutCubic'
        }, '-=400')
        // Typewriter effect for name
        .add({
          targets: nameRef.current,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 400,
          easing: 'easeOutBack'
        }, '-=200');

      // Typewriter effect for name after initial animation - ONLY ONCE
      setTimeout(() => {
        if (nameRef.current && !nameRef.current.dataset.typewriterDone) {
          nameRef.current.textContent = '';
          nameRef.current.dataset.typewriterDone = 'true';
          typewriterAnimation(nameRef.current, data.personal.name, 1500);
        }
      }, 1200);

      // Animate description with delay
      setTimeout(() => {
        if (descriptionRef.current) {
          createAdaptiveAnimation(descriptionRef.current, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutCubic'
          });
        }
      }, 2000);

      // Animate metrics with counters
      setTimeout(() => {
        if (metricsRef.current) {
          const metricElements = metricsRef.current.querySelectorAll('[data-metric-index]');
          staggerAnimation(metricElements, {
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutBack'
          }, 150);

          // Start counter animations for each metric
          data.metrics.forEach((metric, index) => {
            setTimeout(() => {
              const counterElement = metricsRef.current?.querySelector(`[data-metric-index="${index}"] [data-counter-target]`) as HTMLElement;
              if (counterElement && !counterElement.dataset.counterDone) {
                counterElement.dataset.counterDone = 'true';
                animateCounter(counterElement, metric.value, 2000, metric.suffix);
              }
            }, metric.animationDelay);
          });
        }
      }, 2800);

      // Stagger button animations
      setTimeout(() => {
        if (buttonsRef.current) {
          const buttons = buttonsRef.current.querySelectorAll('a');
          staggerAnimation(buttons, {
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.9, 1],
            duration: 600,
            easing: 'easeOutBack'
          }, 200);
        }
      }, 3200);
    };

    // Start animations after component mount
    const timer = setTimeout(initAnimations, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run only once

  // Add hover animations to buttons
  useEffect(() => {
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('a');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          animateElement(button, {
            scale: 1.05,
            translateY: -2,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });

        button.addEventListener('mouseleave', () => {
          animateElement(button, {
            scale: 1,
            translateY: 0,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });
      });
    }
  }, []);

  return (
    <section id="hero" className={`min-h-screen flex items-center justify-center relative overflow-hidden ${data.styling.backgroundClass}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-primary-300 rounded-full opacity-15 animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-primary-400 rounded-full opacity-10 animate-float-slow"></div>
      </div>

      <div className="container-custom text-center relative z-10" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span ref={titleRef} className="inline-block">
              {data.content.title}{' '}
            </span>
            <span
              ref={nameRef}
              className="gradient-text-animated inline-block min-w-[200px] text-left"
              style={{ minHeight: '1.2em' }}
            >
              {data.personal.name}
            </span>
          </h1>
          <p
            ref={descriptionRef}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto opacity-0"
          >
            {data.content.description}
          </p>

          {/* Performance Metrics */}
          <div
            ref={metricsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto"
          >
            {data.metrics.map((metric, index) => (
              <div key={index} className="text-center opacity-0" data-metric-index={index}>
                <div
                  className="text-3xl md:text-4xl font-bold text-primary-600 mb-2"
                  data-counter-target={metric.value}
                  data-counter-suffix={metric.suffix}
                >
                  0{metric.suffix}
                </div>
                <div className="text-sm text-gray-600 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {data.actions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`
                  ${action.type === 'primary' ? 'btn-primary' : 'btn-secondary'}
                  ${action.glow ? 'btn-glow' : ''}
                  opacity-0 transform transition-all duration-300
                `}
                style={{ willChange: 'transform' }}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;