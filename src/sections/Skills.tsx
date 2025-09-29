import React, { useEffect, useRef } from 'react';
import { getSkillsData } from '../utils/dataLoader';
import {
  createScrollAnimation,
  animateProgressBar,
  animateCounter,
  staggerAnimation
} from '../utils/animations';

const Skills: React.FC = () => {
  const data = getSkillsData();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !skillsGridRef.current) return;

    // Animate title on scroll
    const titleObserver = createScrollAnimation(
      [titleRef.current],
      {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 800,
        easing: 'easeOutCubic'
      },
      { threshold: 0.3 }
    );

    // Animate skill cards with stagger
    const skillCards = skillsGridRef.current.querySelectorAll('.skill-card');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger animation for skill cards
          staggerAnimation(skillCards, {
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 600,
            easing: 'easeOutBack'
          }, 150);

          // Animate progress bars and counters after cards appear
          setTimeout(() => {
            data.skills.forEach((skill, index) => {
              const skillCard = skillCards[index] as HTMLElement;
              if (skillCard) {
                const progressBar = skillCard.querySelector('.progress-bar') as HTMLElement;
                const counter = skillCard.querySelector('.skill-counter') as HTMLElement;
                
                if (progressBar) {
                  // Reset progress bar to 0 width
                  progressBar.style.width = '0%';
                  // Animate progress bar
                  setTimeout(() => {
                    animateProgressBar(progressBar, skill.level, 1500);
                  }, index * 200);
                }
                
                if (counter) {
                  // Animate counter
                  setTimeout(() => {
                    animateCounter(counter, skill.level, 1500, '%');
                  }, index * 200);
                }
              }
            });
          }, 500);

          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsGridRef.current);

    return () => {
      titleObserver?.disconnect();
      skillsObserver?.disconnect();
    };
  }, [data.skills]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`section-padding ${data.section.backgroundColor}`}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center opacity-0"
          >
            {data.section.title}
          </h2>
          <div
            ref={skillsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card card p-6 card-hover opacity-0 transform will-change-transform"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                  <span
                    className="skill-counter text-primary-600 font-bold text-xl"
                    data-target={skill.level}
                  >
                    0%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    className="progress-bar bg-gradient-to-r from-primary-500 to-primary-700 h-full rounded-full shadow-sm transition-all duration-300 ease-out relative"
                    style={{ width: '0%' }}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Skill level indicator */}
                <div className="mt-3 text-right">
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {skill.level >= 90 ? 'Expert' :
                     skill.level >= 75 ? 'Advanced' :
                     skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional visual elements */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continuously learning and improving these skills through hands-on projects and staying updated with the latest industry trends.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;