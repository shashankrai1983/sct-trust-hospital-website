import { MedicalDisclaimer } from '@/components/seo/medical-disclaimer';

export const metadata = {
  title: 'Medical Disclaimer - Dr. Amita Shukla | Important Health Information',
  description: 'Important medical disclaimer for Dr. Amita Shukla\'s website. Understand the limitations of online health information and when to seek professional medical advice.',
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Medical Disclaimer
          </h1>
          
          <MedicalDisclaimer variant="modal" className="mb-8" />

          <div className="prose prose-lg max-w-none">
            <h2>Important Notice About Medical Information</h2>
            <p>
              The information provided on this website by Dr. Amita Shukla and SCT Trust Hospital 
              is for educational and informational purposes only. It should not be considered as 
              medical advice, diagnosis, or treatment recommendations.
            </p>

            <h2>No Doctor-Patient Relationship</h2>
            <p>
              Browsing this website, reading content, or contacting us through online forms does 
              not create a doctor-patient relationship. Such relationships can only be established 
              through direct, in-person consultation or formally arranged telemedicine appointments.
            </p>

            <h2>When to Seek Immediate Medical Attention</h2>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Emergency Situations
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Severe abdominal pain or bleeding</li>
                      <li>Signs of pregnancy complications</li>
                      <li>Sudden onset of severe pelvic pain</li>
                      <li>Heavy vaginal bleeding</li>
                      <li>Signs of infection with fever</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2>Limitation of Liability</h2>
            <p>
              Dr. Amita Shukla and SCT Trust Hospital shall not be liable for any direct, indirect, 
              incidental, or consequential damages arising from the use of information on this website 
              or any decisions made based on such information.
            </p>

            <h2>Individual Medical Needs</h2>
            <p>
              Every patient is unique, and medical conditions require personalized evaluation and 
              treatment. What works for one patient may not be appropriate for another. Always 
              consult with a qualified gynecologist for your specific health concerns.
            </p>

            <h2>Medication and Treatment Information</h2>
            <p>
              Any information about medications, treatments, or procedures mentioned on this website 
              is for educational purposes only. Dosages, side effects, and treatment protocols can 
              vary significantly based on individual patient factors.
            </p>

            <h2>Professional Medical Advice</h2>
            <p>
              For personalized medical advice, diagnosis, and treatment recommendations, please:
            </p>
            <ul>
              <li>Schedule an in-person consultation</li>
              <li>Call our office for urgent concerns: +91-8303222222</li>
              <li>Visit the emergency room for life-threatening situations</li>
              <li>Consult with your primary healthcare provider</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Remember
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      This website is a resource for health education, not a substitute for 
                      professional medical care. When in doubt about your health, always seek 
                      professional medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-8">
              Last Updated: January 1, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}