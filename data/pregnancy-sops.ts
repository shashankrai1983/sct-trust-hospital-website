import { 
  Apple, 
  Utensils, 
  Heart, 
  Activity, 
  Droplets,
  Thermometer,
  Shield,
  Moon,
  Sun as SunIcon,
  Cloud
} from 'lucide-react';
import { PregnancySOPsData } from '@/types/sops';

export const pregnancySOPsData: PregnancySOPsData = {
  globalDisclaimer: "These guidelines are for educational purposes only and should not replace professional medical advice. High-risk pregnancies require individualized care and monitoring. Always consult with Dr. Amita Shukla or your healthcare provider before making any dietary, lifestyle, or exercise changes during pregnancy.",
  
  emergencyContacts: [
    {
      type: 'primary',
      name: 'Dr. Amita Shukla',
      phone: '+91 8303222222',
      description: 'Primary consultation and emergencies'
    },
    {
      type: 'hospital',
      name: 'SCT Trust Hospital',
      phone: '+91 522-4242424',
      description: '24/7 emergency services'
    }
  ],

  sections: [
    {
      id: 'diet-nutrition',
      title: 'Diet & Nutrition Guidelines',
      subtitle: 'Seasonal & Cultural Food Recommendations',
      icon: Utensils,
      description: 'Comprehensive dietary guidelines tailored for Lucknow\'s seasonal food availability and Awadhi cuisine, with special considerations for high-risk pregnancies.',
      disclaimer: 'Nutritional needs vary significantly in high-risk pregnancies. These recommendations should be personalized based on your specific risk factors, medical conditions, and cultural preferences.',
      categories: [
        {
          id: 'seasonal-vegetables',
          name: 'Seasonal Vegetables',
          description: 'Fresh, locally available vegetables based on Lucknow\'s climate and growing seasons',
          icon: Apple,
          bgColor: 'bg-primary-green',
          borderColor: 'border-primary-green/20',
          accentColor: 'bg-primary-green/10',
          items: [
            {
              id: 'winter-vegetables',
              title: 'Winter Vegetables (December-February)',
              description: 'Rich in vitamins and minerals, perfect for boosting immunity during cold months',
              season: ['winter'],
              category: 'vegetarian',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Spinach (Palak) - 1-2 cups daily, rich in folate and iron',
                'Cauliflower (Gobi) - 2-3 servings per week, high in vitamin C and fiber',
                'Peas (Matar) - 1/2 cup daily, excellent protein and folate source',
                'Carrots (Gajar) - 1 medium carrot daily, rich in beta-carotene',
                'Cabbage (Patta Gobi) - 2-3 servings per week, good for digestion',
                'Broccoli - when available, 3-4 times per week for calcium and folate'
              ],
              warnings: [
                'Wash all vegetables thoroughly to remove pesticides and bacteria',
                'Avoid raw vegetables from street vendors',
                'Cook leafy greens well to prevent foodborne illness'
              ],
              benefits: [
                'High folate content prevents neural tube defects',
                'Iron helps prevent anemia common in high-risk pregnancies',
                'Fiber aids digestion and prevents constipation',
                'Antioxidants boost immune system during cold season'
              ]
            },
            {
              id: 'summer-vegetables',
              title: 'Summer Vegetables (March-June)',
              description: 'Cooling vegetables that help maintain hydration and provide essential nutrients',
              season: ['summer'],
              category: 'vegetarian',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Cucumber (Khira) - 1-2 cups daily, excellent for hydration',
                'Bottle Gourd (Lauki) - 1 cup daily, cooling and easy to digest',
                'Ridge Gourd (Torai) - 3-4 times per week, good for hydration',
                'Okra (Bhindi) - 1/2 cup daily, rich in folate and fiber',
                'Tomatoes - 1-2 medium tomatoes daily, rich in lycopene and vitamin C',
                'Pumpkin (Kaddu) - 2-3 times per week, high in beta-carotene'
              ],
              warnings: [
                'Ensure vegetables are fresh due to high temperatures',
                'Store properly to prevent spoilage',
                'Wash thoroughly as summer vegetables may have more pesticides'
              ],
              benefits: [
                'High water content helps maintain hydration',
                'Cooling properties help manage body temperature',
                'Light and easy to digest during hot weather',
                'Rich in vitamins and minerals essential for pregnancy'
              ]
            },
            {
              id: 'monsoon-vegetables',
              title: 'Monsoon Vegetables (July-September)',
              description: 'Immunity-boosting vegetables safe during the rainy season',
              season: ['monsoon'],
              category: 'vegetarian',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Beans (Sem) - 1/2 cup daily, good protein and fiber source',
                'Bitter Gourd (Karela) - 2-3 times per week, helps regulate blood sugar',
                'Snake Gourd (Chichinda) - when available, good for digestion',
                'Cooked leafy greens only - avoid raw during monsoon',
                'Ginger - 1 tsp daily, helps with nausea and digestion',
                'Turmeric - 1/4 tsp daily, natural anti-inflammatory'
              ],
              warnings: [
                'Avoid raw vegetables completely during monsoon',
                'Cook all vegetables thoroughly to prevent infections',
                'Choose vegetables from trusted sources only',
                'Avoid roadside vendors completely'
              ],
              benefits: [
                'Cooked vegetables are safer during monsoon',
                'Ginger helps with pregnancy-related nausea',
                'Turmeric provides natural immunity boost',
                'High-fiber vegetables aid digestion'
              ]
            }
          ]
        },
        {
          id: 'seasonal-fruits',
          name: 'Seasonal Fruits',
          description: 'Fresh, seasonal fruits available in Lucknow throughout the year',
          icon: Apple,
          bgColor: 'bg-forest-green',
          borderColor: 'border-forest-green/20',
          accentColor: 'bg-forest-green/10',
          items: [
            {
              id: 'winter-fruits',
              title: 'Winter Fruits (December-February)',
              description: 'Vitamin C rich fruits to boost immunity during cold season',
              season: ['winter'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Oranges (Santra) - 1-2 medium oranges daily, rich in vitamin C and folate',
                'Guava (Amrud) - 1 medium guava daily, extremely high in vitamin C',
                'Pomegranate (Anar) - 1/2 cup seeds daily, rich in folate and iron',
                'Custard Apple (Sitaphal) - 1 medium fruit 2-3 times per week',
                'Amla - 1-2 pieces daily, highest natural vitamin C source',
                'Papaya (ripe only) - 1/2 cup daily, rich in folate and digestive enzymes'
              ],
              warnings: [
                'Avoid unripe papaya completely - can cause contractions',
                'Wash all fruits thoroughly before consumption',
                'Avoid pre-cut fruits from vendors',
                'Choose organic when possible to reduce pesticide exposure'
              ],
              benefits: [
                'High vitamin C content boosts immune system',
                'Folate content supports fetal development',
                'Natural sugars provide energy',
                'Fiber helps prevent constipation'
              ]
            },
            {
              id: 'summer-fruits',
              title: 'Summer Fruits (March-June)',
              description: 'Hydrating and cooling fruits perfect for hot Lucknow summers',
              season: ['summer'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Mango (Dasheri from Malihabad) - 1 medium mango daily, rich in vitamins A and C',
                'Watermelon (Tarbooz) - 1-2 cups daily, excellent for hydration',
                'Muskmelon (Kharbuja) - 1 cup daily, cooling and hydrating',
                'Lychee (Litchi) - 8-10 pieces daily when in season',
                'Jackfruit (Kathal) - 1/2 cup when available, rich in vitamin C',
                'Sweet Lime (Mosambi) - 1-2 glasses juice daily, cooling and vitamin C rich'
              ],
              warnings: [
                'Limit mango intake if you have gestational diabetes',
                'Wash thoroughly to remove chemicals used for ripening',
                'Avoid overripe or spoiled fruits due to hot weather',
                'Don\'t consume fruit juices from roadside vendors'
              ],
              benefits: [
                'High water content prevents dehydration',
                'Natural cooling properties help beat the heat',
                'Rich in vitamins essential for pregnancy',
                'Provides natural energy and electrolytes'
              ]
            }
          ]
        },
        {
          id: 'awadhi-cuisine',
          name: 'Modified Awadhi Cuisine',
          description: 'Traditional Lucknow foods modified for pregnancy safety',
          icon: Heart,
          bgColor: 'bg-secondary-brown',
          borderColor: 'border-secondary-brown/20',
          accentColor: 'bg-secondary-brown/10',
          items: [
            {
              id: 'safe-biryanis',
              title: 'Pregnancy-Safe Biryani',
              description: 'Modified traditional biryani recipes suitable for high-risk pregnancies',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'non-vegetarian',
              riskLevel: ['low', 'moderate'],
              recommendations: [
                'Use less ghee and oil - maximum 2 tbsp per serving',
                'Cook meat thoroughly to internal temperature of 75°C (167°F)',
                'Use mild spices only - avoid excessive red chili and garam masala',
                'Add yogurt for probiotic benefits and cooling effect',
                'Include plenty of saffron for its antioxidant properties',
                'Serve with raita to aid digestion'
              ],
              warnings: [
                'Avoid if you have severe morning sickness - rich foods may trigger nausea',
                'High-risk pregnancies should limit to once per week maximum',
                'Avoid restaurant versions - prepare at home for safety',
                'Don\'t eat if reheated multiple times'
              ],
              benefits: [
                'Provides complete protein from meat and rice',
                'Basmati rice has lower glycemic index',
                'Saffron has antioxidant properties',
                'Cultural comfort food that satisfies cravings'
              ]
            },
            {
              id: 'safe-kormas',
              title: 'Light Korma Preparations',
              description: 'Traditional kormas modified with less cream and milder spices',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'non-vegetarian',
              riskLevel: ['low', 'moderate'],
              recommendations: [
                'Replace heavy cream with yogurt or coconut milk',
                'Use minimal oil - cook in non-stick pans',
                'Include onions and tomatoes for natural flavor',
                'Add cashews for healthy fats and creaminess',
                'Use fresh herbs like mint and coriander',
                'Serve with plain rice or roti, not naan'
              ],
              warnings: [
                'Avoid if you have gestational diabetes (due to nuts and dairy)',
                'High-risk patients should limit portion sizes',
                'Ensure meat is fully cooked and fresh',
                'Avoid heavy versions with excessive cream'
              ],
              benefits: [
                'Provides high-quality protein',
                'Nuts provide healthy fats for brain development',
                'Milder spices are easier on sensitive stomachs',
                'Traditional comfort food modified for safety'
              ]
            },
            {
              id: 'vegetarian-awadhi',
              title: 'Vegetarian Awadhi Dishes',
              description: 'Plant-based traditional Lucknow recipes perfect for pregnancy',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'vegetarian',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Dal Tadka with minimal oil and plenty of turmeric',
                'Vegetable Pulao with seasonal vegetables',
                'Paneer dishes with fresh, homemade paneer only',
                'Stuffed parathas with vegetables like spinach and cauliflower',
                'Traditional kheer with jaggery instead of sugar',
                'Lassi with fresh yogurt for probiotics'
              ],
              warnings: [
                'Ensure paneer is made from pasteurized milk',
                'Avoid street food versions completely',
                'Cook all vegetables thoroughly during monsoon',
                'Limit oil and ghee intake'
              ],
              benefits: [
                'High in plant-based proteins and nutrients',
                'Easier to digest than heavy meat dishes',
                'Rich in fiber and essential vitamins',
                'Cultural comfort foods that satisfy cravings safely'
              ]
            }
          ]
        },
        {
          id: 'hydration-nutrition',
          name: 'Hydration & Beverages',
          description: 'Safe and beneficial drinks for high-risk pregnancies in Lucknow\'s climate',
          icon: Droplets,
          bgColor: 'bg-primary-green',
          borderColor: 'border-primary-green/20',
          accentColor: 'bg-primary-green/10',
          items: [
            {
              id: 'daily-hydration',
              title: 'Daily Hydration Requirements',
              description: 'Maintaining proper hydration throughout Lucknow\'s varying climate',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Drink 10-12 glasses (2.5-3 liters) of water daily',
                'Increase to 4 liters during summer months (April-June)',
                'Use boiled and cooled water, especially during monsoon',
                'Add a pinch of rock salt and lemon for electrolyte balance',
                'Drink water every 30 minutes, don\'t wait for thirst',
                'Keep water bottles at room temperature, avoid very cold water'
              ],
              warnings: [
                'Avoid tap water completely - use filtered or boiled water only',
                'Don\'t drink water from public sources or roadside vendors',
                'Avoid ice cubes unless made from safe water',
                'Monitor urine color - should be pale yellow'
              ],
              benefits: [
                'Prevents dehydration common in Lucknow\'s heat',
                'Reduces risk of urinary tract infections',
                'Helps maintain amniotic fluid levels',
                'Aids in nutrient transport to the baby'
              ]
            },
            {
              id: 'herbal-teas',
              title: 'Safe Herbal Teas & Traditional Drinks',
              description: 'Pregnancy-safe traditional beverages popular in Lucknow',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Ginger tea (Adrak chai) - 1-2 cups daily for nausea relief',
                'Mint tea (Pudina chai) - cooling during summer, aids digestion',
                'Fennel water (Saunf water) - soaked overnight, drink in morning',
                'Coconut water - 1-2 glasses daily, natural electrolytes',
                'Buttermilk (Chaas) - with cumin and mint, cooling and probiotic',
                'Fresh lime water with honey - vitamin C and hydration'
              ],
              warnings: [
                'Avoid commercial herbal tea blends - unknown ingredients',
                'Limit caffeine intake to maximum 200mg daily',
                'Don\'t add artificial sweeteners to drinks',
                'Avoid very hot beverages - can cause heartburn'
              ],
              benefits: [
                'Ginger helps with morning sickness and nausea',
                'Natural probiotics support digestive health',
                'Provides essential electrolytes and minerals',
                'Traditional remedies are culturally comforting'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'lifestyle-guidelines',
      title: 'Lifestyle Guidelines',
      subtitle: 'Climate-Adapted Living for Lucknow',
      icon: Heart,
      description: 'Comprehensive lifestyle recommendations adapted for Lucknow\'s climate patterns, cultural practices, and high-risk pregnancy requirements.',
      disclaimer: 'Lifestyle modifications for high-risk pregnancies must be individualized based on your specific conditions. Some recommendations may not be suitable for certain complications.',
      categories: [
        {
          id: 'seasonal-care',
          name: 'Seasonal Health Management',
          description: 'Adapting to Lucknow\'s distinct seasons for optimal pregnancy health',
          icon: Thermometer,
          bgColor: 'bg-primary-green',
          borderColor: 'border-primary-green/20',
          accentColor: 'bg-primary-green/10',
          items: [
            {
              id: 'summer-care',
              title: 'Summer Care (March-June)',
              description: 'Managing Lucknow\'s intense summer heat (up to 45°C) during pregnancy',
              season: ['summer'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Stay indoors during peak hours (11 AM - 4 PM)',
                'Use air conditioning or coolers - maintain 24-26°C indoors',
                'Wear loose, light-colored, cotton clothing',
                'Take cool showers 2-3 times daily',
                'Use wet cloth on forehead and wrists to cool down',
                'Consume cooling foods like cucumber, watermelon, and coconut water',
                'Sleep with wet towel nearby for evaporative cooling'
              ],
              warnings: [
                'Never leave house without sun protection and water bottle',
                'Watch for heat exhaustion signs - dizziness, nausea, rapid heartbeat',
                'Avoid power cuts in air conditioning - have backup cooling plan',
                'Don\'t use ice directly on skin - can cause thermal shock'
              ],
              benefits: [
                'Prevents heat-related complications',
                'Maintains safe body temperature for baby',
                'Reduces stress on cardiovascular system',
                'Prevents dehydration and electrolyte imbalance'
              ]
            },
            {
              id: 'winter-care',
              title: 'Winter Care (December-February)',
              description: 'Managing cold temperatures and fog-related air quality issues',
              season: ['winter'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Layer clothing to maintain warmth without overheating',
                'Use room heaters safely - ensure proper ventilation',
                'Wear mask when going out due to fog and pollution',
                'Take vitamin D supplements due to limited sunlight',
                'Keep feet warm and dry to prevent infections',
                'Use humidifiers to combat dry air from heaters',
                'Stay active indoors to maintain circulation'
              ],
              warnings: [
                'Avoid direct heat from heaters - can cause skin burns',
                'Don\'t use coal-based heating - carbon monoxide risk',
                'Watch for signs of seasonal depression',
                'Avoid going out during heavy fog periods'
              ],
              benefits: [
                'Prevents cold-related infections',
                'Maintains proper blood circulation',
                'Reduces respiratory complications from air pollution',
                'Supports immune system during vulnerable season'
              ]
            },
            {
              id: 'monsoon-care',
              title: 'Monsoon Care (July-September)',
              description: 'Managing high humidity, waterlogging, and infection risks',
              season: ['monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Keep feet dry at all times - change socks frequently',
                'Use umbrellas and waterproof clothing when going out',
                'Maintain strict hygiene - wash hands frequently',
                'Keep emergency supplies in case of flooding',
                'Use mosquito nets and repellents (pregnancy-safe only)',
                'Ensure proper drainage around living areas',
                'Keep emergency contact numbers accessible'
              ],
              warnings: [
                'Avoid walking in waterlogged areas - infection risk',
                'Don\'t use chemical mosquito repellents - use natural alternatives',
                'Watch for signs of fungal infections due to humidity',
                'Avoid going out during heavy rains'
              ],
              benefits: [
                'Prevents water-borne and vector-borne diseases',
                'Maintains personal hygiene despite high humidity',
                'Reduces risk of falls on wet surfaces',
                'Ensures safety during emergency weather conditions'
              ]
            }
          ]
        },
        {
          id: 'daily-routine',
          name: 'Daily Routine Optimization',
          description: 'Structuring daily activities for high-risk pregnancy management',
          icon: Moon,
          bgColor: 'bg-forest-green',
          borderColor: 'border-forest-green/20',
          accentColor: 'bg-forest-green/10',
          items: [
            {
              id: 'sleep-schedule',
              title: 'Sleep & Rest Management',
              description: 'Optimizing sleep quality and rest periods for high-risk pregnancies',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Maintain 8-9 hours of nighttime sleep',
                'Take 1-2 hour afternoon nap, especially during summer',
                'Sleep on left side after 20 weeks for better blood flow',
                'Use pregnancy pillows for support and comfort',
                'Keep bedroom temperature between 20-24°C for optimal sleep',
                'Establish bedtime routine - warm bath, light reading, meditation',
                'Stop screen time 1 hour before bed'
              ],
              warnings: [
                'Avoid sleeping on back after 20 weeks - can reduce blood flow',
                'Don\'t take sleeping pills without doctor approval',
                'Watch for sleep apnea symptoms - snoring, gasping',
                'Avoid heavy meals 3 hours before bedtime'
              ],
              benefits: [
                'Adequate sleep supports fetal growth and development',
                'Reduces stress hormones that can affect pregnancy',
                'Improves immune function and energy levels',
                'Helps regulate blood pressure and blood sugar'
              ]
            },
            {
              id: 'work-life-balance',
              title: 'Work & Activity Management',
              description: 'Balancing professional and personal activities safely',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['moderate', 'high'],
              recommendations: [
                'Take breaks every 1-2 hours if working at desk',
                'Use ergonomic seating with proper back support',
                'Avoid lifting heavy objects (>10 kg after first trimester)',
                'Work from home during extreme weather when possible',
                'Keep snacks and water at workstation',
                'Inform colleagues about pregnancy needs and restrictions',
                'Plan transportation to avoid rush hour stress'
              ],
              warnings: [
                'Avoid jobs with chemical exposure or radiation',
                'Don\'t work extended hours - limit to 8 hours daily',
                'Watch for signs of fatigue and take immediate rest',
                'Avoid standing for more than 30 minutes continuously'
              ],
              benefits: [
                'Maintains financial security during pregnancy',
                'Provides social interaction and mental stimulation',
                'Keeps routine and structure in daily life',
                'Builds confidence for post-delivery return to work'
              ]
            }
          ]
        },
        {
          id: 'environmental-safety',
          name: 'Environmental Safety',
          description: 'Managing Lucknow\'s environmental challenges during pregnancy',
          icon: Shield,
          bgColor: 'bg-secondary-brown',
          borderColor: 'border-secondary-brown/20',
          accentColor: 'bg-secondary-brown/10',
          items: [
            {
              id: 'air-quality',
              title: 'Air Quality Management',
              description: 'Protecting against Lucknow\'s seasonal air pollution',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Use N95 masks when AQI exceeds 150 (especially winter)',
                'Install air purifiers in bedroom and living room',
                'Keep indoor plants like spider plant and peace lily',
                'Check daily AQI before planning outdoor activities',
                'Exercise indoors during high pollution days',
                'Close windows during peak traffic hours (8-10 AM, 6-8 PM)',
                'Use exhaust fans while cooking to remove indoor pollutants'
              ],
              warnings: [
                'Never ignore air quality warnings during pregnancy',
                'Avoid outdoor exercise when AQI exceeds 200',
                'Don\'t use harsh chemical cleaners indoors',
                'Watch for respiratory symptoms - coughing, wheezing'
              ],
              benefits: [
                'Reduces risk of respiratory complications',
                'Protects baby from air pollution effects',
                'Prevents aggravation of pregnancy-related breathing difficulties',
                'Maintains better overall health and energy levels'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'exercise-yoga',
      title: 'Exercise & Yoga Guidelines',
      subtitle: 'Safe Physical Activity for High-Risk Pregnancies',
      icon: Activity,
      description: 'Medically-approved exercise and yoga routines specifically modified for high-risk pregnancies, with safety guidelines and modifications.',
      disclaimer: 'Women with high-risk pregnancies may not be able to exercise at all. ALWAYS get medical clearance from Dr. Amita Shukla before starting any exercise program. Some conditions may require complete rest.',
      categories: [
        {
          id: 'prenatal-yoga',
          name: 'Modified Prenatal Yoga',
          description: 'Safe yoga practices with high-risk pregnancy modifications',
          icon: Heart,
          bgColor: 'bg-primary-green',
          borderColor: 'border-primary-green/20',
          accentColor: 'bg-primary-green/10',
          items: [
            {
              id: 'safe-yoga-poses',
              title: 'Safe Yoga Poses for High-Risk Pregnancy',
              description: 'Gentle poses with modifications and props for safety',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate'],
              recommendations: [
                'Cat-Cow stretches for back pain relief (hands and knees position)',
                'Modified Child\'s Pose with knees wide apart for belly space',
                'Standing poses with wall support for balance',
                'Seated twists (gentle, upper body only)',
                'Prenatal sun salutations with modifications',
                'Deep breathing exercises (Pranayama) for relaxation',
                'Use props: blocks, bolsters, and wall support for all poses'
              ],
              warnings: [
                'NEVER practice if at risk of preterm labor',
                'Avoid all inversions (headstands, handstands)',
                'No lying on back after 16 weeks of pregnancy',
                'No lying on belly at any time during pregnancy',
                'Stop immediately if you feel dizzy, short of breath, or have pain',
                'Avoid hot yoga or heated rooms completely',
                'No deep backbends or intense twisting'
              ],
              benefits: [
                'Improves flexibility and reduces muscle tension',
                'Helps with pregnancy-related back pain',
                'Promotes better sleep and relaxation',
                'Builds strength for labor and delivery',
                'Reduces stress and anxiety levels'
              ]
            },
            {
              id: 'breathing-meditation',
              title: 'Breathing Exercises & Meditation',
              description: 'Safe breathing techniques and mindfulness practices',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Deep belly breathing for 10-15 minutes daily',
                'Alternate nostril breathing (Nadi Shodhana) for balance',
                'Guided meditation focusing on baby connection',
                '4-7-8 breathing technique for sleep and anxiety',
                'Progressive muscle relaxation before bed',
                'Mindful breathing during medical appointments',
                'Practice in comfortable seated position with back support'
              ],
              warnings: [
                'Stop if breathing exercises cause dizziness',
                'Don\'t hold breath for extended periods',
                'Avoid rapid breathing techniques (Bhastrika)',
                'Practice in well-ventilated area only'
              ],
              benefits: [
                'Reduces stress and anxiety levels significantly',
                'Improves sleep quality and duration',
                'Helps manage labor pain naturally',
                'Lowers blood pressure and heart rate',
                'Enhances connection with baby'
              ]
            }
          ]
        },
        {
          id: 'gentle-exercise',
          name: 'Gentle Physical Exercise',
          description: 'Low-impact exercises safe for high-risk pregnancies',
          icon: Activity,
          bgColor: 'bg-forest-green',
          borderColor: 'border-forest-green/20',
          accentColor: 'bg-forest-green/10',
          items: [
            {
              id: 'walking-program',
              title: 'Safe Walking Program',
              description: 'Structured walking routine adapted for Lucknow\'s climate',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate'],
              recommendations: [
                'Start with 10-15 minutes daily, gradually increase to 30 minutes',
                'Walk during cooler parts of day (early morning 6-8 AM)',
                'Choose flat, even surfaces like parks or malls',
                'Wear supportive, comfortable walking shoes',
                'Carry water bottle and take breaks every 10 minutes',
                'Walk with partner or in safe, well-lit areas',
                'Use treadmill during extreme weather conditions'
              ],
              warnings: [
                'Stop walking if you experience contractions, bleeding, or dizziness',
                'Avoid walking during extreme heat (temperature >40°C)',
                'Don\'t walk on uneven or slippery surfaces during monsoon',
                'Avoid busy roads with traffic pollution',
                'Stop if heart rate exceeds 140 bpm (talk test - you should be able to hold conversation)'
              ],
              benefits: [
                'Improves cardiovascular health and circulation',
                'Helps control weight gain during pregnancy',
                'Reduces risk of gestational diabetes',
                'Improves mood and reduces depression',
                'Prepares body for labor and delivery'
              ]
            },
            {
              id: 'swimming-water-exercise',
              title: 'Swimming & Water Exercises',
              description: 'Safe water-based exercises for joint relief and fitness',
              season: ['summer'],
              category: 'general',
              riskLevel: ['low', 'moderate'],
              recommendations: [
                'Swimming in clean, chlorinated pools only',
                'Water walking in shallow end for joint relief',
                'Gentle water aerobics with qualified instructor',
                'Float and gentle movements for relaxation',
                'Swim 20-30 minutes, 3-4 times per week',
                'Enter and exit pool slowly using handrails',
                'Shower before and after swimming'
              ],
              warnings: [
                'Avoid natural water bodies (lakes, rivers) due to infection risk',
                'Don\'t swim in overcrowded or poorly maintained pools',
                'Stop if you feel contractions or unusual symptoms',
                'Avoid diving or jumping into water',
                'Check pool temperature - should be 27-30°C',
                'Don\'t swim alone - always have supervision'
              ],
              benefits: [
                'Excellent full-body, low-impact exercise',
                'Relieves joint pain and swelling',
                'Provides natural resistance training',
                'Cooling effect during hot Lucknow summers',
                'Improves sleep quality and reduces stress'
              ]
            }
          ]
        },
        {
          id: 'contraindicated-activities',
          name: 'Activities to Avoid',
          description: 'Exercises and activities that are unsafe during high-risk pregnancy',
          icon: Shield,
          bgColor: 'bg-secondary-brown',
          borderColor: 'border-secondary-brown/20',
          accentColor: 'bg-secondary-brown/10',
          items: [
            {
              id: 'avoid-exercises',
              title: 'Exercises to Completely Avoid',
              description: 'High-risk activities that can harm mother or baby',
              season: ['winter', 'summer', 'monsoon', 'post-monsoon'],
              category: 'general',
              riskLevel: ['low', 'moderate', 'high'],
              recommendations: [
                'Avoid all contact sports (soccer, basketball, volleyball)',
                'No activities with fall risk (cycling, skiing, horseback riding)',
                'Avoid exercises lying on back after 16 weeks',
                'No heavy weightlifting or intense resistance training',
                'Avoid activities at high altitude or scuba diving',
                'No hot yoga, Bikram yoga, or exercise in heated rooms',
                'Avoid exercises that involve holding breath'
              ],
              warnings: [
                'Risk of falls can cause placental abruption',
                'Overheating can be dangerous for baby\'s development',
                'High-intensity exercise can redirect blood flow from baby',
                'Contact sports risk abdominal trauma',
                'Activities with sudden direction changes risk ligament injury'
              ],
              benefits: [
                'Avoiding these activities prevents serious pregnancy complications',
                'Reduces risk of injury requiring emergency medical care',
                'Protects baby from trauma and oxygen deprivation',
                'Prevents overheating which can cause birth defects'
              ]
            }
          ]
        }
      ]
    }
  ]
};