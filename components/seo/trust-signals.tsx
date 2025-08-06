import { Shield, Award, Users, Clock, MapPin, Phone } from 'lucide-react';

export function TrustSignals() {
  const trustElements = [
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your privacy and medical records are fully protected"
    },
    {
      icon: Award,
      title: "Gold Medalist MBBS",
      description: "MS (OBS & GYNAE) with 10+ years experience"
    },
    {
      icon: Users,
      title: "4000+ Successful Deliveries",
      description: "Trusted by thousands of families in Lucknow"
    },
    {
      icon: Clock,
      title: "24/7 Emergency Care",
      description: "Round-the-clock gynecological emergency services"
    }
  ];

  const credentials = [
    "MS (Obstetrics & Gynecology)",
    "Gold Medalist - MBBS",
    "Member - Indian Medical Association",
    "Certified - Laparoscopic Surgery",
    "Fellowship - High-Risk Pregnancy"
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {element.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {element.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Professional Credentials */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Professional Credentials & Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.map((credential, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">{credential}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Affiliation */}
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">
              SCT Trust Hospital Affiliation
            </h3>
          </div>
          <div className="text-center">
            <p className="text-gray-700 mb-4">
              Practicing at SCT Trust Hospital, a leading healthcare facility in Lucknow
              with state-of-the-art medical equipment and comprehensive women's health services.
            </p>
            <div className="flex items-center justify-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span>Emergency: +91-8303222222</span>
            </div>
          </div>
        </div>

        {/* Security & Privacy Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            🔒 This website uses SSL encryption to protect your personal information. 
            All medical consultations and patient data are handled in compliance with HIPAA regulations.
          </p>
        </div>
      </div>
    </div>
  );
}