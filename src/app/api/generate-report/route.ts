import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';
import { BirthData } from '@/utils/api';
import { v4 as uuidv4 } from 'uuid';

// Helper functions to generate report content (simplified versions)
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

// Return a random zodiac sign for mock data
function getRandomZodiacSign(): string {
  const signs = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  return signs[Math.floor(Math.random() * signs.length)];
}

// Simple mock functions for content generation
function generatePersonalityContent(sunSign: string, name: string): string {
  return `<p>Your ${sunSign} Sun sign forms the core of your personality, ${name}. 
    You have a natural inclination toward leadership and innovation.</p>
    <p>With your planetary alignments, you demonstrate a unique blend of creativity and analytical thinking.</p>
    <p>Your Mercury placement indicates you communicate in a thoughtful and deliberate manner.</p>`;
}

function generateCareerContent(sunSign: string): string {
  return `<p>Your astrological profile indicates strong potential in fields related to technology and creative arts.</p>
    <p>Jupiter's placement suggests opportunity for growth through leadership positions.</p>
    <p>Your North Node suggests that your highest professional fulfillment will come from work that allows you to express your ${sunSign} qualities.</p>`;
}

function generateRelationshipsContent(sunSign: string): string {
  return `<p>In relationships, your ${sunSign} nature makes you naturally empathetic and intuitive.</p>
    <p>Venus in your chart suggests you express affection through thoughtful gestures.</p>
    <p>Your 7th house placement indicates that relationships play a significant role in your personal growth journey.</p>`;
}

function generateKarmicContent(): string {
  return `<p>Your South Node placement suggests past life patterns related to leadership and authority.</p>
    <p>Your karmic journey in this lifetime involves developing greater emotional intelligence.</p>
    <p>Chiron's position indicates a core wound related to self-expression that can be healed through creativity.</p>`;
}

function generateTransitsContent(): string {
  return `<p>The coming 12 months feature Jupiter entering your 10th house, expanding career opportunities.</p>
    <p>Saturn forms a trine to your natal Sun, supporting long-term goals and structured growth.</p>
    <p>Later in the year, you'll experience Uranus making a square to your natal Moon, triggering emotional breakthroughs.</p>`;
}// POST handler for generating a report
export async function POST(request: Request) {
  try {
    const birthData: BirthData = await request.json();
    
    // Validate the birth data
    if (!birthData.fullName || !birthData.email || !birthData.birthYear || 
        !birthData.birthMonth || !birthData.birthDay || !birthData.birthLocation) {
      return NextResponse.json({ error: 'Missing required birth data' }, { status: 400 });
    }
    
    // Calculate sun sign
    const sunSign = calculateSunSign(
      parseInt(birthData.birthMonth.value), 
      parseInt(birthData.birthDay.value)
    );
    
    // Generate mock moon sign and ascendant for demo purposes
    // In a real implementation, these would be calculated based on accurate birth data
    const moonSign = getRandomZodiacSign();
    const ascendant = getRandomZodiacSign();
    
    // In a real implementation, we would call the OpenAI API here
    // For demo purposes, we'll use our helper functions to generate content
    
    // Create report sections
    const sections = [
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
    ];
    
    // Construct the report object
    const reportId = uuidv4();
    const report = {
      id: reportId,
      user_id: 'user-123', // In a real app, this would come from authentication
      name: birthData.fullName,
      email: birthData.email,
      birth_date: `${birthData.birthMonth.label} ${birthData.birthDay.label}, ${birthData.birthYear.label}`,
      birth_time: birthData.unknownTime ? 'Unknown' : `${birthData.birthHour?.label || '00'}:${birthData.birthMinute?.label || '00'}`,
      birth_location: birthData.birthLocation.label,
      sun_sign: sunSign,
      moon_sign: moonSign,
      ascendant: ascendant,
      content: sections,
      created_at: new Date().toISOString()
    };
    
    // In a real implementation, we would save this to the database
    // const supabase = createServerClient();
    // const { data, error } = await supabase.from('reports').insert(report).select('id').single();
    // 
    // if (error) {
    //   console.error('Error saving report:', error);
    //   return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
    // }
    
    // For demo purposes, we'll just return the report
    return NextResponse.json({
      id: reportId,
      userId: 'user-123',
      name: birthData.fullName,
      birthDate: `${birthData.birthMonth.label} ${birthData.birthDay.label}, ${birthData.birthYear.label}`,
      birthTime: birthData.unknownTime ? 'Unknown' : `${birthData.birthHour?.label || '00'}:${birthData.birthMinute?.label || '00'}`,
      birthLocation: birthData.birthLocation.label,
      sunSign,
      moonSign,
      ascendant,
      sections,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}