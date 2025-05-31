import { NextResponse } from 'next/server';

/**
 * GET handler for fetching zodiac sign compatibility
 * Returns compatibility information between two zodiac signs
 * 
 * @returns JSON response with compatibility information
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sign1 = url.searchParams.get('sign1')?.toLowerCase();
    const sign2 = url.searchParams.get('sign2')?.toLowerCase();
    
    if (!sign1 || !sign2) {
      return NextResponse.json({ 
        error: 'Both sign1 and sign2 parameters are required' 
      }, { status: 400 });
    }
    
    // Validate that both signs are valid
    const validSigns = [
      'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];
    
    if (!validSigns.includes(sign1) || !validSigns.includes(sign2)) {
      return NextResponse.json({ 
        error: 'Invalid zodiac sign provided' 
      }, { status: 400 });
    }
    
    // Define compatibility matrix
    // This is a simplified version - in a real app, this would be more detailed
    const compatibilityMatrix: Record<string, Record<string, {
      score: number; // 1-10
      description: string;
    }>> = {
      'aries': {
        'aries': {
          score: 7,
          description: 'Two Aries together create a passionate and energetic relationship. You both understand each other\'s need for independence and adventure. However, power struggles may arise as both signs want to lead. With mutual respect for each other\'s autonomy, this can be a dynamic and exciting partnership.'
        },
        'taurus': {
          score: 5,
          description: 'Aries and Taurus can create a relationship of complementary opposites. Aries brings spontaneity and excitement, while Taurus offers stability and sensuality. Challenges arise when Aries\' impulsiveness clashes with Taurus\' methodical approach. Patience and compromise are key to making this match work.'
        },
        'gemini': {
          score: 8,
          description: 'Aries and Gemini form a dynamic and stimulating partnership. Both signs value freedom and new experiences, creating an exciting relationship full of adventure and communication. Aries provides the initiative while Gemini brings adaptability. This match thrives on constant movement and intellectual engagement.'
        },
        'cancer': {
          score: 6,
          description: 'Aries and Cancer create a relationship of complementary strengths. Aries brings courage and action, while Cancer offers emotional depth and nurturing. Challenges arise when Aries\' bluntness hurts Cancer\'s sensitivity, or when Cancer\'s mood swings frustrate Aries. With understanding, this can be a protective and passionate partnership.'
        },
        'leo': {
          score: 9,
          description: 'Aries and Leo create a fiery, passionate match with high compatibility. Both signs are confident, enthusiastic, and love adventure. You understand each other\'s need for admiration and independence. This relationship features mutual respect, creativity, and excitement, though managing two strong egos requires occasional compromise.'
        },
        'virgo': {
          score: 5,
          description: 'Aries and Virgo create an interesting contrast in energies. Aries brings spontaneity and courage, while Virgo offers practicality and attention to detail. Challenges arise when Aries\' impulsiveness clashes with Virgo\'s careful planning. This relationship requires patience and appreciation for different approaches to life.'
        },
        'libra': {
          score: 7,
          description: 'Aries and Libra form an opposite sign partnership with strong attraction. Aries brings decisiveness and passion, while Libra offers diplomacy and balance. This relationship can be very complementary, with each providing what the other lacks. Challenges arise when Aries\' directness clashes with Libra\'s desire for harmony.'
        },
        'scorpio': {
          score: 6,
          description: 'Aries and Scorpio create an intense and passionate relationship. Both signs are ruled by Mars, giving this match powerful physical chemistry. Challenges arise around control issues, as both want to lead but in different ways. With trust and respect for boundaries, this can be a transformative and deeply loyal partnership.'
        },
        'sagittarius': {
          score: 9,
          description: 'Aries and Sagittarius share an excellent fire sign compatibility. Both value independence, adventure, and straightforward communication. This relationship is marked by enthusiasm, optimism, and a love of new experiences. You understand each other\'s need for freedom and rarely feel threatened by it, creating a vibrant partnership.'
        },
        'capricorn': {
          score: 5,
          description: 'Aries and Capricorn create a relationship of contrasts. Aries brings spontaneity and initiative, while Capricorn offers structure and ambition. Challenges arise when Aries\' need for immediate action conflicts with Capricorn\'s careful planning. With mutual respect, this pair can help balance each other\'s approaches to life.'
        },
        'aquarius': {
          score: 8,
          description: 'Aries and Aquarius share a strong intellectual connection and love of independence. Both signs value authenticity and aren\'t afraid to be themselves. This relationship thrives on friendship, innovation, and respect for individual freedom. Challenges may arise when Aries\' passion meets Aquarius\' emotional detachment.'
        },
        'pisces': {
          score: 6,
          description: 'Aries and Pisces create an intriguing relationship of complementary qualities. Aries brings decisiveness and courage, while Pisces offers compassion and intuition. Challenges arise when Aries\' directness overwhelms Pisces\' sensitivity. This partnership requires Aries to embrace gentleness and Pisces to develop thicker skin.'
        }
      },
      // Taurus compatibility
      'taurus': {
        'aries': {
          score: 5,
          description: 'Taurus and Aries create a relationship of complementary opposites. Taurus offers stability and sensuality, while Aries brings spontaneity and excitement. Challenges arise when Taurus\' methodical approach clashes with Aries\' impulsiveness. Patience and compromise are key to making this match work.'
        },
        'taurus': {
          score: 8,
          description: 'Two Taurus partners create a stable, sensual, and loyal relationship. You share values of security, comfort, and consistency. This match offers deep mutual understanding and unwavering commitment. Challenges may arise around stubbornness when disagreements occur, but your shared patience usually helps resolve issues.'
        },
        'gemini': {
          score: 5,
          description: 'Taurus and Gemini create a relationship with significant differences. Taurus seeks stability and routine, while Gemini craves variety and change. Challenges arise when Taurus\' possessiveness meets Gemini\'s need for freedom. This match requires Taurus to embrace more flexibility and Gemini to appreciate the value of constancy.'
        },
        'cancer': {
          score: 9,
          description: 'Taurus and Cancer create a highly compatible relationship based on shared values of security and loyalty. Both signs appreciate comfort, home life, and emotional constancy. This match offers mutual nurturing, with Taurus providing practical support and Cancer offering emotional understanding. A stable and harmonious partnership.'
        },
        'leo': {
          score: 6,
          description: 'Taurus and Leo create a relationship of fixed sign determination. Both value loyalty and consistency but express it differently. Taurus appreciates Leo\'s warmth and leadership, while Leo admires Taurus\' stability and strength. Challenges arise around Leo\'s need for admiration versus Taurus\' preference for simplicity.'
        },
        'virgo': {
          score: 8,
          description: 'Taurus and Virgo share excellent earth sign compatibility. Both value practicality, reliability, and careful planning. This relationship offers mutual respect for each other\'s work ethic and attention to detail. The match creates a secure, supportive partnership with a strong foundation for long-term commitment.'
        },
        'libra': {
          score: 7,
          description: 'Taurus and Libra share a Venus rulership, creating a relationship with strong aesthetic appreciation and sensuality. Both value harmony and beauty, though they approach life differently. Taurus brings stability while Libra offers social grace. Challenges arise when Taurus\' stubbornness meets Libra\'s indecisiveness.'
        },
        'scorpio': {
          score: 8,
          description: 'Taurus and Scorpio form an opposite sign partnership with powerful attraction. Both value loyalty and determination, creating a deeply committed relationship. Challenges arise around control and possessiveness, as both can be stubborn. With trust, this match creates an intensely passionate and enduring bond.'
        },
        'sagittarius': {
          score: 5,
          description: 'Taurus and Sagittarius create a relationship with significant differences. Taurus seeks stability and routine, while Sagittarius craves adventure and freedom. Challenges arise when Taurus\' desire for security conflicts with Sagittarius\' need for exploration. This match requires substantial compromise and appreciation of differences.'
        },
        'capricorn': {
          score: 9,
          description: 'Taurus and Capricorn share excellent earth sign compatibility. Both value security, practical planning, and material success. This relationship offers mutual respect for tradition and hard work. Together, you create a stable, loyal partnership focused on building a comfortable and successful life together.'
        },
        'aquarius': {
          score: 4,
          description: 'Taurus and Aquarius create a relationship with significant differences. Taurus values tradition and stability, while Aquarius seeks innovation and change. Challenges arise when Taurus\' possessiveness meets Aquarius\' need for independence. This match requires Taurus to embrace more flexibility and Aquarius to offer more reassurance.'
        },
        'pisces': {
          score: 7,
          description: 'Taurus and Pisces share a gentle, sensual compatibility. Taurus offers the stability and security that Pisces needs, while Pisces brings imagination and emotional depth to Taurus\' world. This relationship combines practicality with dreams, creating a supportive partnership where both partners feel understood and valued.'
        }
      },
      // Add entries for all other signs...
    };
    
    // For any sign combinations not explicitly defined above, generate a generic compatibility
    if (!compatibilityMatrix[sign1] || !compatibilityMatrix[sign1][sign2]) {
      // Generate elements based on signs
      const elementMap: Record<string, string> = {
        'aries': 'fire', 'leo': 'fire', 'sagittarius': 'fire',
        'taurus': 'earth', 'virgo': 'earth', 'capricorn': 'earth',
        'gemini': 'air', 'libra': 'air', 'aquarius': 'air',
        'cancer': 'water', 'scorpio': 'water', 'pisces': 'water'
      };
      
      const element1 = elementMap[sign1];
      const element2 = elementMap[sign2];
      
      // Determine compatibility score based on elements
      let score = 5; // Default moderate compatibility
      
      if (element1 === element2) {
        // Same element signs generally get along well
        score = 8;
      } else if (
        (element1 === 'fire' && element2 === 'air') || 
        (element1 === 'air' && element2 === 'fire') ||
        (element1 === 'earth' && element2 === 'water') || 
        (element1 === 'water' && element2 === 'earth')
      ) {
        // Compatible elements
        score = 7;
      } else if (
        (element1 === 'fire' && element2 === 'water') || 
        (element1 === 'water' && element2 === 'fire') ||
        (element1 === 'earth' && element2 === 'air') || 
        (element1 === 'air' && element2 === 'earth')
      ) {
        // Challenging elements
        score = 4;
      }
      
      // Generate a generic compatibility description
      const capitalizedSign1 = sign1.charAt(0).toUpperCase() + sign1.slice(1);
      const capitalizedSign2 = sign2.charAt(0).toUpperCase() + sign2.slice(1);
      
      const description = `${capitalizedSign1} and ${capitalizedSign2} create a relationship with interesting dynamics. With ${capitalizedSign1}'s ${getSignQuality(sign1)} nature and ${capitalizedSign2}'s ${getSignQuality(sign2)} approach, you'll find both common ground and differences to navigate. This relationship offers opportunities for growth through understanding different perspectives.`;
      
      return NextResponse.json({
        sign1: capitalizedSign1,
        sign2: capitalizedSign2,
        score: score,
        description: description,
        elements: {
          sign1: element1,
          sign2: element2
        }
      });
    }
    
    // Return the compatibility information
    const compatibility = compatibilityMatrix[sign1][sign2];
    const capitalizedSign1 = sign1.charAt(0).toUpperCase() + sign1.slice(1);
    const capitalizedSign2 = sign2.charAt(0).toUpperCase() + sign2.slice(1);
    
    return NextResponse.json({
      sign1: capitalizedSign1,
      sign2: capitalizedSign2,
      score: compatibility.score,
      description: compatibility.description,
      elements: {
        sign1: getSignElement(sign1),
        sign2: getSignElement(sign2)
      }
    });
  } catch (error) {
    console.error('Error fetching zodiac compatibility:', error);
    return NextResponse.json({ error: 'Failed to fetch zodiac compatibility' }, { status: 500 });
  }
}

/**
 * Helper function to get a sign's element
 */
function getSignElement(sign: string): string {
  const elementMap: Record<string, string> = {
    'aries': 'fire', 'leo': 'fire', 'sagittarius': 'fire',
    'taurus': 'earth', 'virgo': 'earth', 'capricorn': 'earth',
    'gemini': 'air', 'libra': 'air', 'aquarius': 'air',
    'cancer': 'water', 'scorpio': 'water', 'pisces': 'water'
  };
  
  return elementMap[sign] || 'unknown';
}

/**
 * Helper function to get a sign's quality
 */
function getSignQuality(sign: string): string {
  const qualities: Record<string, string> = {
    'aries': 'assertive',
    'taurus': 'steadfast',
    'gemini': 'adaptable',
    'cancer': 'nurturing',
    'leo': 'confident',
    'virgo': 'analytical',
    'libra': 'harmonious',
    'scorpio': 'intense',
    'sagittarius': 'adventurous',
    'capricorn': 'ambitious',
    'aquarius': 'innovative',
    'pisces': 'compassionate'
  };
  
  return qualities[sign] || 'unique';
}