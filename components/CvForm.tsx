
import React, { useState } from 'react';
import { useCvStore, useTranslations } from '../hooks/useCvStore';
import Accordion, { AccordionItem } from './ui/Accordion';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import ImageCropper from './ui/ImageCropper';

const CvForm: React.FC = () => {
  const store = useCvStore();
  const t = useTranslations();
  const langClass = store.language === 'km' ? 'font-khmer' : 'font-sans';
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageToCrop(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = ''; // Reset input to allow re-uploading the same file
    }
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    store.updatePersonalInfo('photo', croppedImageUrl);
    setImageToCrop(null); // Close modal
  };

  const handleCropCancel = () => {
    setImageToCrop(null); // Close modal
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {imageToCrop && (
        <ImageCropper 
          imageSrc={imageToCrop}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
      <h2 className={`text-xl font-bold mb-4 ${langClass}`}>{t('form_title')}</h2>
      <Accordion>
        {/* Personal Info */}
        <AccordionItem title={t('personal_info')}>
            <div className="grid grid-cols-1 gap-4">
                <Input label={t('full_name')} value={store.cvData.personalInfo.name} onChange={(e) => store.updatePersonalInfo('name', e.target.value)} />
                <Input label={t('job_title')} value={store.cvData.personalInfo.jobTitle} onChange={(e) => store.updatePersonalInfo('jobTitle', e.target.value)} />
                <Input label={t('phone')} value={store.cvData.personalInfo.phone} onChange={(e) => store.updatePersonalInfo('phone', e.target.value)} />
                <Input label={t('email')} type="email" value={store.cvData.personalInfo.email} onChange={(e) => store.updatePersonalInfo('email', e.target.value)} />
                <Input label={t('address')} value={store.cvData.personalInfo.address} onChange={(e) => store.updatePersonalInfo('address', e.target.value)} />
                <div>
                    <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ${langClass}`}>{t('profile_picture')}</label>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                </div>
                <Textarea label={t('about_me')} value={store.cvData.personalInfo.about} onChange={(e) => store.updatePersonalInfo('about', e.target.value)} />
            </div>
        </AccordionItem>

        {/* Education */}
        <AccordionItem title={t('education')}>
            {store.cvData.education.map((edu, index) => (
                <div key={edu.id} className="grid grid-cols-1 gap-4 mb-4 p-4 border rounded-md dark:border-gray-700 relative">
                    <Input label={t('degree')} value={edu.degree} onChange={(e) => store.updateEducation(index, 'degree', e.target.value)} />
                    <Input label={t('school')} value={edu.school} onChange={(e) => store.updateEducation(index, 'school', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label={t('start_date')} value={edu.startDate} onChange={(e) => store.updateEducation(index, 'startDate', e.target.value)} />
                        <Input label={t('end_date')} value={edu.endDate} onChange={(e) => store.updateEducation(index, 'endDate', e.target.value)} />
                    </div>
                    <Textarea label={t('description')} value={edu.description} onChange={(e) => store.updateEducation(index, 'description', e.target.value)} />
                    <Button variant="danger" size="sm" onClick={() => store.removeEducation(index)} className="absolute top-2 right-2">{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addEducation}>{t('add_education')}</Button>
        </AccordionItem>
        
        {/* Work Experience */}
        <AccordionItem title={t('work_experience')}>
            {store.cvData.experience.map((exp, index) => (
                <div key={exp.id} className="grid grid-cols-1 gap-4 mb-4 p-4 border rounded-md dark:border-gray-700 relative">
                    <Input label={t('job_title')} value={exp.title} onChange={(e) => store.updateExperience(index, 'title', e.target.value)} />
                    <Input label={t('company')} value={exp.company} onChange={(e) => store.updateExperience(index, 'company', e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label={t('start_date')} value={exp.startDate} onChange={(e) => store.updateExperience(index, 'startDate', e.target.value)} />
                        <Input label={t('end_date')} value={exp.endDate} onChange={(e) => store.updateExperience(index, 'endDate', e.target.value)} />
                    </div>
                    <Textarea label={t('description')} value={exp.description} onChange={(e) => store.updateExperience(index, 'description', e.target.value)} />
                    <Button variant="danger" size="sm" onClick={() => store.removeExperience(index)} className="absolute top-2 right-2">{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addExperience}>{t('add_experience')}</Button>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem title={t('skills')}>
            {store.cvData.skills.map((skill, index) => (
                 <div key={skill.id} className="flex items-center gap-4 mb-4 p-4 border rounded-md dark:border-gray-700">
                    <div className="flex-grow">
                        <Input label={t('skill_name')} value={skill.name} onChange={(e) => store.updateSkill(index, 'name', e.target.value)} />
                        <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mt-2 ${langClass}`}>{t('skill_level')}</label>
                        <input type="range" min="1" max="5" value={skill.level} onChange={(e) => store.updateSkill(index, 'level', parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                    </div>
                    <Button variant="danger" size="sm" onClick={() => store.removeSkill(index)}>{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addSkill}>{t('add_skill')}</Button>
        </AccordionItem>
        
        {/* Certifications */}
        <AccordionItem title={t('certifications')}>
            {store.cvData.certifications.map((cert, index) => (
                 <div key={cert.id} className="grid grid-cols-1 gap-4 mb-4 p-4 border rounded-md dark:border-gray-700 relative">
                    <Input label={t('certification_name')} value={cert.name} onChange={(e) => store.updateCertification(index, 'name', e.target.value)} />
                    <Input label={t('issuer')} value={cert.issuer} onChange={(e) => store.updateCertification(index, 'issuer', e.target.value)} />
                    <Input label={t('date_issued')} value={cert.date} onChange={(e) => store.updateCertification(index, 'date', e.target.value)} />
                    <Button variant="danger" size="sm" onClick={() => store.removeCertification(index)} className="absolute top-2 right-2">{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addCertification}>{t('add_certification')}</Button>
        </AccordionItem>

        {/* Languages */}
        <AccordionItem title={t('languages')}>
            {store.cvData.languages.map((lang, index) => (
                 <div key={lang.id} className="flex items-center gap-4 mb-4 p-4 border rounded-md dark:border-gray-700">
                    <Input label={t('language_name')} value={lang.name} onChange={(e) => store.updateLanguage(index, 'name', e.target.value)} className="flex-grow" />
                    <Input label={t('language_level')} value={lang.level} onChange={(e) => store.updateLanguage(index, 'level', e.target.value)} className="flex-grow" />
                    <Button variant="danger" size="sm" onClick={() => store.removeLanguage(index)}>{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addLanguage}>{t('add_language')}</Button>
        </AccordionItem>
        
        {/* Interests */}
        <AccordionItem title={t('interests')}>
            {store.cvData.interests.map((interest, index) => (
                 <div key={interest.id} className="flex items-center gap-4 mb-4 p-4 border rounded-md dark:border-gray-700">
                    <Input label={t('interest_name')} value={interest.name} onChange={(e) => store.updateInterest(index, 'name', e.target.value)} className="flex-grow" />
                    <Button variant="danger" size="sm" onClick={() => store.removeInterest(index)}>{t('remove')}</Button>
                </div>
            ))}
            <Button onClick={store.addInterest}>{t('add_interest')}</Button>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CvForm;