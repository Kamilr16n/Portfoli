export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  about: string;
  profileInitial: string;
  profileImage: string;
}

export interface Education {
  degree: string;
  school: string;
  date: string;
  description: string;
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  gallery?: string[];
  demo?: string;
  github?: string;
  type: 'website' | 'figma';
}

export interface Social {
  linkedin: string;
  github: string;
  email: string;
  resume: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: string[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  social: Social;
}