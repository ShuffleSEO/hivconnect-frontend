import type { FormData } from '../PlanningCouncilForm';

interface Step5CommitmentProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: {[key: string]: string};
}

export default function Step5Commitment({ formData, updateFormData, errors }: Step5CommitmentProps) {
  const handleInputChange = (field: keyof FormData, value: boolean) => {
    updateFormData({ [field]: value });
  };

  const commitments = [
    'I understand that I must complete a New Member Orientation within 12 months of beginning my term as a Planning Council member.',
    'I confirm that to the best of my ability, I will attend regularly scheduled monthly Planning Council meetings. I understand that in the event that I am unable to attend, I will notify Planning Council Support Staff in advance.',
    'I understand that membership on the Planning Council is a two-year commitment. I have considered my other personal and professional obligations and do not foresee them as a barrier to my full participation on the Planning Council.',
    'I agree to abide by the Bylaws, Policies and Procedures of the Planning Council.',
    'I understand that I must participate in at least one of the Standing Committees of the Planning Council.',
    'I understand that I will need to prepare for meetings by carefully reading all pre-distributed materials.',
    'When I make recommendations and/or decisions, I agree to consider the HIV/AIDS community as a whole, rather than just special interests or my personal perspectives.',
    'I agree to disclose any conflicts of interest I may have relative to issues that come before the Planning Council.',
    'I agree to keep sensitive information obtained about other Council members confidential, including HIV status, unless otherwise given permission.',
    'I certify that all statements and representations made in this application are true and correct.'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Commitment & Consent</h2>

      {/* Commitments */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Planning Council Member Commitments
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Please read and acknowledge the following commitments. If appointed as a member of the Planning Council, you agree to:
        </p>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-4">
          <ul className="space-y-3">
            {commitments.map((commitment, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1 flex-shrink-0">•</span>
                <span className="text-sm text-gray-700">{commitment}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.agreedToCommitments}
              onChange={(e) => handleInputChange('agreedToCommitments', e.target.checked)}
              className={`mt-1 mr-3 flex-shrink-0 ${errors.agreedToCommitments ? 'border-red-500' : ''}`}
            />
            <span className="text-sm font-medium text-gray-700">
              I have read and agree to all the commitments listed above. I understand that these are the requirements for Planning Council membership.
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          {errors.agreedToCommitments && (
            <p className="text-red-500 text-sm mt-2 ml-6">{errors.agreedToCommitments}</p>
          )}
        </div>
      </div>

      {/* Consent */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Information Sharing Consent
        </h3>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong>Consent Statement:</strong> I hereby consent to have information about me as contained in this application become available to the entire Council and its staff, and the TGA's grantee, the County of Middlesex, and HRSA, the federal funding source of the Middlesex/Somerset/Hunterdon TGA, as part of my work on the Council.
          </p>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={formData.consentGiven}
              onChange={(e) => handleInputChange('consentGiven', e.target.checked)}
              className={`mt-1 mr-3 flex-shrink-0 ${errors.consentGiven ? 'border-red-500' : ''}`}
            />
            <span className="text-sm font-medium text-gray-700">
              I provide my consent for the information sharing described above.
              <span className="text-red-500 ml-1">*</span>
            </span>
          </label>
          {errors.consentGiven && (
            <p className="text-red-500 text-sm mt-2 ml-6">{errors.consentGiven}</p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">What Happens Next?</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p>After you submit your application:</p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Your application will be reviewed by the Membership & Bylaws Committee</li>
            <li>You may be contacted for additional information or an interview</li>
            <li>The Committee will make a recommendation to the full Planning Council</li>
            <li>The Planning Council will vote on your membership</li>
            <li>You will be notified of the decision within 30 days</li>
            <li>If selected, you will receive information about New Member Orientation</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-800 mb-2">Thank You</h4>
        <p className="text-sm text-green-700">
          Thank you for your interest in serving on the Middlesex-Somerset-Hunterdon Transitional Grant Area Planning Council. 
          Your commitment to improving HIV/AIDS services in our community is greatly appreciated.
        </p>
      </div>
    </div>
  );
}