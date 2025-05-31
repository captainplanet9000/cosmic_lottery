import { NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET handler for Supabase Auth callback
 * Handles authentication callbacks and user creation
 */
export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    
    if (code) {
      const supabase = createServerClient();
      
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
      
      // In a real implementation, we would create a user record if it doesn't exist
      // const {
      //   data: { user },
      // } = await supabase.auth.getUser();
      // 
      // if (user) {
      //   // Check if the user already exists in our users table
      //   const { data: existingUser } = await supabase
      //     .from('users')
      //     .select('id')
      //     .eq('id', user.id)
      //     .single();
      //   
      //   if (!existingUser) {
      //     // Create a new user record
      //     const referralCode = generateReferralCode();
      //     const { error: insertError } = await supabase.from('users').insert({
      //       id: user.id,
      //       email: user.email,
      //       name: user.user_metadata.full_name || user.email?.split('@')[0] || 'Cosmic Explorer',
      //       cosmic_coins: 50, // Starting coins
      //       vip_tier: 'free',
      //       referral_code: referralCode,
      //       referred_by: requestUrl.searchParams.get('ref') || null, // Check for referral
      //     });
      //     
      //     if (!insertError) {
      //       // Create first achievement
      //       await supabase.from('achievements').insert({
      //         id: uuidv4(),
      //         user_id: user.id,
      //         title: 'Cosmic Beginner',
      //         description: 'Joined the Cosmic Lottery community!',
      //         icon: '🚀',
      //         coins_reward: 50,
      //         achieved_at: new Date().toISOString()
      //       });
      //       
      //       // Process referral if present
      //       const referralCode = requestUrl.searchParams.get('ref');
      //       if (referralCode) {
      //         processReferral(supabase, user.id, referralCode);
      //       }
      //     }
      //   }
      // }
    }

    // Redirect to the app
    return NextResponse.redirect(requestUrl.origin);
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/auth/error', request.url));
  }
}

/**
 * Helper function to generate a random referral code
 */
function generateReferralCode(): string {
  const adjectives = ['Cosmic', 'Stellar', 'Lunar', 'Solar', 'Astral', 'Celestial'];
  const nouns = ['Explorer', 'Voyager', 'Traveler', 'Pioneer', 'Navigator', 'Seeker'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return `${adjective}${noun}${number}`;
}

/**
 * Helper function to process referrals
 */
async function processReferral(supabase: any, userId: string, referralCode: string) {
  try {
    // Find the referrer
    const { data: referrer } = await supabase
      .from('users')
      .select('id, cosmic_coins')
      .eq('referral_code', referralCode)
      .single();
    
    if (referrer) {
      // Update the referrer's coins
      const REFERRAL_REWARD = 50;
      await supabase
        .from('users')
        .update({ cosmic_coins: referrer.cosmic_coins + REFERRAL_REWARD })
        .eq('id', referrer.id);
      
      // Create achievement for referrer
      await supabase.from('achievements').insert({
        id: uuidv4(),
        user_id: referrer.id,
        title: 'Cosmic Influencer',
        description: 'Someone used your referral code!',
        icon: '👥',
        coins_reward: REFERRAL_REWARD,
        achieved_at: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error processing referral:', error);
  }
}