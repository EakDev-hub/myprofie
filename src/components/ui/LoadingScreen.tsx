import React, { useEffect, useRef } from 'react';
import { animateElement, createTimeline, staggerAnimation } from '../../utils/animations';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = createTimeline();
    
    // Initial setup
    if (containerRef.current) {
      animateElement(containerRef.current, {
        opacity: 1,
        duration: 0
      });
    }

    // Loading sequence
    timeline
      // Logo entrance
      .add({
        targets: logoRef.current,
        scale: [0, 1],
        rotate: [180, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutBack'
      })
      // Text fade in
      .add({
        targets: textRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutCubic'
      }, '-=400')
      // Progress bar appear
      .add({
        targets: progressBarRef.current,
        scaleX: [0, 1],
        duration: 400,
        easing: 'easeOutCubic'
      }, '-=200');

    // Progress bar fill animation
    setTimeout(() => {
      if (progressFillRef.current) {
        animateElement(progressFillRef.current, {
          width: ['0%', '100%'],
          duration: 2000,
          easing: 'easeOutCubic',
          complete: () => {
            // Exit animation
            setTimeout(() => {
              if (containerRef.current) {
                animateElement(containerRef.current, {
                  opacity: [1, 0],
                  scale: [1, 1.1],
                  duration: 600,
                  easing: 'easeInCubic',
                  complete: onComplete
                });
              }
            }, 500);
          }
        });
      }
    }, 1000);

    // Floating particles animation
    const particles = containerRef.current?.querySelectorAll('.particle');
    if (particles) {
      particles.forEach((particle, index) => {
        animateElement(particle, {
          translateY: [-20, 20],
          translateX: [-10, 10],
          scale: [0.8, 1.2],
          opacity: [0.3, 0.8],
          duration: 2000 + (index * 200),
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutSine'
        });
      });
    }

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center z-50 opacity-0"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full opacity-50"></div>
        <div className="particle absolute top-1/3 right-1/4 w-3 h-3 bg-primary-300 rounded-full opacity-40"></div>
        <div className="particle absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-500 rounded-full opacity-60"></div>
        <div className="particle absolute top-2/3 right-1/3 w-2 h-2 bg-primary-200 rounded-full opacity-30"></div>
        <div className="particle absolute bottom-1/3 right-1/4 w-1 h-1 bg-primary-600 rounded-full opacity-70"></div>
      </div>

      <div className="text-center">
        {/* Animated Logo */}
        <div 
          ref={logoRef}
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-xl opacity-0"
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Loading Text */}
        <div 
          ref={textRef}
          className="mb-8 opacity-0"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Portfolio</h2>
          <p className="text-gray-600">Preparing an amazing experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div 
            ref={progressBarRef}
            className="w-full h-2 bg-gray-200 rounded-full overflow-hidden transform scale-x-0"
          >
            <div 
              ref={progressFillRef}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full w-0"
            ></div>
          </div>
        </div>

        {/* Loading percentage (optional) */}
        <div className="mt-4">
          <span className="text-sm text-gray-500 font-medium">Please wait...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;