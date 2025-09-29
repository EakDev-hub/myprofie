import React, { useEffect, useRef } from 'react';
import { getAboutData } from '../utils/dataLoader';
import {
  createScrollAnimation,
  staggerAnimation,
  animateElement
} from '../utils/animations';

const About: React.FC = () => {
  const data = getAboutData();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !descriptionRef.current || !servicesGridRef.current) return;

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

    // Animate description
    const descriptionObserver = createScrollAnimation(
      [descriptionRef.current],
      {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        easing: 'easeOutCubic'
      },
      { threshold: 0.3 }
    );

    // Animate service cards with stagger
    const serviceCards = servicesGridRef.current.querySelectorAll('.service-card');
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          staggerAnimation(serviceCards, {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            rotateY: [10, 0],
            duration: 800,
            easing: 'easeOutBack'
          }, 200);

          // Add individual hover animations after initial animation
          setTimeout(() => {
            serviceCards.forEach((card) => {
              const iconContainer = card.querySelector('.service-icon');
              
              card.addEventListener('mouseenter', () => {
                animateElement(card, {
                  translateY: -8,
                  scale: 1.03,
                  duration: 300,
                  easing: 'easeOutCubic'
                });
                
                if (iconContainer) {
                  animateElement(iconContainer, {
                    scale: 1.1,
                    rotate: '5deg',
                    duration: 300,
                    easing: 'easeOutBack'
                  });
                }
              });

              card.addEventListener('mouseleave', () => {
                animateElement(card, {
                  translateY: 0,
                  scale: 1,
                  duration: 300,
                  easing: 'easeOutCubic'
                });
                
                if (iconContainer) {
                  animateElement(iconContainer, {
                    scale: 1,
                    rotate: '0deg',
                    duration: 300,
                    easing: 'easeOutBack'
                  });
                }
              });
            });
          }, 1000);

          servicesObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    servicesObserver.observe(servicesGridRef.current);

    return () => {
      titleObserver?.disconnect();
      descriptionObserver?.disconnect();
      servicesObserver?.disconnect();
    };
  }, [data.services]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section-padding ${data.section.backgroundColor} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full opacity-50 -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-100 rounded-full opacity-30 translate-y-24 -translate-x-24"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 opacity-0"
          >
            {data.section.title}
          </h2>
          <p
            ref={descriptionRef}
            className="text-lg text-gray-600 mb-8 leading-relaxed opacity-0"
          >
            {data.content.description}
          </p>
          <div
            ref={servicesGridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {data.services.map((service, index) => (
              <div
                key={index}
                className="service-card card p-8 text-center card-hover opacity-0 transform will-change-transform cursor-pointer group"
              >
                <div className="service-icon w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <svg
                    className="w-8 h-8 text-primary-600 transition-colors duration-300 group-hover:text-primary-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox={service.icon.viewBox}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={service.icon.path}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Decorative line */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;