interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  author?: string;
  dateCreated?: string;
  upvoteCount?: number;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
  mainEntity?: string;
  about?: string;
  url: string;
  name?: string;
  description?: string;
}

export function FAQSchema({
  faqs,
  mainEntity,
  about,
  url,
  name = "Frequently Asked Questions",
  description
}: FAQSchemaProps) {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq-page`,
    "name": name,
    "description": description || `Frequently asked questions about ${about || mainEntity}`,
    "url": url,
    "inLanguage": "en-IN",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "@id": "https://dramitashukla.com/#person",
      "name": "Dr. Amita Shukla"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://dramitashukla.com/#organization"
    },
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${url}#question-${index + 1}`,
      "name": faq.question,
      "text": faq.question,
      "category": faq.category,
      "dateCreated": faq.dateCreated || "2024-01-01",
      "upvoteCount": faq.upvoteCount || 0,
      "author": {
        "@type": "Person",
        "name": faq.author || "Patient",
        "description": "Patient inquiry"
      },
      "acceptedAnswer": {
        "@type": "Answer",
        "@id": `${url}#answer-${index + 1}`,
        "text": faq.answer,
        "dateCreated": faq.dateCreated || "2024-01-01",
        "upvoteCount": (faq.upvoteCount || 0) + 5, // Answers typically have more upvotes
        "url": `${url}#faq-${index + 1}`,
        "author": {
          "@type": "Person",
          "@id": "https://dramitashukla.com/#person",
          "name": "Dr. Amita Shukla",
          "jobTitle": "Gynecologist & Obstetrician",
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": "MS (OBS & GYNAE)"
            }
          ]
        },
        "about": about || mainEntity,
        "inLanguage": "en-IN",
        "encodingFormat": "text/html"
      },
      "answerCount": 1,
      "suggestedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "author": {
          "@id": "https://dramitashukla.com/#person"
        }
      }
    })),
    "about": about || mainEntity,
    "isPartOf": {
      "@type": "WebPage",
      "url": url
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": url
    }
  };

  // Create individual Question schemas for better SEO
  const questionSchemas = faqs.map((faq, index) => ({
    "@context": "https://schema.org",
    "@type": "Question",
    "@id": `${url}#standalone-question-${index + 1}`,
    "name": faq.question,
    "text": faq.question,
    "url": `${url}#question-${index + 1}`,
    "dateCreated": faq.dateCreated || "2024-01-01",
    "author": {
      "@type": "Person",
      "name": "Patient"
    },
    "about": {
      "@type": "MedicalCondition",
      "name": about || mainEntity
    },
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
      "author": {
        "@type": "Person",
        "@id": "https://dramitashukla.com/#person"
      },
      "upvoteCount": (faq.upvoteCount || 0) + 5,
      "dateCreated": faq.dateCreated || "2024-01-01"
    },
    "answerCount": 1,
    "upvoteCount": faq.upvoteCount || 0,
    "isPartOf": {
      "@type": "FAQPage",
      "@id": `${url}#faq-page`
    }
  }));

  // QA Page schema for additional SEO benefits
  const qaPageSchema = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "@id": `${url}#qa-page`,
    "name": `${name} - Q&A`,
    "description": `Questions and answers about ${about || mainEntity} by Dr. Amita Shukla`,
    "url": url,
    "mainEntity": {
      "@type": "Question",
      "name": faqs[0]?.question || "General Medical Questions",
      "text": faqs[0]?.question || "General Medical Questions",
      "answerCount": faqs.length,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faqs[0]?.answer || "Comprehensive medical care provided.",
        "author": {
          "@id": "https://dramitashukla.com/#person"
        }
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://dramitashukla.com/"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": about || mainEntity || "Medical FAQ",
          "item": url
        }
      ]
    },
    "specialty": "Gynecology and Obstetrics",
    "about": {
      "@type": "MedicalSpecialty",
      "name": "Gynecology and Obstetrics"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
        }}
      />
      {questionSchemas.map((schema, index) => (
        <script
          key={`question-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(qaPageSchema),
        }}
      />
    </>
  );
}