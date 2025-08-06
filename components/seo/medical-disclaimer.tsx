interface MedicalDisclaimerProps {
  className?: string;
  variant?: 'inline' | 'footer' | 'modal';
}

export function MedicalDisclaimer({ className = '', variant = 'inline' }: MedicalDisclaimerProps) {
  const disclaimerText = {
    inline: "The information provided on this website is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare professional for personalized medical guidance.",
    footer: "Medical Disclaimer: Information on this website is for educational purposes only. Dr. Amita Shukla and SCT Trust Hospital do not provide medical advice, diagnosis, or treatment through this website. Always consult with a qualified healthcare professional.",
    modal: "Important Medical Disclaimer: The content on this website is provided for informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website."
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'footer':
        return 'text-xs text-gray-500 bg-gray-50 p-3 rounded-md border-l-4 border-yellow-400';
      case 'modal':
        return 'text-sm text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200';
      default:
        return 'text-sm text-gray-600 bg-blue-50 p-3 rounded-md border-l-4 border-blue-400';
    }
  };

  return (
    <div className={`medical-disclaimer ${getVariantClasses()} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-600 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="font-medium">
            <strong>Medical Disclaimer:</strong>
          </p>
          <p className="mt-1">
            {disclaimerText[variant]}
          </p>
        </div>
      </div>
    </div>
  );
}