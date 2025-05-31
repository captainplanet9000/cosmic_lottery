import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AchievementNotificationProps {
  title: string
  description: string
  points: number
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  title,
  description,
  points
}) => {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: {
          type: 'spring',
          damping: 12
        }
      }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
    >
      <div className="golden-ticket shadow-lg p-0 overflow-hidden max-w-xs">
        <div className="flex items-center justify-between bg-cosmic-background/20 p-3">
          <div className="flex items-center">
            <span className="text-xl animate-pulse">🏆</span>
            <h3 className="ml-2 font-bold">Achievement Unlocked!</h3>
          </div>
          <div className="bg-cosmic-secondary text-cosmic-background font-bold text-xs rounded-full px-2 py-1">
            +{points} COINS
          </div>
        </div>
        
        <div className="p-4">
          <h4 className="font-heading text-lg mb-1">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
          
          <div className="mt-3 text-xs flex justify-between items-center">
            <span>Cosmic Achievements: 1/25</span>
            <button className="text-cosmic-background underline hover:no-underline">View All</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AchievementNotification