
export interface PersonalInfo {
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  address: string;
  photo: string | null;
  about: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate:string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
}

export interface Language {
    id: string;
    name: string;
    level: string; // e.g., Native, Fluent, Intermediate
}

export interface Interest {
    id: string;
    name: string;
}


export interface CvData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications: Certification[];
  languages: Language[];
  interests: Interest[];
}
