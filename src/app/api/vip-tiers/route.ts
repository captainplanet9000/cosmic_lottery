import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

/**
 * GET handler for fetching VIP tier details
 * Returns information about all available VIP tiers
 * 
 * @returns JSON response with VIP tier details
 */
export async function GET(request: Request) {
  try {
    // In a real implementation, we might fetch this from a database table
    // For demo purposes, we'll return hardcoded tier information
    
    const vipTiers = [
      {
        id: 'free',
        name: 'Free',
        description: 'Basic access to astrological reports',
        price: 0,
        benefits: [
          'Access to basic astrological reports',
          'Up to 3 reports per month',
          'No cosmic coins multiplier'
        ],
        cosmicCoinsMultiplier: 1.0,
        reportsPerMonth: 3,
        color: 'gray'
      },
      {
        id: 'silver',
        name: 'Silver',
        description: 'Enhanced astrological insights',
        price: 19.99,
        benefits: [
          'Access to detailed astrological reports',
          'Up to 10 reports per month',
          '1.2x cosmic coins multiplier',
          'Exclusive Silver VIP achievement'
        ],
        cosmicCoinsMultiplier: 1.2,
        reportsPerMonth: 10,
        color: 'silver'
      },
      {
        id: 'gold',
        name: 'Gold',
        description: 'Premium cosmic experience',
        price: 49.99,
        benefits: [
          'Access to premium astrological reports',
          'Unlimited reports per month',
          '1.5x cosmic coins multiplier',
          'Exclusive Gold VIP achievement',
          'Custom birth chart analysis'
        ],
        cosmicCoinsMultiplier: 1.5,
        reportsPerMonth: -1, // -1 means unlimited
        color: 'gold'
      },
      {
        id: 'platinum',
        name: 'Platinum',
        description: 'Ultimate cosmic mastery',
        price: 99.99,
        benefits: [
          'Access to all astrological reports',
          'Unlimited reports per month',
          '2x cosmic coins multiplier',
          'Exclusive Platinum VIP achievement',
          'Custom birth chart analysis',
          'Personal astrological consultation',
          'Priority support'
        ],
        cosmicCoinsMultiplier: 2.0,
        reportsPerMonth: -1, // -1 means unlimited
        color: 'platinum'
      }
    ];
    
    return NextResponse.json(vipTiers);
  } catch (error) {
    console.error('Error fetching VIP tiers:', error);
    return NextResponse.json({ error: 'Failed to fetch VIP tiers' }, { status: 500 });
  }
}