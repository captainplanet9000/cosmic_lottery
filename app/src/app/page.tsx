'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

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
          The Cosmic Lottery
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-cosmic-foreground/90"
          variants={itemVariants}
        >
          Discover your astrological fortune and unlock the cosmic insights of your birth chart
        </motion.p>

        <motion.div 
          className="cosmic-card mx-auto max-w-2xl mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-heading mb-4 text-cosmic-secondary">Are You Feeling Lucky?</h2>
          <p className="mb-6">
            Your birth chart is like a unique lottery ticket to the cosmos. 
            Each planet, house, and aspect represents a chance to unlock hidden fortunes 
            and cosmic opportunities in your life.
          </p>
          <p className="mb-6">
            Our AI-powered cosmic lottery system generates professional-grade natal chart reports 
            with personalized insights about your personality, career, relationships, and destiny.
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link 
            href="/birth-form"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <button className="lottery-play-button group">
              <span className="inline-block group-hover:animate-cosmic-spin mr-2">🎰</span>
              Play The Cosmic Lottery
              <span className="inline-block group-hover:animate-cosmic-spin ml-2">✨</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  )
}