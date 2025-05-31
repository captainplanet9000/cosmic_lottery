import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

interface Horoscope {
  id: string;
  sign: string;
  date: string;
  prediction: string;
  lucky_numbers: number[];
  mood: string;
  compatibility: string;
  created_at: string;
}

/**
 * GET handler for fetching daily horoscopes
 * Returns horoscope for a specific sign or all signs if no sign is specified
 * 
 * @returns JSON response with horoscope information
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sign = url.searchParams.get('sign')?.toLowerCase();
    const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];
    
    // In a real implementation, we would fetch horoscopes from the database
    // const supabase = createServerClient();
    // 
    // if (sign) {
    //   // Fetch horoscope for specific sign
    //   const { data, error } = await supabase
    //     .from('horoscopes')
    //     .select('*')
    //     .eq('sign', sign)
    //     .eq('date', date)
    //     .single();
    //   
    //   if (error) {
    //     console.error('Error fetching horoscope:', error);
    //     return NextResponse.json({ error: 'Failed to fetch horoscope' }, { status: 500 });
    //   }
    //   
    //   if (!data) {
    //     // Generate a new horoscope if it doesn't exist
    //     const newHoroscope = await generateHoroscope(sign, date);
    //     const { data: savedHoroscope, error: saveError } = await supabase
    //       .from('horoscopes')
    //       .insert(newHoroscope)
    //       .select()
    //       .single();
    //     
    //     if (saveError) {
    //       console.error('Error saving horoscope:', saveError);
    //       return NextResponse.json(newHoroscope);
    //     }
    //     
    //     return NextResponse.json(savedHoroscope);
    //   }
    //   
    //   return NextResponse.json(data);
    // } else {
    //   // Fetch horoscopes for all signs
    //   const { data, error } = await supabase
    //     .from('horoscopes')
    //     .select('*')
    //     .eq('date', date);
    //   
    //   if (error) {
    //     console.error('Error fetching horoscopes:', error);
    //     return NextResponse.json({ error: 'Failed to fetch horoscopes' }, { status: 500 });
    //   }
    //   
    //   // If we don't have horoscopes for all signs, generate the missing ones
    //   const signs = [
    //     'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    //     'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    //   ];
    //   
    //   const existingSigns = data.map(h => h.sign);
    //   const missingSigns = signs.filter(s => !existingSigns.includes(s));
    //   
    //   if (missingSigns.length > 0) {
    //     const newHoroscopes = await Promise.all(
    //       missingSigns.map(s => generateHoroscope(s, date))
    //     );
    //     
    //     const { data: savedHoroscopes, error: saveError } = await supabase
    //       .from('horoscopes')
    //       .insert(newHoroscopes)
    //       .select();
    //     
    //     if (saveError) {
    //       console.error('Error saving horoscopes:', saveError);
    //       return NextResponse.json([...data, ...newHoroscopes]);
    //     }
    //     
    //     return NextResponse.json([...data, ...savedHoroscopes]);
    //   }
    //   
    //   return NextResponse.json(data);
    // }
    
    // For demo purposes, we'll generate mock horoscopes
    const validSigns = [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];
    
    if (sign && !validSigns.includes(sign)) {
      return NextResponse.json({ error: 'Invalid zodiac sign' }, { status: 400 });
    }
    
    if (sign) {
      // Return horoscope for specific sign
      const horoscope = generateMockHoroscope(sign, date);
      return NextResponse.json(horoscope);
    } else {
      // Return horoscopes for all signs
      const horoscopes = validSigns.map(s => generateMockHoroscope(s, date));
      return NextResponse.json(horoscopes);
    }
  } catch (error) {
    console.error('Error fetching horoscope:', error);
    return NextResponse.json({ error: 'Failed to fetch horoscope' }, { status: 500 });
  }
}

/**
 * Helper function to generate a mock horoscope
 */
