import type { FormData } from '../PlanningCouncilForm';

interface Step2DemographicsProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: {[key: string]: string};
}

export default function Step2Demographics({ formData, updateFormData, errors }: Step2DemographicsProps) {
  const genderOptions = [
    'Female',
    'Male',
    'Non-binary',
    'Transgender Female',
    'Transgender Male',
    'Prefer not to answer',
    'Other'
  ];

  const ageOptions = [
    'Under 18',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65 and over'
  ];

  const raceEthnicityOptions = [
    'White',
    'Black or African American',
    'Hispanic or Latino',
    'Asian',
    'American Indian or Alaska Native',
    'Native Hawaiian or Other Pacific Islander',
    'Two or more races',
    'Other',
    'Prefer not to answer'
  ];

  const languageOptions = [
    'English',
    'Spanish', 
    'Mandarin Chinese',
    'Hindi',
    'French',
    'Standard Arabic',
    'Bengali',
    'Russian',
    'Portuguese',
    'Indonesian'
  ];

  const diverseExperienceOptions = [
    'Person with HIV/AIDS',
    'Man who has sex with men',
    'Recovering from a substance use disorder',
    'Parent/Guardian of a child/children with HIV/AIDS',
    'Formerly incarcerated and released within the past three years'
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    updateFormData({ [field]: value });
  };

  const handleCheckboxChange = (field: keyof FormData, value: string, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      updateFormData({ [field]: [...currentArray, value] });
    } else {
      updateFormData({ [field]: currentArray.filter(item => item !== value) });
    }
  };

  const handleOtherLanguage = (value: string) => {
    const otherLanguages = formData.languages.filter(lang => !languageOptions.includes(lang));
    const standardLanguages = formData.languages.filter(lang => languageOptions.includes(lang));
    
    if (value.trim()) {
      updateFormData({ languages: [...standardLanguages, value.trim()] });
    } else {
      updateFormData({ languages: standardLanguages });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Demographics & Background</h2>

      {/* Ryan White Services */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have you been the recipient of Ryan White Part A services within the past 6 months?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="ryanWhiteServices"
              checked={formData.receivedRyanWhiteServices === true}
              onChange={() => handleInputChange('receivedRyanWhiteServices', true)}
              className="mr-2"
            />
            Yes
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="ryanWhiteServices"
              checked={formData.receivedRyanWhiteServices === false}
              onChange={() => handleInputChange('receivedRyanWhiteServices', false)}
              className="mr-2"
            />
            No
          </label>
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.gender}
          onChange={(e) => handleInputChange('gender', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.gender ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-label="Gender selection"
        >
          <option value="">Select Gender</option>
          {genderOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Age <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-label="Age range selection"
        >
          <option value="">Select Age Range</option>
          {ageOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
      </div>

      {/* Race/Ethnicity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Race/Ethnicity <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.raceEthnicity}
          onChange={(e) => handleInputChange('raceEthnicity', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.raceEthnicity ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-label="Race and ethnicity selection"
        >
          <option value="">Select Race/Ethnicity</option>
          {raceEthnicityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.raceEthnicity && <p className="text-red-500 text-sm mt-1">{errors.raceEthnicity}</p>}
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Which languages are you proficient in? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2 mb-4">
          {languageOptions.map((language) => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.languages.includes(language)}
                onChange={(e) => handleCheckboxChange('languages', language, e.target.checked)}
                className="mr-3"
              />
              <span className="text-sm">{language}</span>
            </label>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Other Language</label>
          <input
            type="text"
            placeholder="Please specify"
            value={formData.languages.find(lang => !languageOptions.includes(lang)) || ''}
            onChange={(e) => handleOtherLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
      </div>

      {/* Diverse Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Diverse Experience (check all that apply)
        </label>
        <div className="space-y-2">
          {diverseExperienceOptions.map((experience) => (
            <label key={experience} className="flex items-start">
              <input
                type="checkbox"
                checked={formData.diverseExperience.includes(experience)}
                onChange={(e) => handleCheckboxChange('diverseExperience', experience, e.target.checked)}
                className="mt-1 mr-3"
              />
              <span className="text-sm">{experience}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> The Council must report certain information about the makeup of the membership. 
          All demographic information is collected for federal reporting requirements and will remain confidential.
        </p>
      </div>
    </div>
  );
}