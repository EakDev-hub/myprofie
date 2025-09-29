import React, { useEffect, useRef } from 'react';
import { getExperienceData } from '../utils/dataLoader';
import {
  createScrollAnimation,
  staggerAnimation,
  animateElement,
  createTimeline
} from '../utils/animations';

const Experience: React.FC = () => {
  const data = getExperienceData();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !timelineRef.current) return;

    // Animate title
    const titleObserver = createScrollAnimation(
      [titleRef.current],
      {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutCubic'
      },
      { threshold: 0.3 }
    );

    // Animate timeline and experience cards
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate timeline line first
          const timelineLine = timelineRef.current?.querySelector('.timeline-line');
          if (timelineLine) {
            animateElement(timelineLine, {
              height: ['0%', '100%'],
              duration: 2000,
              easing: 'easeOutCubic'
            });
          }

          // Animate experience cards with stagger
          const experienceCards = timelineRef.current?.querySelectorAll('.experience-card');
          if (experienceCards) {
            staggerAnimation(experienceCards, {
              opacity: [0, 1],
              translateX: [-50, 0],
              scale: [0.9, 1],
              duration: 800,
              easing: 'easeOutBack'
            }, 300);
          }

          // Animate timeline dots
          setTimeout(() => {
            const timelineDots = timelineRef.current?.querySelectorAll('.timeline-dot');
            if (timelineDots) {
              staggerAnimation(timelineDots, {
                scale: [0, 1],
                rotate: [180, 0],
                duration: 600,
                easing: 'easeOutBack'
              }, 300);
            }
          }, 500);

          timelineObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    timelineObserver.observe(timelineRef.current);

    return () => {
      titleObserver?.disconnect();
      timelineObserver?.disconnect();
    };
  }, [data.experiences]);

  // Add hover effects to experience cards
  useEffect(() => {
    experienceRefs.current.forEach((ref) => {
      if (ref) {
        ref.addEventListener('mouseenter', () => {
          animateElement(ref, {
            translateX: 10,
            scale: 1.02,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });

        ref.addEventListener('mouseleave', () => {
          animateElement(ref, {
            translateX: 0,
            scale: 1,
            duration: 300,
            easing: 'easeOutCubic'
          });
        });
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`section-padding ${data.section.backgroundColor} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-l from-primary-100 to-transparent rounded-full opacity-30 translate-x-36"></div>
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-gradient-to-r from-primary-50 to-transparent rounded-full opacity-40 -translate-x-24"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center opacity-0"
          >
            {data.section.title}
          </h2>
          
          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-600 opacity-30">
              <div className="timeline-line w-full bg-gradient-to-b from-primary-500 to-primary-700 h-0"></div>
            </div>
            
            <div className="space-y-12">
              {data.experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start group">
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-6 w-4 h-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full shadow-lg transform scale-0 group-hover:scale-125 transition-transform duration-300 z-10">
                    <div className="absolute inset-0 bg-white rounded-full transform scale-50"></div>
                  </div>
                  
                  {/* Experience card */}
                  <div
                    ref={(el) => experienceRefs.current[index] = el}
                    className="experience-card ml-12 card p-8 card-hover opacity-0 transform will-change-transform w-full"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div className="mb-2 lg:mb-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary-700 transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <h4 className="text-lg text-primary-600 font-semibold">
                          {exp.company}
                        </h4>
                      </div>
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full">
                        <svg className="w-4 h-4 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-primary-700 font-medium text-sm">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    {/* Achievement indicator */}
                    <div className="mt-6 flex items-center text-sm text-primary-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="font-medium">
                        {index === 0 ? 'Current Role' :
                         index === 1 ? 'Previous Role' :
                         'Earlier Experience'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Career summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A progressive career journey showcasing continuous growth, learning, and increasing responsibilities in modern web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;