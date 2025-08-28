
import React from 'react';
import { useTranslations } from '../../hooks/useCvStore';
import { TemplateProps, SectionTitle, SkillBar } from './common';

const ModernTemplate: React.FC<TemplateProps> = ({ data, accentColor, language }) => {
    const { personalInfo, education, experience, skills, certifications, languages, interests } = data;
    const langClass = language === 'km' ? 'font-khmer' : 'font-sans';
    const t = useTranslations();

    return (
        <div className={`w-full h-full bg-white text-gray-800 text-[10px] leading-snug p-8 ${langClass}`}>
            {/* Header */}
            <header className="flex items-center mb-8 pb-4 border-b-2" style={{ borderColor: accentColor }}>
                {personalInfo.photo && (
                    <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />
                )}
                <div>
                    <h1 className={`text-4xl font-bold ${langClass}`}>{personalInfo.name}</h1>
                    <p className={`text-xl font-medium ${langClass}`} style={{color: accentColor}}>{personalInfo.jobTitle}</p>
                     <div className="flex gap-4 text-xs mt-2 text-gray-600">
                        <span>{personalInfo.phone}</span>
                        <span>|</span>
                        <span>{personalInfo.email}</span>
                        <span>|</span>
                        <span>{personalInfo.address}</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <div className="mb-6">
                        <SectionTitle title={t('about_me')} accentColor={accentColor} langClass={langClass} />
                        <p className={`text-sm ${langClass}`}>{personalInfo.about}</p>
                    </div>

                    <div className="mb-6">
                        <SectionTitle title={t('work_experience')} accentColor={accentColor} langClass={langClass} />
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={`font-bold text-base ${langClass}`}>{exp.title}</h3>
                                        <p className="text-xs font-semibold text-gray-600">{exp.startDate} - {exp.endDate}</p>
                                    </div>
                                    <p className={`italic font-medium text-sm mb-1 ${langClass}`} style={{color: accentColor}}>{exp.company}</p>
                                    <p className={`text-xs whitespace-pre-wrap ${langClass}`}>{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                     <div className="mb-6">
                        <SectionTitle title={t('skills')} accentColor={accentColor} langClass={langClass} />
                        <div className="space-y-3">
                            {skills.map(skill => <SkillBar key={skill.id} skill={skill} accentColor={accentColor} langClass={langClass} />)}
                        </div>
                    </div>
                    
                    <div className="mb-6">
                        <SectionTitle title={t('education')} accentColor={accentColor} langClass={langClass} />
                        <div className="space-y-3">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className={`font-bold text-sm ${langClass}`}>{edu.degree}</h3>
                                    <p className={`text-xs italic ${langClass}`}>{edu.school}</p>
                                    <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mb-6">
                        <SectionTitle title={t('languages')} accentColor={accentColor} langClass={langClass} />
                        <ul className="space-y-1 text-sm">
                            {languages.map(lang => <li key={lang.id} className={langClass}>{lang.name}: <span className="text-gray-600">{lang.level}</span></li>)}
                        </ul>
                    </div>
                    
                    <div className="mb-6">
                        <SectionTitle title={t('certifications')} accentColor={accentColor} langClass={langClass} />
                        <div className="space-y-2">
                            {certifications.map(cert => (
                                <div key={cert.id}>
                                    <h3 className={`font-bold text-sm ${langClass}`}>{cert.name}</h3>
                                    <p className={`text-xs italic ${langClass}`}>{cert.issuer} - {cert.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <SectionTitle title={t('interests')} accentColor={accentColor} langClass={langClass} />
                        <p className="text-sm">{interests.map(i => i.name).join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
