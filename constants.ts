
import type { CvData } from './types';

export const A4_WIDTH_PX = 794; // 210mm at 96 DPI, rounded
export const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI, rounded

export const INITIAL_CV_DATA_EN: CvData = {
  personalInfo: {
    name: "Sok Chhaya",
    jobTitle: "Web Developer",
    phone: "012 345 678",
    email: "sok.chhaya@email.com",
    address: "House 123, Street 456, Phnom Penh",
    photo: null,
    about: "I am a web developer with 5 years of experience in creating modern and responsive web applications. I specialize in React, TypeScript, and Node.js."
  },
  education: [
    { id: "edu-1", degree: "Bachelor of Computer Science", school: "Royal University of Phnom Penh", startDate: "2015", endDate: "2019", description: "Focused on software development and artificial intelligence." },
  ],
  experience: [
    { id: "exp-1", title: "Senior Web Developer", company: "XYZ Technology", startDate: "2021", endDate: "Present", description: "Led front-end development for major projects using React and TypeScript. Improved application performance by 20%." },
    { id: "exp-2", title: "Web Developer", company: "ABC Digital", startDate: "2019", endDate: "2021", description: "Developed and maintained e-commerce websites in collaboration with the UI/UX design team." }
  ],
  skills: [
    { id: "skill-1", name: "PhotoShop", level: 5 },
    { id: "skill-2", name: "Illustrator", level: 5 },
    { id: "skill-3", name: "AfterEffects", level: 4 },
    { id: "skill-4", name: "Premier Pro", level: 5 },
    { id: "skill-5", name: "Blender", level: 5 },
  ],
  certifications: [
      {id: "cert-1", name: 'Step Academy Cambodia', issuer: 'CIW', date: '2020'}
  ],
  languages: [
      {id: "lang-1", name: 'Khmer', level: 'Native'},
      {id: "lang-2", name: 'English', level: 'Fluent'},
  ],
  interests: [
      {id: "int-1", name: 'Reading'},
      {id: "int-2", name: 'Photography'},
      {id: "int-3", name: 'Traveling'},
  ]
};


export const INITIAL_CV_DATA_KM: CvData = {
  personalInfo: {
    name: "Sok Chhaya",
    jobTitle: "Graphic Designer",
    phone: "012 345 678",
    email: "sok.chhaya@email.com",
    address: "ផ្ទះលេខ ១២៣, ផ្លូវ ៤៥៦, ភ្នំពេញ",
    photo: null,
    about: "✨ អ្នករចនាក្រាហ្វិក (Graphic Designer) 🎨 ច្នៃប្រឌិត | Logo | Branding | Poster | UI/UX 🖌️ ជំនាញក្នុង Photoshop, Illustrator, After Effects, Blender 🚀 បង្កើតការរចនាដែលទាក់ទាញ និងមានអត្ថន័យ"
  },
  education: [
    { id: "edu-1", degree: "បរិញ្ញាបត្រវិទ្យាសាស្ត្រកុំព្យូទ័រ", school: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ", startDate: "2015", endDate: "2019", description: "បានផ្តោតលើការអភិវឌ្ឍន៍កម្មវិធី និងបញ្ញាសិប្បនិម្មិត។" },
  ],
  experience: [
    { id: "exp-1", title: "អ្នកអភិវឌ្ឍន៍គេហទំព័រជាន់ខ្ពស់", company: "ក្រុមហ៊ុនតិចណូឡូជី XYZ", startDate: "2021", endDate: "បច្ចុប្បន្ន", description: "ដឹកនាំការអភិវឌ្ឍន៍ផ្នែកខាងមុខសម្រាប់គម្រោងធំៗ ដោយប្រើប្រាស់ React និង TypeScript។ បង្កើនកម្មវិធីបាន 20% ។" },
    { id: "exp-2", title: "អ្នកអភិវឌ្ឍន៍គេហទំព័រ", company: "ក្រុមហ៊ុនឌីជីថល ABC", startDate: "2019", endDate: "2021", description: "បានបង្កើតនិងថែទាំគេហទំព័រពាណិជ្ជកម្មអេឡិចត្រូនិច ដោយសហការជាមួយក្រុមអ្នករចនា UI/UX ។" }
  ],
  skills: [
    { id: "skill-1", name: "React", level: 5 },
    { id: "skill-2", name: "TypeScript", level: 5 },
    { id: "skill-3", name: "Node.js", level: 4 },
    { id: "skill-4", name: "Tailwind CSS", level: 5 },
    { id: "skill-5", name: "ភាសាខ្មែរ", level: 5 },
  ],
  certifications: [
      {id: "cert-1", name: 'Certified JavaScript Developer', issuer: 'CIW', date: '2020'}
  ],
  languages: [
      {id: "lang-1", name: 'ភាសាខ្មែរ', level: 'ភាសាកំណើត'},
      {id: "lang-2", name: 'English', level: 'Fluent'},
  ],
  interests: [
      {id: "int-1", name: 'អានសៀវភៅ'},
      {id: "int-2", name: 'ការថតរូប'},
      {id: "int-3", name: 'ការធ្វើដំណើរ'},
  ]
};

export const TEMPLATES = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
];

