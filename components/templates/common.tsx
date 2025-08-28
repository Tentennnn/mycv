import React from 'react';
import type { CvData, Skill } from '../../types';

export interface TemplateProps {
    data: CvData;
    accentColor: string;
    language: 'en' | 'km';
}

export const SectionTitle: React.FC<{ title: string; accentColor: string; langClass: string; className?: string }> = ({ title, accentColor, langClass, className = '' }) => (
    <h2
        className={`text-xl font-bold uppercase tracking-wider pb-1 mb-4 border-b-2 ${langClass} ${className}`}
        style={{ borderColor: accentColor, color: accentColor }}
    >
        {title}
    </h2>
);

export const SkillBar: React.FC<{ skill: Skill; accentColor: string; langClass: string; }> = ({ skill, accentColor, langClass }) => (
    <div aria-label={`${skill.name}: ${skill.level} out of 5 stars`}>
        <p className={`text-sm ${langClass}`}>{skill.name}</p>
        <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill={i < skill.level ? accentColor : 'currentColor'}
                >
                    <path
                        className={i < skill.level ? '' : 'text-gray-300 dark:text-gray-600'}
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>
            ))}
        </div>
    </div>
);