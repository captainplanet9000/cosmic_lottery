'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 }
  }
}

export default function Home() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-24 bg-cosmic-gradient bg-fixed">
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
      </div>      
      <motion.div
        className="z-10 max-w-4xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 text-cosmic-secondary"
          variants={itemVariants}
        >
          Cosmic Birth Charts
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-cosmic-foreground/90"
          variants={itemVariants}
        >
          Discover the cosmic blueprint of your soul through personalized natal chart analysis
        </motion.p>

        <motion.div 
          className="cosmic-card mx-auto max-w-2xl mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-heading mb-4 text-cosmic-secondary">Your Celestial Blueprint Awaits</h2>
          <p className="mb-6">
            Your birth chart is a unique cosmic fingerprint - a snapshot of the heavens at the exact moment you entered this world. 
            Each planet, house, and aspect reveals profound insights about your personality, purpose, and potential.
          </p>
          <p className="mb-6">
            Our AI-powered astrological analysis generates professional-grade natal chart reports 
            with personalized insights about your character, relationships, career path, and spiritual journey.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link 
            href="/birth-form"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button className="astrology-chart-button group">
              <span className="inline-block group-hover:animate-cosmic-spin mr-2">⭐</span>
              Generate Your Birth Chart
              <span className="inline-block group-hover:animate-cosmic-spin ml-2">🌙</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}