import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

// GET handler for fetching a specific report
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }
    
    // In a real implementation, we would fetch the report from the database
    // const supabase = createServerClient();
    // const { data, error } = await supabase
    //   .from('reports')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    // 
    // if (error) {
    //   console.error('Error fetching report:', error);
    //   return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
    // }
    // 
    // if (!data) {
    //   return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    // }
    
    // For demo purposes, we'll return a mock report
    // Normally we'd only return the report if it belongs to the authenticated user
    
    // Mock different reports based on ID
    let mockReport;
    
    if (id === '1') {
      mockReport = {
        id: '1',
        userId: 'user-123',
        name: 'John Doe',
        birthDate: 'June 15, 1990',
        birthTime: '14:30',
        birthLocation: 'New York, NY, USA',
        sunSign: 'Gemini',
        moonSign: 'Libra',
        ascendant: 'Sagittarius',
        sections: [
          {
            id: 'personality',
            title: 'Personality Profile',
            icon: '👤',
            content: `<p>Your Gemini Sun sign forms the core of your personality, John. You are naturally versatile and curious, with a tendency to approach life in a communicative way. People often notice your adaptable nature when they first meet you.</p><p>Your planetary alignments suggest that you have a unique blend of qualities that allow you to excel in situations requiring versatility and communicative approaches. You may sometimes struggle with being too inconsistent, which is a common challenge for Gemini individuals.</p><p>Your Mercury placement indicates you communicate in a thoughtful and deliberate manner, processing information through both logical and intuitive channels. This gives you a balanced perspective when solving problems or making important decisions.</p>`
          },
          {
            id: 'career',
            title: 'Career & Vocation',
            icon: '💼',
            content: `<p>Your astrological profile indicates strong potential in fields related to communications and writing. Your natural talents align well with careers that require teaching skills or knowledge.</p><p>Jupiter's placement in your chart suggests opportunity for growth through sales, while Saturn indicates areas where you might face challenges but ultimately develop mastery through dedicated effort.</p><p>Your North Node suggests that your highest professional fulfillment will come from work that allows you to utilize your natural Gemini qualities while pushing beyond your comfort zone to develop new skills related to public relations.</p>`
          },
          {
            id: 'relationships',
            title: 'Relationships & Love',
            icon: '❤️',
            content: `<p>In relationships, your Gemini nature makes you naturally communicative and adaptable. You tend to seek partners who appreciate your curious approach to love and connection.</p><p>Venus in your chart suggests you express affection through playful gestures and value inconsistent qualities in a partner. You may sometimes struggle with balancing independence and togetherness in relationships.</p><p>Your 7th house placement indicates that relationships play a significant role in your personal growth journey. Through partnerships, you learn important lessons about yourself and develop a deeper understanding of your needs and boundaries.</p>`
          },
          {
            id: 'karmic',
            title: 'Karmic Lessons',
            icon: '🔮',
            content: `<p>Your South Node placement suggests past life patterns related to developing patience and persistence through challenging circumstances. You came into this life with certain tendencies and comforts that may no longer serve your highest evolution.</p><p>Your karmic journey in this lifetime involves learning to balance self-reliance with healthy interdependence. The challenges you face in this area are not coincidental but purposefully designed to help you grow beyond old patterns.</p><p>Chiron's position in your chart indicates a core wound related to self-expression and creative confidence. Healing this wound is a significant part of your soul's journey and will unlock greater authenticity and purpose in your life.</p>`
          },
          {
            id: 'transits',
            title: 'Current Transits',
            icon: '🌠',
            content: `<p>The coming 12 months feature significant planetary movements affecting your chart, with Jupiter entering your 10th house, expanding career opportunities and public recognition. This influence will be particularly strong through the next 3-4 months.</p><p>Another key transit involves Saturn forming a trine to your natal Sun, supporting long-term goals and structured growth. This energy may feel challenging at times but offers tremendous growth potential if you remain flexible and open to new perspectives.</p><p>Later in the year, you'll experience Neptune transiting your 7th house, bringing both inspiration and clarity to relationships. This represents an important opportunity to make conscious choices that align with your authentic self and highest aspirations.</p>`
         }
        ],
        createdAt: '2025-05-25T10:30:00.000Z'
      };
    } else if (id === '2') {
      mockReport = {
        id: '2',
        userId: 'user-123',
        name: 'Jane Smith',
        birthDate: 'December 10, 1985',
        birthTime: 'Unknown',
        birthLocation: 'Los Angeles, CA, USA',
        sunSign: 'Sagittarius',
        moonSign: 'Taurus',
        ascendant: 'Unknown',
        sections: [
          {
            id: 'personality',
            title: 'Personality Profile',
            icon: '👤',
            content: `<p>Your Sagittarius Sun sign forms the core of your personality, Jane. You are naturally optimistic and adventurous, with a tendency to approach life in a philosophical way. People often notice your enthusiastic nature when they first meet you.</p><p>Your planetary alignments suggest that you have a unique blend of qualities that allow you to excel in situations requiring optimism and philosophical approaches. You may sometimes struggle with being too restless, which is a common challenge for Sagittarius individuals.</p><p>Your Mercury placement indicates you communicate in a thoughtful and deliberate manner, processing information through both logical and intuitive channels. This gives you a balanced perspective when solving problems or making important decisions.</p>`
          },
          {
            id: 'career',
            title: 'Career & Vocation',
            icon: '💼',
            content: `<p>Your astrological profile indicates strong potential in fields related to travel and higher education. Your natural talents align well with careers that require publishing skills or knowledge.</p><p>Jupiter's placement in your chart suggests opportunity for growth through law, while Saturn indicates areas where you might face challenges but ultimately develop mastery through dedicated effort.</p><p>Your North Node suggests that your highest professional fulfillment will come from work that allows you to utilize your natural Sagittarius qualities while pushing beyond your comfort zone to develop new skills related to outdoor activities.</p>`
          },
          {
            id: 'relationships',
            title: 'Relationships & Love',
            icon: '❤️',
            content: `<p>In relationships, your Sagittarius nature makes you naturally adventurous and optimistic. You tend to seek partners who appreciate your honest approach to love and connection.</p><p>Venus in your chart suggests you express affection through freedom-loving gestures and value restless qualities in a partner. You may sometimes struggle with balancing independence and togetherness in relationships.</p><p>Your 7th house placement indicates that relationships play a significant role in your personal growth journey. Through partnerships, you learn important lessons about yourself and develop a deeper understanding of your needs and boundaries.</p>`
          },
          {
            id: 'karmic',
            title: 'Karmic Lessons',
            icon: '🔮',
            content: `<p>Your South Node placement suggests past life patterns related to transforming fear into courage and decisive action. You came into this life with certain tendencies and comforts that may no longer serve your highest evolution.</p><p>Your karmic journey in this lifetime involves cultivating emotional intelligence and deeper self-awareness. The challenges you face in this area are not coincidental but purposefully designed to help you grow beyond old patterns.</p><p>Chiron's position in your chart indicates a core wound related to self-expression and creative confidence. Healing this wound is a significant part of your soul's journey and will unlock greater authenticity and purpose in your life.</p>`
          },
          {
            id: 'transits',
            title: 'Current Transits',
            icon: '🌠',
            content: `<p>The coming 12 months feature significant planetary movements affecting your chart, with Uranus making a square to your natal Moon, triggering emotional breakthroughs and lifestyle changes. This influence will be particularly strong through the next 3-4 months.</p><p>Another key transit involves Neptune transiting your 7th house, bringing both inspiration and clarity to relationships. This energy may feel challenging at times but offers tremendous growth potential if you remain flexible and open to new perspectives.</p><p>Later in the year, you'll experience Pluto forming an opposition to your natal Venus, transforming your values and approach to love. This represents an important opportunity to make conscious choices that align with your authentic self and highest aspirations.</p>`
          }
        ],
        createdAt: '2025-05-20T15:45:00.000Z'
      };
    } else {
      // Create a generated report with a random ID
      const sunSign = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)];
      const moonSign = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)];
      const ascendant = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)];
      
      mockReport = {
        id: id,
        userId: 'user-123',
        name: 'New User',
        birthDate: 'January 1, 2000',
        birthTime: '12:00',
        birthLocation: 'Los Angeles, CA, USA',
        sunSign: sunSign,
        moonSign: moonSign,
        ascendant: ascendant,
        sections: [
          {
            id: 'personality',
            title: 'Personality Profile',
            icon: '👤',
            content: `<p>Your ${sunSign} Sun sign forms the core of your personality. You have natural traits and tendencies that shape your approach to life.</p><p>With your unique planetary alignments, you demonstrate a special blend of qualities that help you navigate life's challenges and opportunities.</p><p>Your Mercury placement gives you a distinctive communication style, influencing how you express yourself and process information.</p>`
          },
          {
            id: 'career',
            title: 'Career & Vocation',
            icon: '💼',
            content: `<p>Your astrological profile indicates potential in various professional fields based on your ${sunSign} qualities.</p><p>Jupiter's placement in your chart suggests areas of opportunity and expansion in your career path.</p><p>Your North Node points to fulfilling career directions that align with your soul's evolution.</p>`
          },
          {
            id: 'relationships',
            title: 'Relationships & Love',
            icon: '❤️',
            content: `<p>In relationships, your ${sunSign} nature shapes how you connect with others and what you seek in partnerships.</p><p>Venus in your chart influences how you express and receive affection in relationships.</p><p>Your 7th house placement offers insights into your relationship patterns and growth opportunities through partnerships.</p>`
          },
          {
            id: 'karmic',
            title: 'Karmic Lessons',
            icon: '🔮',
            content: `<p>Your South Node reveals patterns from past lives that you're working to evolve beyond in this lifetime.</p><p>Your karmic journey involves specific lessons designed to help you grow spiritually and emotionally.</p><p>Chiron's position indicates core wounds that, when healed, can become sources of great wisdom and strength.</p>`
          },
          {
            id: 'transits',
            title: 'Current Transits',
            icon: '🌠',
            content: `<p>The coming months feature planetary movements that will influence different areas of your life.</p><p>These transits create opportunities for growth, though some may initially present as challenges requiring adaptation.</p><p>By working consciously with these energies, you can make choices that align with your authentic self and highest path.</p>`
          }
        ],
        createdAt: new Date().toISOString()
      };
    }
    
    return NextResponse.json(mockReport);
  } catch (error) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}