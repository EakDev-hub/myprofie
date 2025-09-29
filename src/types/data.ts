// Hero section types
export interface HeroMetric {
  value: number;
  suffix: string;
  label: string;
  animationDelay: number;
}

export interface HeroAction {
  label: string;
  href: string;
  type: 'primary' | 'secondary';
  glow?: boolean;
}

export interface HeroData {
  personal: {
    name: string;
    tagline: string;
  };
  content: {
    title: string;
    description: string;
  };
  metrics: HeroMetric[];
  actions: HeroAction[];
  styling: {
    backgroundClass: string;
  };
}

// About section types
export interface ServiceIcon {
  viewBox: string;
  path: string;
}

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
}

export interface AboutData {
  section: {
    title: string;
    backgroundColor: string;
  };
  content: {
    description: string;
  };
  services: Service[];
}

// Experience section types
export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
}

export interface ExperienceData {
  section: {
    title: string;
    backgroundColor: string;
  };
  experiences: Experience[];
}

// Projects section types
export interface ProjectLink {
  url: string;
  label: string;
}

export interface ProjectLinks {
  demo: ProjectLink;
  github: ProjectLink;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: ProjectLinks;
}

export interface ProjectsData {
  section: {
    title: string;
    backgroundColor: string;
  };
  projects: Project[];
}

// Skills section types
export interface Skill {
  name: string;
  level: number;
}

export interface SkillsData {
  section: {
    title: string;
    backgroundColor: string;
  };
  skills: Skill[];
}

// Contact section types
export interface ContactIcon {
  viewBox: string;
  path: string;
}

export interface ContactInfo {
  type: 'email' | 'phone' | 'location';
  label: string;
  icon: ContactIcon;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  rows?: number;
  required: boolean;
}

export interface FormSubmitButton {
  label: string;
  className: string;
}

export interface ContactForm {
  fields: FormField[];
  submitButton: FormSubmitButton;
}

export interface ContactData {
  section: {
    title: string;
    backgroundColor: string;
  };
  content: {
    heading: string;
    description: string;
  };
  contactInfo: ContactInfo[];
  form: ContactForm;
}