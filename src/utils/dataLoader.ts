import { 
  HeroData, 
  AboutData, 
  ExperienceData, 
  ProjectsData, 
  SkillsData, 
  ContactData 
} from '../types/data';

// Import JSON data
import heroData from '../data/hero.json';
import aboutData from '../data/about.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import contactData from '../data/contact.json';

// Data loader functions with type assertions
export const getHeroData = (): HeroData => {
  return heroData as HeroData;
};

export const getAboutData = (): AboutData => {
  return aboutData as AboutData;
};

export const getExperienceData = (): ExperienceData => {
  return experienceData as ExperienceData;
};

export const getProjectsData = (): ProjectsData => {
  return projectsData as ProjectsData;
};

export const getSkillsData = (): SkillsData => {
  return skillsData as SkillsData;
};

export const getContactData = (): ContactData => {
  return contactData as ContactData;
};

// Generic data loader for any section
export const loadSectionData = <T>(sectionName: string): T => {
  switch (sectionName.toLowerCase()) {
    case 'hero':
      return getHeroData() as unknown as T;
    case 'about':
      return getAboutData() as unknown as T;
    case 'experience':
      return getExperienceData() as unknown as T;
    case 'projects':
      return getProjectsData() as unknown as T;
    case 'skills':
      return getSkillsData() as unknown as T;
    case 'contact':
      return getContactData() as unknown as T;
    default:
      throw new Error(`Unknown section: ${sectionName}`);
  }
};

// Helper function to get all data at once
export const getAllData = () => {
  return {
    hero: getHeroData(),
    about: getAboutData(),
    experience: getExperienceData(),
    projects: getProjectsData(),
    skills: getSkillsData(),
    contact: getContactData(),
  };
};