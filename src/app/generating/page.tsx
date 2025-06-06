'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

// Fun astrological facts to display during loading
const astrologyFacts = [
  "The position of the planets at your birth creates a unique cosmic fingerprint.",
  "Ancient Babylonians were the first to develop the 12-sign zodiac system around 2,500 years ago.",
  "Your Rising Sign (Ascendant) represents how others see you upon first meeting.",
  "The Moon Sign represents your emotional self and inner feelings.",
  "Mercury's position in your chart influences how you communicate and process information.",
  "Venus in your chart shows how you approach love, beauty, and values.",
  "Mars reveals your drive, ambition, and how you take action.",
  "Jupiter is the planet of expansion, luck, and higher learning.",
  "Saturn represents discipline, responsibility, and life lessons.",
  "Uranus brings unexpected changes and innovation to different areas of life.",
  "Neptune is associated with dreams, intuition, and spiritual connections.",
  "Pluto, though no longer classified as a planet by astronomers, represents transformation in astrology.",
  "The 12 houses in your birth chart represent different areas of life, from identity to career and relationships.",
  "Eclipses are powerful cosmic events that can trigger significant life changes.",
  "Retrograde planets aren't moving backward—they just appear that way from Earth's perspective."
];
export default function GeneratingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [currentFact, setCurrentFact] = useState(0)
  const [loadingText, setLoadingText] = useState('Drawing your cosmic lottery numbers...')
  
  // Simulate the generation process
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1
        
        // Change loading text based on progress
        if (newProgress === 25) {
          setLoadingText('Analyzing planetary positions...')
        } else if (newProgress === 50) {
          setLoadingText('Calculating celestial aspects...')
        } else if (newProgress === 75) {
          setLoadingText('Generating your personalized report...')
        } else if (newProgress >= 100) {
          // Clear intervals and redirect to report page
          clearInterval(progressInterval)
          clearInterval(factInterval)
          router.push('/report')
          return 100
        }
        
        return newProgress
      })
    }, 100)
    
    // Change the astrological fact every few seconds
    const factInterval = setInterval(() => {
      setCurrentFact(prev => (prev + 1) % astrologyFacts.length)
    }, 4000)
    
    // Cleanup function
    return () => {
      clearInterval(progressInterval)
      clearInterval(factInterval)
    }
  }, [router])
  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-cosmic-gradient bg-fixed">
      {/* Stars background effect */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>      <motion.div
        className="z-10 max-w-xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="cosmic-card mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="cosmic-spinner mx-auto mb-6"
            animate={{ 
              rotate: 360,
              transition: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
          >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#FFD700" strokeWidth="2" />
              <g>
                {[...Array(12)].map((_, i) => (
                  <circle 
                    key={i} 
                    cx="50" 
                    cy="5" 
                    r="5" 
                    fill={i % 2 === 0 ? "#FFD700" : "#6A0DAD"}
                    transform={`rotate(${i * 30} 50 50)`} 
                  />
                ))}
              </g>
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-heading mb-4 text-cosmic-secondary"
            variants={itemVariants}
          >
            {loadingText}
          </motion.h2>
          
          <motion.div 
            className="progress-bar mb-6"
            variants={itemVariants}
          >
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </motion.div>
          
          <motion.div 
            className="text-sm"
            variants={itemVariants}
          >
            <p className="italic text-cosmic-muted-foreground mb-2">Did you know?</p>
            <p className="text-cosmic-foreground">{astrologyFacts[currentFact]}</p>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="text-cosmic-muted-foreground text-sm"
          variants={itemVariants}
        >
          Please do not close this window while your cosmic lottery report is being generated.
        </motion.p>
      </motion.div>
    </main>
  )
}