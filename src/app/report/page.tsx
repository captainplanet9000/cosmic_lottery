'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ReportHeader from '@/components/report/ReportHeader'
import ReportNav from '@/components/report/ReportNav'
import ReportSection from '@/components/report/ReportSection'
import ShareSection from '@/components/report/ShareSection'
import AchievementNotification from '@/components/common/AchievementNotification'

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.2 
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

// Mock report data - in a real app, this would come from an API
const reportData = {
  name: "Jessica Thompson",
  birthDate: "May 15, 1990",
  birthTime: "08:30 AM",
  birthLocation: "Los Angeles, CA, USA",
  sunSign: "Taurus",
  moonSign: "Libra",
  ascendant: "Gemini",
  sections: [
    {
      id: "personality",
      title: "Personality Profile",
      icon: "👤",
      content: `
        <p>Your Taurus Sun gives you a grounded, practical approach to life. You're reliable, patient, and possess a strong determination that helps you achieve your goals. With your Moon in Libra, you seek harmony and balance in your emotional life and are naturally diplomatic in your interactions.</p>
        
        <p>Your Gemini Ascendant gives you a curious, adaptable outer persona. People are drawn to your quick wit and versatile communication style. You appear youthful, intellectually engaged, and sociable.</p>
        
        <p>Mercury in Taurus indicates you process information methodically and prefer practical knowledge that can be applied in tangible ways. Once you learn something, it stays with you. Venus in Aries shows you're direct and passionate in relationships, preferring spontaneity and excitement.</p>
      `
    },
    {
      id: "career",
      title: "Career & Vocation",
      icon: "💼",
      content: `
        <p>With Jupiter in your 10th house, you have excellent potential for career growth and professional recognition. Your career path may expand in unexpected ways, bringing opportunities for advancement and increased status.</p>
        
        <p>Your North Node in Capricorn suggests your life purpose involves developing discipline, responsibility, and achieving concrete results. You're meant to build something of lasting value.</p>
        
        <p>Saturn in your 6th house indicates you take your work responsibilities seriously and may excel in positions requiring attention to detail, process improvement, or health-related fields. You benefit from establishing solid routines and work systems.</p>
      `
    },
    {
      id: "relationships",
      title: "Relationships & Love",
      icon: "❤️",
      content: `
        <p>Venus in Aries makes you passionate and direct in expressing affection. You don't play games in love and appreciate partners who are equally straightforward and enthusiastic.</p>
        
        <p>With Mars in Cancer, you protect those you care about and can be quite nurturing despite your independent nature. You may sometimes struggle with passive-aggressive tendencies when upset.</p>
        
        <p>Your 7th house of partnerships contains Neptune, suggesting you idealize relationships and may sometimes see partners through rose-colored glasses. Learning to see people realistically while maintaining compassion is a key relationship lesson.</p>
      `
    },    {
      id: "karmic",
      title: "Karmic Lessons",
      icon: "🔮",
      content: `
        <p>With your South Node in Cancer, you come into this life with natural nurturing abilities and emotional sensitivity. Your past life patterns may include overattachment to family, emotional dependencies, or difficulty letting go.</p>
        
        <p>Your karmic lesson involves developing greater independence, practical achievement, and structured approaches to life (North Node in Capricorn). You're learning to channel your emotional depth into concrete manifestation.</p>
        
        <p>Chiron in your 12th house suggests healing unconscious wounds related to spirituality, hidden fears, or ancestral patterns. Working with dreams, meditation, or spiritual practices may be particularly beneficial for your soul growth.</p>
      `
    },
    {
      id: "transits",
      title: "Current Transits",
      icon: "🌠",
      content: `
        <p>Jupiter is currently transiting your 5th house, bringing expansion in areas of creativity, romance, and self-expression. This is an excellent time for artistic pursuits, new romantic connections, or recreational activities that bring you joy.</p>
        
        <p>Saturn's transit through your 8th house brings lessons related to shared resources, deep intimacy, and psychological transformation. You may be restructuring financial arrangements with others or examining power dynamics in close relationships.</p>
        
        <p>Uranus in your 11th house continues to bring unexpected changes to your social circles and long-term goals. New and unusual friendships may form suddenly, and your vision for the future may undergo significant shifts.</p>
      `
    }
  ]
}

export default function ReportPage() {
  const [activeSection, setActiveSection] = useState("personality")
  const [showAchievement, setShowAchievement] = useState(false)
  
  // Simulate achievement notification after 5 seconds
  useState(() => {
    const timer = setTimeout(() => {
      setShowAchievement(true)
      
      // Hide achievement after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowAchievement(false)
      }, 5000)
      
      return () => clearTimeout(hideTimer)
    }, 5000)
    
    return () => clearTimeout(timer)
  })  
  return (
    <main className="min-h-screen bg-cosmic-gradient bg-fixed">
      {/* Achievement notification */}
      {showAchievement && (
        <AchievementNotification 
          title="Cosmic Explorer" 
          description="You've received your first birth chart report!" 
          points={50}
        />
      )}
      
      <motion.div
        className="max-w-4xl mx-auto p-6 md:p-8"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ReportHeader 
          name={reportData.name}
          birthDate={reportData.birthDate}
          birthTime={reportData.birthTime}
          birthLocation={reportData.birthLocation}
          sunSign={reportData.sunSign}
          moonSign={reportData.moonSign}
          ascendant={reportData.ascendant}
        />
        
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <div className="md:w-1/4">
            <ReportNav 
              sections={reportData.sections} 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            
            <ShareSection className="mt-6" />
          </div>
          
          <div className="md:w-3/4">
            {reportData.sections.map(section => (
              <ReportSection
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                content={section.content}
                isActive={activeSection === section.id}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  )
}