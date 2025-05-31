import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

interface CosmicEvent {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  type: 'meteor_shower' | 'eclipse' | 'planet_retrograde' | 'moon_phase' | 'planetary_alignment' | 'other';
  significance: string;
  image_url?: string;
  effects: {
    general: string;
    zodiac_specific?: Record<string, string>;
  };
  created_at: string;
}

/**
 * GET handler for fetching cosmic events
 * Returns cosmic events like meteor showers, eclipses, and planetary alignments
 * 
 * @returns JSON response with cosmic events
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');
    
    // In a real implementation, we would fetch events from the database
    // const supabase = createServerClient();
    // 
    // let query = supabase
    //   .from('cosmic_events')
    //   .select('*');
    // 
    // if (type) {
    //   query = query.eq('type', type);
    // }
    // 
    // if (startDate) {
    //   query = query.gte('start_date', startDate);
    // }
    // 
    // if (endDate) {
    //   query = query.lte('end_date', endDate);
    // }
    // 
    // const { data, error } = await query.order('start_date', { ascending: true });
    // 
    // if (error) {
    //   console.error('Error fetching cosmic events:', error);
    //   return NextResponse.json({ error: 'Failed to fetch cosmic events' }, { status: 500 });
    // }
    // 
    // return NextResponse.json(data);
    
    // For demo purposes, we'll return mock cosmic events
    const currentYear = new Date().getFullYear();
    
    const mockCosmicEvents: CosmicEvent[] = [
      {
        id: uuidv4(),
        title: 'Mercury Retrograde',
        description: 'Mercury will appear to move backward in its orbit, causing potential disruptions in communication, technology, and travel.',
        start_date: `${currentYear}-06-06`,
        end_date: `${currentYear}-07-01`,
        type: 'planet_retrograde',
        significance: 'Mercury retrograde is a time to review, reflect, and revise rather than start new projects. Expect delays and miscommunications.',
        image_url: '/images/cosmic-events/mercury-retrograde.jpg',
        effects: {
          general: 'During Mercury retrograde, communication can become unclear, technology may malfunction, and travel plans might face unexpected changes. It\'s a good time to double-check details, back up data, and practice patience.',
          zodiac_specific: {
            'gemini': 'As a Mercury-ruled sign, you may feel the effects of this retrograde more strongly. Pay extra attention to your communications and technology.',
            'virgo': 'This retrograde might affect your daily routines and work projects. Take time to revise and refine rather than pushing forward with new initiatives.',
            'aquarius': 'Your innovative ideas might face unexpected roadblocks. Use this time to refine your vision rather than launching new projects.'
          }
        },
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Perseid Meteor Shower',
        description: 'One of the brightest meteor showers of the year, featuring up to 100 meteors per hour at its peak.',
        start_date: `${currentYear}-07-17`,
        end_date: `${currentYear}-08-24`,
        type: 'meteor_shower',
        significance: 'The Perseids are associated with the comet Swift-Tuttle and are known for their brightness and frequency. This celestial event is often linked to wishes, spiritual awakening, and cosmic insights.',
        image_url: '/images/cosmic-events/perseid-meteor-shower.jpg',
        effects: {
          general: 'The Perseid meteor shower brings a surge of cosmic energy that can enhance intuition, spiritual connections, and the manifestation of wishes. It\'s an excellent time for meditation, setting intentions, and connecting with universal wisdom.'
        },
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Total Solar Eclipse',
        description: 'A rare celestial event where the Moon completely blocks the Sun, creating a brief period of darkness during daylight.',
        start_date: `${currentYear}-09-02`,
        end_date: `${currentYear}-09-02`,
        type: 'eclipse',
        significance: 'Solar eclipses represent powerful endings and beginnings. They often trigger significant life changes and revelations.',
        image_url: '/images/cosmic-events/solar-eclipse.jpg',
        effects: {
          general: 'This solar eclipse marks a potent time for new beginnings and significant shifts in consciousness. It\'s an excellent period for setting intentions, releasing old patterns, and embracing transformation. The energy of this eclipse will be particularly powerful for those with personal planets in Leo or Aquarius.',
          zodiac_specific: {
            'leo': 'This eclipse occurs in your sign, making it especially significant for your personal identity and life direction. Expect major revelations and opportunities for growth.',
            'aquarius': 'As your opposite sign is affected, this eclipse highlights your relationships and partnerships. Important connections may transform or new ones may form.',
            'taurus': 'This eclipse activates your creativity and self-expression. You might experience breakthroughs in artistic pursuits or romantic relationships.',
            'scorpio': 'Your social connections and community involvement come into focus during this eclipse. Group projects and friendships may undergo significant changes.'
          }
        },
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Jupiter-Neptune Conjunction',
        description: 'A rare alignment where Jupiter and Neptune appear to meet in the sky, combining their energies.',
        start_date: `${currentYear}-10-12`,
        end_date: `${currentYear}-10-12`,
        type: 'planetary_alignment',
        significance: 'This conjunction blends Jupiter\'s expansion with Neptune\'s spirituality, creating a powerful time for spiritual growth, creativity, and compassion.',
        image_url: '/images/cosmic-events/jupiter-neptune-conjunction.jpg',
        effects: {
          general: 'The Jupiter-Neptune conjunction opens doorways to spiritual awakening, enhanced intuition, and creative inspiration. It\'s an excellent time for meditation, artistic pursuits, and compassionate action. However, it also carries the potential for illusion or unrealistic thinking, so maintain a grounding practice.',
          zodiac_specific: {
            'pisces': 'As both Jupiter and Neptune rule Pisces, this conjunction is especially powerful for you. Expect significant spiritual insights and creative breakthroughs.',
            'sagittarius': 'Jupiter\'s influence on your sign makes this a particularly expansive time for your spiritual journey and philosophical outlook.',
            'cancer': 'Your natural intuition is heightened during this conjunction, bringing powerful emotional insights and healing opportunities.'
          }
        },
        created_at: new Date().toISOString()
      },
      {
        id: uuidv4(),
        title: 'Full Moon in Taurus',
        description: 'A full moon occurring in the earthy sign of Taurus, emphasizing stability, resources, and sensuality.',
        start_date: `${currentYear}-11-15`,
        end_date: `${currentYear}-11-15`,
        type: 'moon_phase',
        significance: 'This full moon highlights themes of financial security, personal values, and physical comfort. It\'s a time of culmination related to material matters and self-worth.',
        image_url: '/images/cosmic-events/full-moon-taurus.jpg',
        effects: {
          general: 'The Taurus Full Moon brings matters related to resources, values, and sensuality to a culmination point. It\'s an excellent time to assess your financial situation, appreciate physical comforts, and connect with nature. The practical energy of Taurus helps ground any emotional intensity typically associated with full moons.',
          zodiac_specific: {
            'taurus': 'With the full moon in your sign, personal projects and self-development goals reach an important culmination. Your authentic self is illuminated.',
            'scorpio': 'This full moon illuminates your relationship sector, bringing important partnerships to a turning point or culmination.',
            'leo': 'Your career and public reputation come into focus during this lunation, potentially bringing recognition or the completion of a professional project.',
            'aquarius': 'Home and family matters reach an important conclusion or turning point under this full moon\'s influence.'
          }
        },
        created_at: new Date().toISOString()
      }
    ];
    
    // Filter mock events based on query parameters
    let filteredEvents = [...mockCosmicEvents];
    
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }
    
    if (startDate) {
      filteredEvents = filteredEvents.filter(event => event.start_date >= startDate);
    }
    
    if (endDate) {
      filteredEvents = filteredEvents.filter(event => event.end_date <= endDate);
    }
    
    return NextResponse.json(filteredEvents);
  } catch (error) {
    console.error('Error fetching cosmic events:', error);
    return NextResponse.json({ error: 'Failed to fetch cosmic events' }, { status: 500 });
  }
}

/**
 * POST handler for creating a new cosmic event
 * Creates a cosmic event with the provided details
 * 
 * @returns JSON response with the created cosmic event
 */
