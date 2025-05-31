import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

/**
 * POST handler for validating a referral code
 * Checks if a referral code exists and is valid
 * 
 * @returns JSON response with validation result
 */
export async function POST(request: Request) {
  try {
    const { referralCode } = await request.json();
    
    if (!referralCode) {
      return NextResponse.json({ 
        valid: false, 
        error: 'No referral code provided' 
      }, { status: 400 });
    }
    
    // In a real implementation, we would check if the referral code exists
    // const supabase = createServerClient();
    // const { data, error } = await supabase
    //   .from('users')
    //   .select('id, name')
    //   .eq('referral_code', referralCode)
    //   .single();
    // 
    // if (error || !data) {
    //   return NextResponse.json({ valid: false, error: 'Invalid referral code' });
    // }
    
    // For demo purposes, we'll simulate some valid and invalid codes
    const validCodes = ['COSMIC123', 'STELLAR456', 'ASTRAL789'];
    const isValid = validCodes.includes(referralCode);
    
    if (isValid) {
      // Mock referrer data
      const mockReferrer = {
        name: referralCode === 'COSMIC123' ? 'Demo User' : 
              referralCode === 'STELLAR456' ? 'John Smith' : 'Jane Doe'
      };
      
      return NextResponse.json({
        valid: true,
        referrer: mockReferrer.name,
        reward: 50 // The number of coins the new user will get
      });
    } else {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid referral code' 
      });
    }
  } catch (error) {
    console.error('Error validating referral code:', error);
    return NextResponse.json({ 
      valid: false, 
      error: 'Failed to validate referral code' 
    }, { status: 500 });
  }
}