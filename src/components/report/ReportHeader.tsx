import React from 'react'
import { motion } from 'framer-motion'

interface ReportHeaderProps {
  name: string
  birthDate: string
  birthTime: string
  birthLocation: string
  sunSign: string
  moonSign: string
  ascendant: string
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  name,
  birthDate,
  birthTime,
  birthLocation,
  sunSign,
  moonSign,
  ascendant
}) => {
  return (
    <motion.div
      className="cosmic-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2 text-cosmic-secondary">
            {name}'s Cosmic Lottery Report
          </h1>
          
          <div className="mb-4 text-sm">
            <p><span className="text-cosmic-muted">Birth Date:</span> {birthDate}</p>
            <p><span className="text-cosmic-muted">Birth Time:</span> {birthTime}</p>
            <p><span className="text-cosmic-muted">Birth Location:</span> {birthLocation}</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="golden-ticket px-3 py-1 text-sm">
              <span className="mr-1">🎫</span> Premium Report
            </div>
            <div className="bg-cosmic-accent/20 text-cosmic-accent px-3 py-1 rounded-lg text-sm">
              <span className="mr-1">✨</span> 50 Cosmic Coins Earned
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-cosmic-muted/30 pt-4 md:pt-0 md:pl-6">
          <div className="grid grid-cols-3 gap-4 w-full">
            <ZodiacSign title="Sun" sign={sunSign} />
            <ZodiacSign title="Moon" sign={moonSign} />
            <ZodiacSign title="Rising" sign={ascendant} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ZodiacSign: React.FC<{ title: string; sign: string }> = ({ title, sign }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs text-cosmic-muted">{title}</span>
      <span className="text-lg font-medium text-cosmic-secondary">{getZodiacEmoji(sign)}</span>
      <span className="text-sm">{sign}</span>
    </div>
  )
}

// Helper function to get zodiac emoji
function getZodiacEmoji(sign: string): string {
  const emojis: Record<string, string> = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓'
  }
  
  return emojis[sign] || '✨'
}

export default ReportHeader