function generateMockHoroscope(sign: string, date: string): Horoscope {
  // Content templates for different aspects of the horoscope
  const intros = [
    "The cosmic energy today is particularly favorable for you.",
    "The planetary alignment suggests interesting developments ahead.",
    "Today's celestial configuration brings important messages.",
    "The stars are aligning in a way that highlights your natural strengths.",
    "A unique cosmic pattern forms today, influencing your path."
  ];
  
  const middles = {
    'aries': [
      "Your natural leadership abilities will shine through in group settings.",
      "Take initiative on that project you've been hesitating about.",
      "Your competitive spirit serves you well in overcoming challenges.",
      "Channel your abundant energy into physical activities for best results."
    ],
    'taurus': [
      "Focus on building security and stability in your financial matters.",
      "Your patience will be rewarded in a long-term investment or relationship.",
      "Take time to appreciate beauty and comfort in your surroundings.",
      "Your practical approach helps solve a persistent problem."
    ],
    'gemini': [
      "Communication flows easily today; express your ideas confidently.",
      "Your adaptability allows you to navigate changing circumstances.",
      "Intellectual pursuits are favored; learn something new.",
      "Your curiosity leads to valuable discoveries and connections."
    ],
    'cancer': [
      "Trust your intuition regarding a family matter or home situation.",
      "Your nurturing nature is appreciated by those close to you.",
      "Creating a comfortable environment helps your emotional well-being.",
      "Past memories provide valuable insights for current decisions."
    ],
    'leo': [
      "Your creative expression catches positive attention today.",
      "Leadership opportunities arise where you can shine brightly.",
      "Generosity toward others returns to you in unexpected ways.",
      "Your warm-hearted approach opens doors previously closed."
    ],
    'virgo': [
      "Attention to detail helps you excel where others miss important elements.",
      "Your analytical skills solve a complex problem efficiently.",
      "Practical improvements to your daily routine yield significant benefits.",
      "Your helpfulness is recognized and valued by colleagues."
    ],
    'libra': [
      "Harmonious interactions characterize your social encounters today.",
      "Your diplomatic skills help resolve a tense situation.",
      "Aesthetic considerations influence important decisions favorably.",
      "Balance between work and relationships brings fulfillment."
    ],
    'scorpio': [
      "Your intuitive insights reveal hidden truths or opportunities.",
      "Transformative energies support positive changes you initiate.",
      "Deep connections with others satisfy your need for meaningful interaction.",
      "Research and investigation lead to valuable discoveries."
    ],
    'sagittarius': [
      "Exploration of new ideas or places brings exciting possibilities.",
      "Your optimistic outlook helps overcome obstacles effortlessly.",
      "Educational pursuits expand your horizons in unexpected ways.",
      "Truth-seeking leads to philosophical breakthroughs."
    ],
    'capricorn': [
      "Disciplined efforts toward long-term goals yield measurable progress.",
      "Your practical wisdom solves a challenging professional situation.",
      "Authority figures recognize your reliability and competence.",
      "Structured planning improves efficiency and effectiveness."
    ],
    'aquarius': [
      "Innovative thinking generates solutions others haven't considered.",
      "Your humanitarian values guide you toward meaningful contributions.",
      "Networking with like-minded individuals advances shared goals.",
      "Embracing your uniqueness leads to unexpected opportunities."
    ],
    'pisces': [
      "Creative inspiration flows easily; trust your artistic impulses.",
      "Your compassionate nature helps someone through a difficult time.",
      "Spiritual insights provide guidance for important decisions.",
      "Boundaries between dreams and reality blur in productive ways."
    ]
  };
  
  const conclusions = [
    "Take time to reflect on your priorities for best results.",
    "Staying flexible will help you make the most of today's opportunities.",
    "Trust your instincts when making important choices.",
    "Balance action with reflection for optimal progress.",
    "Self-care should be a priority amidst your busy schedule."
  ];
  
  // Generate compatible sign
  const signs = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];
  const compatibleSign = signs.filter(s => s !== sign)[Math.floor(Math.random() * 11)];
  
  // Generate lucky numbers
  const luckyNumbers: number[] = [];
  while (luckyNumbers.length < 5) {
    const num = Math.floor(Math.random() * 99) + 1;
    if (!luckyNumbers.includes(num)) {
      luckyNumbers.push(num);
    }
  }
  
  // Generate mood
  const moods = [
    'Energetic', 'Reflective', 'Creative', 'Focused', 'Relaxed',
    'Adventurous', 'Confident', 'Hopeful', 'Curious', 'Balanced',
    'Inspired', 'Determined', 'Peaceful', 'Optimistic', 'Imaginative'
  ];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  
  // Construct the prediction
  const intro = intros[Math.floor(Math.random() * intros.length)];
  const middle = middles[sign as keyof typeof middles][Math.floor(Math.random() * 4)];
  const conclusion = conclusions[Math.floor(Math.random() * conclusions.length)];
  
  const prediction = `${intro} ${middle} ${conclusion}`;
  
  // Format the compatible sign with proper capitalization
  const formattedCompatibleSign = compatibleSign.charAt(0).toUpperCase() + compatibleSign.slice(1);
  
  return {
    id: uuidv4(),
    sign: sign,
    date: date,
    prediction: prediction,
    lucky_numbers: luckyNumbers,
    mood: mood,
    compatibility: formattedCompatibleSign,
    created_at: new Date().toISOString()
  };
}