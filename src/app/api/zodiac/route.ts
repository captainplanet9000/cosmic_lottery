import { NextResponse } from 'next/server';

/**
 * GET handler for fetching zodiac sign information
 * Returns information about all zodiac signs or a specific sign if queried
 * 
 * @returns JSON response with zodiac sign information
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const sign = url.searchParams.get('sign')?.toLowerCase();
    
    // Define all zodiac signs and their information
    const zodiacSigns = [
      {
        id: 'aries',
        name: 'Aries',
        symbol: '♈',
        element: 'Fire',
        ruling_planet: 'Mars',
        dates: 'March 21 - April 19',
        traits: ['Ambitious', 'Independent', 'Impatient'],
        strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
        weaknesses: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive'],
        compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
        description: 'Aries is the first sign of the zodiac, and those born under this sign are bold and ambitious. They are eager to be the leader of the pack, first in line to get things going. Quick to anger but also to forgive, Aries is known for having a hot temper.',
        career_strengths: ['Leadership', 'Entrepreneurship', 'Sports', 'Military'],
        love_traits: 'In relationships, Aries is passionate and direct. They value honesty and authenticity from their partners.'
      },
      {
        id: 'taurus',
        name: 'Taurus',
        symbol: '♉',
        element: 'Earth',
        ruling_planet: 'Venus',
        dates: 'April 20 - May 20',
        traits: ['Reliable', 'Patient', 'Practical'],
        strengths: ['Reliable', 'Patient', 'Practical', 'Devoted'],
        weaknesses: ['Stubborn', 'Possessive', 'Uncompromising'],
        compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
        description: 'Taurus is an earth sign represented by the bull. Those born under this sign enjoy relaxing in serene, bucolic environments, surrounded by soft sounds, soothing aromas, and succulent flavors. They are known for their practicality, reliability, and affinity for luxury.',
        career_strengths: ['Finance', 'Art', 'Real Estate', 'Agriculture'],
        love_traits: 'In relationships, Taurus is loyal and stable. They value security and can be quite romantic and sensual.'
      },
      {
        id: 'gemini',
        name: 'Gemini',
        symbol: '♊',
        element: 'Air',
        ruling_planet: 'Mercury',
        dates: 'May 21 - June 20',
        traits: ['Curious', 'Adaptable', 'Communicative'],
        strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable'],
        weaknesses: ['Nervous', 'Inconsistent', 'Indecisive'],
        compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo'],
        description: 'Gemini is represented by the twins, a symbol of duality. Those born under this sign are versatile, expressive, and quick-witted. They are intellectually inclined, constantly on the move, and very sociable.',
        career_strengths: ['Communication', 'Writing', 'Media', 'Sales'],
        love_traits: 'In relationships, Gemini is engaging and communicative. They value intellectual connection and can be playfully flirtatious.'
      },
      {
        id: 'cancer',
        name: 'Cancer',
        symbol: '♋',
        element: 'Water',
        ruling_planet: 'Moon',
        dates: 'June 21 - July 22',
        traits: ['Emotional', 'Protective', 'Intuitive'],
        strengths: ['Tenacious', 'Highly Imaginative', 'Loyal', 'Emotional'],
        weaknesses: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative'],
        compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
        description: 'Cancer is a water sign represented by the crab. Those born under this sign are known for their emotional depth, nurturing nature, and attachment to home and family. They are highly intuitive and can be quite tenacious when protecting loved ones.',
        career_strengths: ['Nursing', 'Teaching', 'Culinary Arts', 'Social Work'],
        love_traits: 'In relationships, Cancer is nurturing and protective. They value emotional security and deep connection.'
      },
      {
        id: 'leo',
        name: 'Leo',
        symbol: '♌',
        element: 'Fire',
        ruling_planet: 'Sun',
        dates: 'July 23 - August 22',
        traits: ['Creative', 'Passionate', 'Generous'],
        strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted'],
        weaknesses: ['Arrogant', 'Stubborn', 'Self-centered'],
        compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
        description: 'Leo is a fire sign represented by the lion. Those born under this sign are natural leaders, dramatic, creative, and confident. They love being in the spotlight and celebrating life. They are generous, loyal, and extremely prideful.',
        career_strengths: ['Entertainment', 'Management', 'Politics', 'Design'],
        love_traits: 'In relationships, Leo is passionate and loyal. They value admiration and can be quite romantic and dramatic in expressing love.'
      },
      {
        id: 'virgo',
        name: 'Virgo',
        symbol: '♍',
        element: 'Earth',
        ruling_planet: 'Mercury',
        dates: 'August 23 - September 22',
        traits: ['Analytical', 'Practical', 'Diligent'],
        strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
        weaknesses: ['Overly Critical', 'Perfectionist', 'Shy'],
        compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
        description: 'Virgo is an earth sign represented by the goddess of wheat and agriculture. Those born under this sign are methodical, analytical, and practical. They have an eye for detail and are service-oriented, always ready to help others improve.',
        career_strengths: ['Healthcare', 'Research', 'Analysis', 'Editing'],
        love_traits: 'In relationships, Virgo is attentive and supportive. They value honesty and can be quite devoted to helping their partners grow.'
      },
      {
        id: 'libra',
        name: 'Libra',
        symbol: '♎',
        element: 'Air',
        ruling_planet: 'Venus',
        dates: 'September 23 - October 22',
        traits: ['Diplomatic', 'Fair-minded', 'Social'],
        strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded'],
        weaknesses: ['Indecisive', 'Avoids Confrontation', 'Self-pitying'],
        compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
        description: 'Libra is an air sign represented by the scales, a symbol of balance and harmony. Those born under this sign are concerned with creating equilibrium in all aspects of life. They are diplomatic, relationship-oriented, and have a strong sense of justice.',
        career_strengths: ['Law', 'Diplomacy', 'Design', 'Counseling'],
        love_traits: 'In relationships, Libra is harmonious and partnership-oriented. They value balance and can be quite charming and romantic.'
      },
      {
        id: 'scorpio',
        name: 'Scorpio',
        symbol: '♏',
        element: 'Water',
        ruling_planet: 'Pluto, Mars',
        dates: 'October 23 - November 21',
        traits: ['Passionate', 'Intense', 'Mysterious'],
        strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'],
        weaknesses: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
        compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
        description: 'Scorpio is a water sign represented by the scorpion. Those born under this sign are intense, passionate, and enigmatic. They have deep emotional reserves and are known for their powerful intuition and investigative nature.',
        career_strengths: ['Investigation', 'Psychology', 'Surgery', 'Research'],
        love_traits: 'In relationships, Scorpio is passionate and loyal. They value trust and can be intensely devoted once they commit.'
      },
      {
        id: 'sagittarius',
        name: 'Sagittarius',
        symbol: '♐',
        element: 'Fire',
        ruling_planet: 'Jupiter',
        dates: 'November 22 - December 21',
        traits: ['Optimistic', 'Freedom-loving', 'Philosophical'],
        strengths: ['Generous', 'Idealistic', 'Great Sense of Humor'],
        weaknesses: ['Promises More than Can Deliver', 'Very Impatient', 'Will Say Anything'],
        compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
        description: 'Sagittarius is a fire sign represented by the archer. Those born under this sign are optimistic, freedom-loving, and philosophical. They have a love for travel, learning, and exploring new ideas and cultures.',
        career_strengths: ['Academia', 'Travel', 'Philosophy', 'Sports'],
        love_traits: 'In relationships, Sagittarius is adventurous and honest. They value freedom and can be quite enthusiastic and spontaneous.'
      },
      {
        id: 'capricorn',
        name: 'Capricorn',
        symbol: '♑',
        element: 'Earth',
        ruling_planet: 'Saturn',
        dates: 'December 22 - January 19',
        traits: ['Responsible', 'Disciplined', 'Self-controlled'],
        strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
        weaknesses: ['Know-it-all', 'Unforgiving', 'Condescending', 'Expecting the worst'],
        compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
        description: 'Capricorn is an earth sign represented by the sea goat. Those born under this sign are ambitious, practical, and disciplined. They are excellent at setting and achieving long-term goals and have a strong sense of responsibility.',
        career_strengths: ['Business', 'Finance', 'Architecture', 'Engineering'],
        love_traits: 'In relationships, Capricorn is loyal and committed. They value stability and can be quite traditional in their approach to partnerships.'
      },
      {
        id: 'aquarius',
        name: 'Aquarius',
        symbol: '♒',
        element: 'Air',
        ruling_planet: 'Uranus, Saturn',
        dates: 'January 20 - February 18',
        traits: ['Progressive', 'Original', 'Independent'],
        strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
        weaknesses: ['Runs from Emotional Expression', 'Temperamental', 'Uncompromising'],
        compatibility: ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
        description: 'Aquarius is an air sign represented by the water bearer. Those born under this sign are innovative, progressive, and humanitarian. They are visionaries who are deeply concerned with social causes and intellectual pursuits.',
        career_strengths: ['Science', 'Technology', 'Social Reform', 'Invention'],
        love_traits: 'In relationships, Aquarius is independent and intellectually stimulating. They value friendship and can be quite unconventional in their approach to love.'
      },
      {
        id: 'pisces',
        name: 'Pisces',
        symbol: '♓',
        element: 'Water',
        ruling_planet: 'Neptune, Jupiter',
        dates: 'February 19 - March 20',
        traits: ['Compassionate', 'Artistic', 'Intuitive'],
        strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
        weaknesses: ['Fearful', 'Overly Trusting', 'Desire to Escape Reality'],
        compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn'],
        description: 'Pisces is a water sign represented by two fish swimming in opposite directions. Those born under this sign are empathetic, creative, and deeply intuitive. They have a strong connection to the spiritual realm and often possess artistic talents.',
        career_strengths: ['Arts', 'Healing', 'Music', 'Spiritual Leadership'],
        love_traits: 'In relationships, Pisces is romantic and empathetic. They value emotional connection and can be quite selfless in their devotion.'
      }
    ];
    
    // If a specific sign is requested, return only that sign's info
    if (sign) {
      const zodiacSign = zodiacSigns.find(s => s.id === sign);
      
      if (!zodiacSign) {
        return NextResponse.json({ error: 'Zodiac sign not found' }, { status: 404 });
      }
      
      return NextResponse.json(zodiacSign);
    }
    
    // Otherwise return all signs
    return NextResponse.json(zodiacSigns);
  } catch (error) {
    console.error('Error fetching zodiac information:', error);
    return NextResponse.json({ error: 'Failed to fetch zodiac information' }, { status: 500 });
  }
}