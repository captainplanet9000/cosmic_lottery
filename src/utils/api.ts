import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserClient } from '@/utils/supabase/client';

// Types for API requests
export interface BirthData {
  fullName: string;
  email: string;
  birthYear: { label: string; value: string };
  birthMonth: { label: string; value: string };
  birthDay: { label: string; value: string };
  birthHour?: { label: string; value: string };
  birthMinute?: { label: string; value: string };
  unknownTime: boolean;
  birthLocation: {
    label: string;
    value: string;
    timezone: string;
  };
}

export interface ReportSection {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export interface AstrologyReport {
  id: string;
  userId: string;
  name: string;
  birthDate: string;
  birthTime: string;
  birthLocation: string;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  sections: ReportSection[];
  createdAt: string;
}

/**
 * Calculate sun sign based on month and day
 */
function calculateSunSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

/**
 * Get a random zodiac sign (for mock data)
 */
function getRandomZodiacSign(): string {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  return signs[Math.floor(Math.random() * signs.length)];
}

/**
 * Generate personality content based on sun sign and name
 */
function generatePersonalityContent(sunSign: string, name: string): string {
  const personalityTraits: Record<string, string[]> = {
    'Aries': ['energetic', 'confident', 'impulsive', 'courageous', 'impatient'],
    'Taurus': ['dependable', 'persistent', 'practical', 'patient', 'stubborn'],
    'Gemini': ['versatile', 'curious', 'communicative', 'adaptable', 'inconsistent'],
    'Cancer': ['intuitive', 'emotional', 'protective', 'sympathetic', 'moody'],
    'Leo': ['generous', 'creative', 'enthusiastic', 'dignified', 'domineering'],
    'Virgo': ['analytical', 'practical', 'diligent', 'modest', 'critical'],
    'Libra': ['diplomatic', 'cooperative', 'fair-minded', 'social', 'indecisive'],
    'Scorpio': ['passionate', 'determined', 'investigative', 'magnetic', 'jealous'],
    'Sagittarius': ['optimistic', 'adventurous', 'independent', 'restless', 'tactless'],
    'Capricorn': ['disciplined', 'responsible', 'ambitious', 'practical', 'pessimistic'],
    'Aquarius': ['original', 'independent', 'humanitarian', 'intellectual', 'aloof'],
    'Pisces': ['compassionate', 'artistic', 'intuitive', 'gentle', 'fearful']
  };
  
  const traits = personalityTraits[sunSign] || personalityTraits['Aries'];
  
  return `
    <p>Your ${sunSign} Sun sign forms the core of your personality, ${name}. You are naturally ${traits[0]} and ${traits[1]}, with a tendency to approach life in a ${traits[2]} way. People often notice your ${traits[3]} nature when they first meet you.</p>
    
    <p>Your planetary alignments suggest that you have a unique blend of qualities that allow you to excel in situations requiring ${traits[0]} and ${traits[2]} approaches. You may sometimes struggle with being too ${traits[4]}, which is a common challenge for ${sunSign} individuals.</p>
    
    <p>Your Mercury placement indicates you communicate in a thoughtful and deliberate manner, processing information through both logical and intuitive channels. This gives you a balanced perspective when solving problems or making important decisions.</p>
  `;
}/**
 * Generate career content based on sun sign
 */
function generateCareerContent(sunSign: string): string {
  const careerPaths: Record<string, string[]> = {
    'Aries': ['entrepreneurship', 'sports', 'military', 'leadership positions', 'emergency services'],
    'Taurus': ['finance', 'real estate', 'agriculture', 'luxury goods', 'culinary arts'],
    'Gemini': ['communications', 'writing', 'teaching', 'sales', 'public relations'],
    'Cancer': ['healthcare', 'food industry', 'childcare', 'real estate', 'history'],
    'Leo': ['entertainment', 'management', 'politics', 'design', 'education'],
    'Virgo': ['healthcare', 'research', 'editing', 'analytics', 'administration'],
    'Libra': ['law', 'diplomacy', 'design', 'counseling', 'human resources'],
    'Scorpio': ['psychology', 'investigation', 'medicine', 'research', 'finance'],
    'Sagittarius': ['travel', 'higher education', 'publishing', 'law', 'outdoor activities'],
    'Capricorn': ['business', 'finance', 'government', 'architecture', 'engineering'],
    'Aquarius': ['technology', 'science', 'social activism', 'humanitarian work', 'invention'],
    'Pisces': ['arts', 'healthcare', 'spirituality', 'psychology', 'charity work']
  };
  
  const careers = careerPaths[sunSign] || careerPaths['Aries'];
  
  return `
    <p>Your astrological profile indicates strong potential in fields related to ${careers[0]} and ${careers[1]}. Your natural talents align well with careers that require ${careers[2]} skills or knowledge.</p>
    
    <p>Jupiter's placement in your chart suggests opportunity for growth through ${careers[3]}, while Saturn indicates areas where you might face challenges but ultimately develop mastery through dedicated effort.</p>
    
    <p>Your North Node suggests that your highest professional fulfillment will come from work that allows you to utilize your natural ${sunSign} qualities while pushing beyond your comfort zone to develop new skills related to ${careers[4]}.</p>
  `;
}

/**
 * Generate relationships content based on sun sign
 */
function generateRelationshipsContent(sunSign: string): string {
  const relationshipTraits: Record<string, string[]> = {
    'Aries': ['passionate', 'direct', 'independent', 'enthusiastic', 'impulsive'],
    'Taurus': ['loyal', 'sensual', 'reliable', 'possessive', 'patient'],
    'Gemini': ['communicative', 'adaptable', 'curious', 'inconsistent', 'playful'],
    'Cancer': ['nurturing', 'protective', 'emotionally deep', 'moody', 'devoted'],
    'Leo': ['generous', 'warm', 'dramatic', 'dominant', 'faithful'],
    'Virgo': ['attentive', 'helpful', 'analytical', 'critical', 'modest'],
    'Libra': ['harmonious', 'romantic', 'diplomatic', 'indecisive', 'fair-minded'],
    'Scorpio': ['intense', 'passionate', 'loyal', 'secretive', 'possessive'],
    'Sagittarius': ['adventurous', 'optimistic', 'honest', 'restless', 'freedom-loving'],
    'Capricorn': ['loyal', 'stable', 'traditional', 'reserved', 'responsible'],
    'Aquarius': ['unique', 'independent', 'friendly', 'detached', 'unconventional'],
    'Pisces': ['empathetic', 'romantic', 'spiritual', 'escapist', 'compassionate']
  };
  
  const traits = relationshipTraits[sunSign] || relationshipTraits['Aries'];
  
  return `
    <p>In relationships, your ${sunSign} nature makes you naturally ${traits[0]} and ${traits[1]}. You tend to seek partners who appreciate your ${traits[2]} approach to love and connection.</p>
    
    <p>Venus in your chart suggests you express affection through ${traits[3]} gestures and value ${traits[4]} qualities in a partner. You may sometimes struggle with balancing independence and togetherness in relationships.</p>
    
    <p>Your 7th house placement indicates that relationships play a significant role in your personal growth journey. Through partnerships, you learn important lessons about yourself and develop a deeper understanding of your needs and boundaries.</p>
  `;
}/**
 * Generate karmic lessons content
 */
function generateKarmicContent(): string {
  const karmicLessons = [
    'developing patience and persistence through challenging circumstances',
    'learning to balance self-reliance with healthy interdependence',
    'cultivating emotional intelligence and deeper self-awareness',
    'transforming fear into courage and decisive action',
    'integrating spiritual wisdom into practical daily life'
  ];
  
  // Randomly select lessons for demo purposes
  const lesson1 = karmicLessons[Math.floor(Math.random() * karmicLessons.length)];
  let lesson2 = karmicLessons[Math.floor(Math.random() * karmicLessons.length)];
  while (lesson2 === lesson1) {
    lesson2 = karmicLessons[Math.floor(Math.random() * karmicLessons.length)];
  }
  
  return `
    <p>Your South Node placement suggests past life patterns related to ${lesson1}. You came into this life with certain tendencies and comforts that may no longer serve your highest evolution.</p>
    
    <p>Your karmic journey in this lifetime involves ${lesson2}. The challenges you face in this area are not coincidental but purposefully designed to help you grow beyond old patterns.</p>
    
    <p>Chiron's position in your chart indicates a core wound related to self-expression and creative confidence. Healing this wound is a significant part of your soul's journey and will unlock greater authenticity and purpose in your life.</p>
  `;
}

/**
 * Generate transits content
 */
function generateTransitsContent(): string {
  const transitEvents = [
    'Jupiter entering your 10th house, expanding career opportunities and public recognition',
    'Saturn forming a trine to your natal Sun, supporting long-term goals and structured growth',
    'Uranus making a square to your natal Moon, triggering emotional breakthroughs and lifestyle changes',
    'Neptune transiting your 7th house, bringing both inspiration and clarity to relationships',
    'Pluto forming an opposition to your natal Venus, transforming your values and approach to love'
  ];
  
  // Randomly select transits for demo purposes
  const transit1 = transitEvents[Math.floor(Math.random() * transitEvents.length)];
  let transit2 = transitEvents[Math.floor(Math.random() * transitEvents.length)];
  while (transit2 === transit1) {
    transit2 = transitEvents[Math.floor(Math.random() * transitEvents.length)];
  }
  let transit3 = transitEvents[Math.floor(Math.random() * transitEvents.length)];
  while (transit3 === transit1 || transit3 === transit2) {
    transit3 = transitEvents[Math.floor(Math.random() * transitEvents.length)];
  }
  
  return `
    <p>The coming 12 months feature significant planetary movements affecting your chart, with ${transit1}. This influence will be particularly strong through the next 3-4 months.</p>
    
    <p>Another key transit involves ${transit2}. This energy may feel challenging at times but offers tremendous growth potential if you remain flexible and open to new perspectives.</p>
    
    <p>Later in the year, you'll experience ${transit3}. This represents an important opportunity to make conscious choices that align with your authentic self and highest aspirations.</p>
  `;
}/**
 * Generate an astrological report using the OpenAI API
 * @param birthData The user's birth data
 * @returns A promise that resolves to the generated report
 */
export const generateAstrologyReport = async (
  birthData: BirthData
): Promise<AstrologyReport> => {
  try {
    // In a real implementation, we'd call our backend API
    // which would then make the OpenAI API request
    // For demo purposes, we'll simulate the API call
    
    // Normally, you'd do something like:
    // const response = await axios.post('/api/generate-report', birthData);
    // return response.data;
    
    // Calculate sun sign based on month and day (simplified)
    const sunSign = calculateSunSign(
      parseInt(birthData.birthMonth.value), 
      parseInt(birthData.birthDay.value)
    );
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Store report in Supabase (would be implemented in real app)
    // const supabase = createBrowserClient();
    
    // Mock report data
    const reportId = uuidv4();
    const report: AstrologyReport = {
      id: reportId,
      userId: 'user-123', // Would normally come from authentication
      name: birthData.fullName,
      birthDate: `${birthData.birthMonth.label} ${birthData.birthDay.label}, ${birthData.birthYear.label}`,
      birthTime: birthData.unknownTime ? 'Unknown' : `${birthData.birthHour?.label || '00'}:${birthData.birthMinute?.label || '00'}`,
      birthLocation: birthData.birthLocation.label,
      sunSign,
      moonSign: getRandomZodiacSign(), // Would be calculated properly in real implementation
      ascendant: getRandomZodiacSign(), // Would be calculated properly in real implementation
      sections: [
        {
          id: 'personality',
          title: 'Personality Profile',
          icon: '👤',
          content: generatePersonalityContent(sunSign, birthData.fullName)
        },
        {
          id: 'career',
          title: 'Career & Vocation',
          icon: '💼',
          content: generateCareerContent(sunSign)
        },
        {
          id: 'relationships',
          title: 'Relationships & Love',
          icon: '❤️',
          content: generateRelationshipsContent(sunSign)
        },
        {
          id: 'karmic',
          title: 'Karmic Lessons',
          icon: '🔮',
          content: generateKarmicContent()
        },
        {
          id: 'transits',
          title: 'Current Transits',
          icon: '🌠',
          content: generateTransitsContent()
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    // In a real implementation, we would save this to the database
    // await supabase.from('reports').insert(report);
    
    return report;
  } catch (error) {
    console.error('Error generating report:', error);
    throw new Error('Failed to generate astrological report. Please try again later.');
  }
};

// Simulate payment processing with Stripe
export const processPayment = async (paymentMethod: any, amount: number): Promise<{ success: boolean; message: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, we'd call our backend API
    // which would then make the Stripe API request
    // const response = await axios.post('/api/process-payment', { paymentMethod, amount });
    // return response.data;
    
    // For demo purposes, always return success
    return {
      success: true,
      message: 'Payment processed successfully.'
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    return {
      success: false,
      message: 'Payment processing failed. Please try again.'
    };
  }
};

// Export all necessary functions
export default {
  generateAstrologyReport,
  processPayment
};