export const COLORS = [
    '#2563eb', // Blue
    '#4f46e5', // Indigo
    '#059669', // Emerald
    '#db2777', // Pink
    '#d97706', // Amber
    '#581c87', // Purple
];

export const TRANSLATIONS = {
    km: {
        title: "កម្មវិធីបង្កើត CV",
        toggle_en: "English",
        toggle_km: "ខ្មែរ",
        controls: "ផ្ទាំងបញ្ជា",
        templates: "ទម្រង់",
        accent_color: "ពណ៌ចម្បង",
        download_pdf: "ទាញយកជា PDF",
        downloading: "កំពុងទាញយក...",
        save_image: "រក្សាទុកជា​រូបភាព",
        saving_image: "កំពុងរក្សាទុក...",
        form_title: "ព័ត៌មាន CV",
        personal_info: "ព័ត៌មានផ្ទាល់ខ្លួន",
        full_name: "ឈ្មោះពេញ",
        job_title: "តួនាទី",
        phone: "លេខទូរស័ព្ទ",
        email: "អ៊ីមែល",
        address: "អាសយដ្ឋាន",
        profile_picture: "រូបថត Profile",
        upload_photo: "បញ្ចូលរូបថត",
        about_me: "អំពីខ្ញុំ",
        education: "ការអប់រំ",
        add_education: "បន្ថែមការអប់រំ",
        degree: "សញ្ញាបត្រ",
        school: "សាលា",
        start_date: "ថ្ងៃចាប់ផ្តើម",
        end_date: "ថ្ងៃបញ្ចប់",
        description: "ការពិពណ៌នា",
        work_experience: "បទពិសោធន៍ការងារ",
        add_experience: "បន្ថែមបទពិសោធន៍",
        company: "ក្រុមហ៊ុន",
        skills: "ជំនាញ",
        add_skill: "បន្ថែមជំនាញ",
        skill_name: "ឈ្មោះជំនាញ",
        skill_level: "កម្រិតជំនាញ",
        certifications: "វិញ្ញាបនបត្រ",
        add_certification: "បន្ថែមវិញ្ញាបនបត្រ",
        certification_name: "ឈ្មោះវិញ្ញាបនបត្រ",
        issuer: "អ្នកចេញ",
        date_issued: "កាលបរិច្ឆេទចេញ",
        languages: "ភាសា",
        add_language: "បន្ថែមភាសា",
        language_name: "ឈ្មោះភាសា",
        language_level: "កម្រិត",
        interests: "ចំណូលចិត្ត",
        add_interest: "បន្ថែមចំណូលចិត្ត",
        interest_name: "ឈ្មោះចំណូលចិត្ត",
        present: "បច្ចុប្បន្ន",
        remove: "លុប",
        crop_image_title: "កាត់រូបភាព",
        crop_button: "កាត់",
        cancel_button: "បោះបង់",
    },
    en: {
        title: "CV Builder",
        toggle_en: "English",
        toggle_km: "Khmer",
        controls: "Control Panel",
        templates: "Templates",
        accent_color: "Accent Color",
        download_pdf: "Download PDF",
        downloading: "Downloading...",
        save_image: "Save as Image",
        saving_image: "Saving...",
        form_title: "CV Information",
        personal_info: "Personal Information",
        full_name: "Full Name",
        job_title: "Job Title",
        phone: "Phone",
        email: "Email",
        address: "Address",
        profile_picture: "Profile Picture",
        upload_photo: "Upload Photo",
        about_me: "About Me",
        education: "Education",
        add_education: "Add Education",
        degree: "Degree",
        school: "School",
        start_date: "Start Date",
        end_date: "End Date",
        description: "Description",
        work_experience: "Work Experience",
        add_experience: "Add Experience",
        company: "Company",
        skills: "Skills",
        add_skill: "Add Skill",
        skill_name: "Skill Name",
        skill_level: "Skill Level",
        certifications: "Certifications",
        add_certification: "Add Certification",
        certification_name: "Certification Name",
        issuer: "Issuer",
        date_issued: "Date Issued",
        languages: "Languages",
        add_language: "Add Language",
        language_name: "Language Name",
        language_level: "Level",
        interests: "Interests",
        add_interest: "Add Interest",
        interest_name: "Interest Name",
        present: "Present",
        remove: "Remove",
        crop_image_title: "Crop Image",
        crop_button: "Crop",
        cancel_button: "Cancel",
    }
}
