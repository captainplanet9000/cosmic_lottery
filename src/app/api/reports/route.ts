import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

// GET handler for fetching all reports for a user
export async function GET(request: Request) {
  try {
    // In a real implementation, we would get the user ID from authentication
    // const userId = auth.userId();
    const userId = 'user-123'; // Mock user ID for demo purposes
    
    // In a real implementation, we would fetch reports from the database
    // const supabase = createServerClient();
    // const { data, error } = await supabase
    //   .from('reports')
    //   .select('*')
    //   .eq('user_id', userId)
    //   .order('created_at', { ascending: false });
    // 
    // if (error) {
    //   console.error('Error fetching reports:', error);
    //   return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
    // }
    
    // For demo purposes, we'll return mock reports
    const mockReports = [
      {
        id: '1',
        userId: userId,
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
            content: '<p>Your Gemini Sun sign makes you naturally versatile and curious...</p>'
          },
          {
            id: 'career',
            title: 'Career & Vocation',
            icon: '💼',
            content: '<p>Your astrological profile indicates strong potential in fields related to communications and writing...</p>'
          }
        ],
        createdAt: '2025-05-25T10:30:00.000Z'
      },
      {
        id: '2',
        userId: userId,
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
            content: '<p>Your Sagittarius Sun sign makes you naturally optimistic and adventurous...</p>'
          },
          {
            id: 'career',
            title: 'Career & Vocation',
            icon: '💼',
            content: '<p>Your astrological profile indicates strong potential in fields related to travel and higher education...</p>'
          }
        ],
        createdAt: '2025-05-20T15:45:00.000Z'
      }
    ];
    
    return NextResponse.json(mockReports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}