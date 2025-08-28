
import React from 'react';
import { useTranslations } from '../../hooks/useCvStore';
import { TemplateProps, SectionTitle, SkillBar } from './common';

const ClassicTemplate: React.FC<TemplateProps> = ({ data, accentColor, language }) => {
    const { personalInfo, education, experience, skills, certifications, languages, interests } = data;
    const langClass = language === 'km' ? 'font-khmer' : 'font-sans';
    const t = useTranslations();

    return (
        <div className={`w-full h-full bg-white text-gray-800 text-[10px] leading-snug flex ${langClass}`}>
            {/* Left Column */}
            <div className="w-1/3 bg-gray-100 p-6">
                {personalInfo.photo && (
                    <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover" />
                )}
                
                <div className="text-center mb-6">
                    <h1 className={`text-3xl font-bold ${langClass}`} style={{color: accentColor}}>{personalInfo.name}</h1>
                    <p className={`text-lg font-medium text-gray-600 ${langClass}`}>{personalInfo.jobTitle}</p>
                </div>

                <div className="mb-6">
                    <SectionTitle title={t('personal_info')} accentColor={accentColor} langClass={langClass} />
                    <div className="space-y-2 text-sm">
                        <p><strong>{t('phone')}:</strong> {personalInfo.phone}</p>
                        <p><strong>{t('email')}:</strong> {personalInfo.email}</p>
                        <p><strong>{t('address')}:</strong> {personalInfo.address}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <SectionTitle title={t('skills')} accentColor={accentColor} langClass={langClass} />
                    <div className="space-y-3">
                        {skills.map(skill => <SkillBar key={skill.id} skill={skill} accentColor={accentColor} langClass={langClass} />)}
                    </div>
                </div>
                
                 <div className="mb-6">
                    <SectionTitle title={t('languages')} accentColor={accentColor} langClass={langClass} />
                    <ul className="list-disc list-inside space-y-1">
                        {languages.map(lang => <li key={lang.id} className={langClass}>{lang.name} - {lang.level}</li>)}
                    </ul>
                </div>

                <div>
                    <SectionTitle title={t('interests')} accentColor={accentColor} langClass={langClass} />
                    <ul className="list-disc list-inside space-y-1">
                        {interests.map(interest => <li key={interest.id} className={langClass}>{interest.name}</li>)}
                    </ul>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-2/3 p-6">
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

                <div className="mb-6">
                    <SectionTitle title={t('education')} accentColor={accentColor} langClass={langClass} />
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className={`font-bold text-base ${langClass}`}>{edu.degree}</h3>
                                    <p className="text-xs font-semibold text-gray-600">{edu.startDate} - {edu.endDate}</p>
                                </div>
                                <p className={`italic font-medium text-sm mb-1 ${langClass}`}>{edu.school}</p>
                                <p className={`text-xs ${langClass}`}>{edu.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div>
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
            </div>
        </div>
    );
};

export default ClassicTemplate;
