import React from 'react'
import { motion } from 'framer-motion'

interface Section {
  id: string
  title: string
  icon: string
}

interface ReportNavProps {
  sections: Section[]
  activeSection: string
  setActiveSection: (id: string) => void
}

const ReportNav: React.FC<ReportNavProps> = ({ sections, activeSection, setActiveSection }) => {
  return (
    <motion.div 
      className="cosmic-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-lg font-heading mb-4 text-cosmic-secondary">Report Sections</h3>
      
      <nav className="space-y-2">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center 
              ${activeSection === section.id 
                ? 'bg-cosmic-secondary/20 text-cosmic-secondary font-medium' 
                : 'hover:bg-cosmic-card/80 text-cosmic-foreground/90'}`}
            aria-current={activeSection === section.id ? 'page' : undefined}
          >
            <span className="mr-2">{section.icon}</span>
            <span>{section.title}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-6 pt-4 border-t border-cosmic-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-cosmic-muted">Cosmic Coins</span>
          <span className="text-cosmic-secondary font-medium">50</span>
        </div>
        
        <div className="relative h-2 bg-cosmic-muted rounded-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full bg-cosmic-secondary" style={{ width: '15%' }}></div>
        </div>
        
        <div className="mt-1 flex justify-between text-xs text-cosmic-muted">
          <span>VIP Tier: Stargazer</span>
          <span>Next: 300</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ReportNav