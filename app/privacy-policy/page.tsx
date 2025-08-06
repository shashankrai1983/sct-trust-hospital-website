import { MedicalDisclaimer } from '@/components/seo/medical-disclaimer';

export const metadata = {
  title: 'Privacy Policy - Dr. Amita Shukla | HIPAA Compliant Medical Practice',
  description: 'Privacy policy for Dr. Amita Shukla\'s medical practice. Learn how we protect your personal health information in compliance with HIPAA regulations.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy & HIPAA Notice
          </h1>
          
          <MedicalDisclaimer variant="modal" className="mb-8" />

          <div className="prose prose-lg max-w-none">
            <h2>Patient Privacy Protection</h2>
            <p>
              At Dr. Amita Shukla's practice and SCT Trust Hospital, we are committed to protecting 
              your personal health information (PHI) in compliance with the Health Insurance Portability 
              and Accountability Act (HIPAA) and applicable Indian privacy regulations.
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>Medical history and current health status</li>
              <li>Contact information for appointments and follow-up</li>
              <li>Insurance and payment information</li>
              <li>Website usage data for improving our services</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>Providing medical care and treatment</li>
              <li>Scheduling appointments and sending reminders</li>
              <li>Processing payments and insurance claims</li>
              <li>Improving our medical services</li>
              <li>Complying with legal requirements</li>
            </ul>

            <h2>Information Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <ul>
              <li>Access to your medical records</li>
              <li>Request corrections to your information</li>
              <li>Request restrictions on information use</li>
              <li>Receive confidential communications</li>
              <li>File complaints about privacy practices</li>
            </ul>

            <h2>Contact Information</h2>
            <p>
              For privacy concerns or to exercise your rights, contact us at:
              <br />
              Email: amitaobg@gmail.com
              <br />
              Phone: +91-8303222222
              <br />
              Address: SCT Trust Hospital, Sector-2, Viraj Khand, Gomti Nagar, Lucknow
            </p>

            <p className="text-sm text-gray-600 mt-8">
              Last Updated: January 1, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}