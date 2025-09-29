import React, { useEffect, useRef } from 'react';
import { getProjectsData } from '../utils/dataLoader';
import {
  createScrollAnimation,
  staggerAnimation,
  animateElement
} from '../utils/animations';

const Projects: React.FC = () => {
  const data = getProjectsData();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !projectsGridRef.current) return;

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

    // Animate project cards with stagger
    const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
    const projectsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          staggerAnimation(projectCards, {
            opacity: [0, 1],
            translateY: [60, 0],
            rotateX: [10, 0],
            scale: [0.9, 1],
            duration: 800,
            easing: 'easeOutBack'
          }, 200);

          // Animate technology tags after cards appear
          setTimeout(() => {
            projectCards.forEach((card) => {
              const techTags = card.querySelectorAll('.tech-tag');
              if (techTags.length > 0) {
                staggerAnimation(techTags, {
                  opacity: [0, 1],
                  scale: [0, 1],
                  duration: 400,
                  easing: 'easeOutBack'
                }, 50);
              }
            });
          }, 600);

          projectsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    projectsObserver.observe(projectsGridRef.current);

    return () => {
      titleObserver?.disconnect();
      projectsObserver?.disconnect();
    };
  }, [data.projects]);

  // Add advanced hover effects to project cards
  useEffect(() => {
    projectRefs.current.forEach((ref) => {
      if (ref) {
        const image = ref.querySelector('.project-image') as HTMLElement;
        const overlay = ref.querySelector('.project-overlay') as HTMLElement;
        const links = ref.querySelectorAll('.project-link');

        ref.addEventListener('mouseenter', () => {
          // Card animation
          animateElement(ref, {
            translateY: -12,
            scale: 1.03,
            rotateX: -2,
            rotateY: 2,
            duration: 400,
            easing: 'easeOutCubic'
          });

          // Image zoom effect
          if (image) {
            animateElement(image, {
              scale: 1.1,
              duration: 600,
              easing: 'easeOutCubic'
            });
          }

          // Show overlay
          if (overlay) {
            animateElement(overlay, {
              opacity: [0, 1],
              duration: 300,
              easing: 'easeOutCubic'
            });
          }

          // Animate links
          if (links.length > 0) {
            staggerAnimation(links, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 300,
              easing: 'easeOutBack'
            }, 100);
          }
        });

        ref.addEventListener('mouseleave', () => {
          // Reset card
          animateElement(ref, {
            translateY: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            duration: 400,
            easing: 'easeOutCubic'
          });

          // Reset image
          if (image) {
            animateElement(image, {
              scale: 1,
              duration: 600,
              easing: 'easeOutCubic'
            });
          }

          // Hide overlay
          if (overlay) {
            animateElement(overlay, {
              opacity: [1, 0],
              duration: 200,
              easing: 'easeOutCubic'
            });
          }

          // Hide links
          if (links.length > 0) {
            animateElement(links, {
              opacity: [1, 0],
              translateY: [0, 20],
              duration: 200,
              easing: 'easeInCubic'
            });
          }
        });
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`section-padding ${data.section.backgroundColor} relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full opacity-20 -translate-y-48"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-primary-50 to-primary-100 rounded-full opacity-25 translate-y-32"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center opacity-0"
          >
            {data.section.title}
          </h2>
          
          <div
            ref={projectsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => projectRefs.current[index] = el}
                className="project-card card card-hover opacity-0 transform will-change-transform cursor-pointer group relative overflow-hidden"
                style={{ perspective: '1000px' }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-48 object-cover transition-transform duration-600"
                  />
                  
                  {/* Overlay for hover effects */}
                  <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 flex items-end justify-center p-4">
                    <div className="flex space-x-3">
                      <a
                        href={project.links.demo.url}
                        className="project-link px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-medium hover:bg-white transition-colors duration-200 opacity-0"
                      >
                        {project.links.demo.label}
                      </a>
                      <a
                        href={project.links.github.url}
                        className="project-link px-4 py-2 bg-gray-900/90 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 opacity-0"
                      >
                        {project.links.github.label}
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="project-content p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="tech-tag px-3 py-1 bg-gradient-to-r from-primary-100 to-primary-200 text-primary-700 text-sm rounded-full font-medium opacity-0 transform hover:scale-105 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Links (visible on desktop) */}
                  <div className="flex gap-4 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.links.demo.url}
                      className="text-primary-600 hover:text-primary-700 font-medium flex items-center transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {project.links.demo.label}
                    </a>
                    <a
                      href={project.links.github.url}
                      className="text-gray-600 hover:text-gray-700 font-medium flex items-center transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      {project.links.github.label}
                    </a>
                  </div>
                </div>
                
                {/* Decorative gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-white rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Portfolio summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each project represents a unique challenge solved with modern technologies and best practices.
              Explore the live demos and source code to see the craftsmanship in action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;