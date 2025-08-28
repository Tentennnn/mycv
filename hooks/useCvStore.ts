
import { create } from 'zustand';
import { produce } from 'immer';
import { INITIAL_CV_DATA_KM, INITIAL_CV_DATA_EN, TRANSLATIONS } from '../constants';
import type { CvData, PersonalInfo, Education, Experience, Skill, Certification, Language, Interest } from '../types';

type LanguageOption = 'en' | 'km';
type ThemeOption = 'light' | 'dark';

interface CvState {
  language: LanguageOption;
  theme: ThemeOption;
  template: string;
  accentColor: string;
  cvData: CvData;

  setLanguage: (language: LanguageOption) => void;
  setTheme: (theme: ThemeOption) => void;
  setTemplate: (template: string) => void;
  setAccentColor: (color: string) => void;
  
  updatePersonalInfo: (field: keyof PersonalInfo, value: string | null) => void;
  
  addEducation: () => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  removeEducation: (index: number) => void;

  addExperience: () => void;
  updateExperience: (index: number, field: keyof Experience, value: string) => void;
  removeExperience: (index: number) => void;

  addSkill: () => void;
  updateSkill: (index: number, field: keyof Skill, value: string | number) => void;
  removeSkill: (index: number) => void;

  addCertification: () => void;
  updateCertification: (index: number, field: keyof Certification, value: string) => void;
  removeCertification: (index: number) => void;

  addLanguage: () => void;
  updateLanguage: (index: number, field: keyof Language, value: string) => void;
  removeLanguage: (index: number) => void;
  
  addInterest: () => void;
  updateInterest: (index: number, field: keyof Interest, value: string) => void;
  removeInterest: (index: number) => void;
}

// A helper for deep comparison, ignoring the potentially large photo string
const isInitialData = (data: CvData, initialData: CvData): boolean => {
    try {
        // Create deep copies to avoid modifying the original state
        const dataCopy = JSON.parse(JSON.stringify(data));
        const initialDataCopy = JSON.parse(JSON.stringify(initialData));
        
        // Nullify the photo property on both copies before comparison
        if (dataCopy.personalInfo) dataCopy.personalInfo.photo = null;
        if (initialDataCopy.personalInfo) initialDataCopy.personalInfo.photo = null;

        return JSON.stringify(dataCopy) === JSON.stringify(initialDataCopy);
    } catch (e) {
        // In case of any stringification error
        console.error("Failed to compare CV data:", e);
        return false;
    }
};


export const useCvStore = create<CvState>((set) => ({
  language: 'km',
  theme: 'light',
  template: 'classic',
  accentColor: '#2563eb',
  cvData: INITIAL_CV_DATA_KM,

  setLanguage: (language) => set(produce((state: CvState) => {
    const isCurrentlyInitialKm = isInitialData(state.cvData, INITIAL_CV_DATA_KM);
    const isCurrentlyInitialEn = isInitialData(state.cvData, INITIAL_CV_DATA_EN);
    
    // Only switch the sample data if the user hasn't modified it
    if (language === 'en' && isCurrentlyInitialKm) {
        const currentPhoto = state.cvData.personalInfo.photo;
        state.cvData = structuredClone(INITIAL_CV_DATA_EN);
        state.cvData.personalInfo.photo = currentPhoto;
    } else if (language === 'km' && isCurrentlyInitialEn) {
        const currentPhoto = state.cvData.personalInfo.photo;
        state.cvData = structuredClone(INITIAL_CV_DATA_KM);
        state.cvData.personalInfo.photo = currentPhoto;
    }
    
    state.language = language;
  })),
  setTheme: (theme) => set({ theme }),
  setTemplate: (template) => set({ template }),
  setAccentColor: (color) => set({ accentColor: color }),

  updatePersonalInfo: (field, value) =>
    set(produce((state: CvState) => {
      state.cvData.personalInfo[field] = value as string;
    })),

  addEducation: () =>
    set(produce((state: CvState) => {
      state.cvData.education.push({ id: crypto.randomUUID(), degree: '', school: '', startDate: '', endDate: '', description: '' });
    })),
  updateEducation: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.education[index] as any)[field] = value;
    })),
  removeEducation: (index) =>
    set(produce((state: CvState) => {
      state.cvData.education.splice(index, 1);
    })),

  addExperience: () =>
    set(produce((state: CvState) => {
      state.cvData.experience.push({ id: crypto.randomUUID(), title: '', company: '', startDate: '', endDate: '', description: '' });
    })),
  updateExperience: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.experience[index] as any)[field] = value;
    })),
  removeExperience: (index) =>
    set(produce((state: CvState) => {
      state.cvData.experience.splice(index, 1);
    })),

  addSkill: () =>
    set(produce((state: CvState) => {
      state.cvData.skills.push({ id: crypto.randomUUID(), name: '', level: 3 });
    })),
  updateSkill: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.skills[index] as any)[field] = value;
    })),
  removeSkill: (index) =>
    set(produce((state: CvState) => {
      state.cvData.skills.splice(index, 1);
    })),
    
  addCertification: () =>
    set(produce((state: CvState) => {
      state.cvData.certifications.push({ id: crypto.randomUUID(), name: '', issuer: '', date: '' });
    })),
  updateCertification: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.certifications[index] as any)[field] = value;
    })),
  removeCertification: (index) =>
    set(produce((state: CvState) => {
      state.cvData.certifications.splice(index, 1);
    })),

  addLanguage: () =>
    set(produce((state: CvState) => {
      state.cvData.languages.push({ id: crypto.randomUUID(), name: '', level: '' });
    })),
  updateLanguage: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.languages[index] as any)[field] = value;
    })),
  removeLanguage: (index) =>
    set(produce((state: CvState) => {
      state.cvData.languages.splice(index, 1);
    })),

  addInterest: () =>
    set(produce((state: CvState) => {
      state.cvData.interests.push({ id: crypto.randomUUID(), name: ''});
    })),
  updateInterest: (index, field, value) =>
    set(produce((state: CvState) => {
      (state.cvData.interests[index] as any)[field] = value;
    })),
  removeInterest: (index) =>
    set(produce((state: CvState) => {
      state.cvData.interests.splice(index, 1);
    })),
}));

// A helper to get translations
export const useTranslations = () => {
    const language = useCvStore((state) => state.language);
    return (key: keyof typeof TRANSLATIONS['en']) => {
        return TRANSLATIONS[language][key] || TRANSLATIONS.en[key];
    };
};