export async function POST(request: Request) {
  try {
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'start_date', 'type', 'significance', 'effects'];
    const missingFields = requiredFields.filter(field => !eventData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 });
    }
    
    // Validate event type
    const validTypes = ['meteor_shower', 'eclipse', 'planet_retrograde', 'moon_phase', 'planetary_alignment', 'other'];
    if (!validTypes.includes(eventData.type)) {
      return NextResponse.json({ 
        error: `Invalid event type. Must be one of: ${validTypes.join(', ')}` 
      }, { status: 400 });
    }
    
    // In a real implementation, we would create the event in the database
    // const supabase = createServerClient();
    // 
    // // Ensure admin role for creating events
    // const { data: { session } } = await supabase.auth.getSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    // 
    // // Check if user has admin role (in a real app, you'd check user roles)
    // const { data: userData, error: userError } = await supabase
    //   .from('users')
    //   .select('role')
    //   .eq('id', session.user.id)
    //   .single();
    // 
    // if (userError || userData?.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized. Admin role required.' }, { status: 403 });
    // }
    // 
    // const event = {
    //   id: uuidv4(),
    //   ...eventData,
    //   created_at: new Date().toISOString()
    // };
    // 
    // const { data, error } = await supabase
    //   .from('cosmic_events')
    //   .insert(event)
    //   .select()
    //   .single();
    // 
    // if (error) {
    //   console.error('Error creating cosmic event:', error);
    //   return NextResponse.json({ error: 'Failed to create cosmic event' }, { status: 500 });
    // }
    // 
    // return NextResponse.json(data);
    
    // For demo purposes, we'll return a mock created event
    const mockEvent: CosmicEvent = {
      id: uuidv4(),
      title: eventData.title,
      description: eventData.description,
      start_date: eventData.start_date,
      end_date: eventData.end_date || eventData.start_date,
      type: eventData.type as any,
      significance: eventData.significance,
      image_url: eventData.image_url,
      effects: eventData.effects,
      created_at: new Date().toISOString()
    };
    
    return NextResponse.json(mockEvent);
  } catch (error) {
    console.error('Error creating cosmic event:', error);
    return NextResponse.json({ error: 'Failed to create cosmic event' }, { status: 500 });
  }
}