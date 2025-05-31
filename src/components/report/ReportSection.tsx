import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ReportSectionProps {
  id: string
  title: string
  icon: string
  content: string
  isActive: boolean
}

const ReportSection: React.FC<ReportSectionProps> = ({
  id,
  title,
  icon,
  content,
  isActive
}) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={id}
          className="cosmic-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">{icon}</span>
            <h2 className="text-xl md:text-2xl font-heading text-cosmic-secondary">{title}</h2>
          </div>
          
          <div 
            className="prose prose-invert prose-cosmic max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          
          <div className="mt-6 pt-4 border-t border-cosmic-muted/30 flex justify-between items-center">
            <div className="text-sm text-cosmic-muted">
              Last updated: May 31, 2025
            </div>
            
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full bg-cosmic-card hover:bg-cosmic-muted/20 transition-colors"
                aria-label="Save report section"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
              
              <button 
                className="p-2 rounded-full bg-cosmic-card hover:bg-cosmic-muted/20 transition-colors"
                aria-label="Download report section"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReportSection