'use client'

import React, { createContext, useState, useContext } from 'react'

interface WorkFlowContextType {
  flows: number
  setFlows: React.Dispatch<React.SetStateAction<number>>
}

const WorkFlowContext = createContext<WorkFlowContextType | null>(null)

export const useWorkFlowContext = (): WorkFlowContextType => {
  const context = useContext(WorkFlowContext)
  if (!context) {
    throw new Error('useWorkFlowContext must be used within a WorkFlowProvider')
  }
  return context
}

const WorkFlowProvider = ({ children }: { children: React.ReactNode }) => {
  const [flows, setFlows] = useState<number>(0)
  const values = { flows, setFlows }

  return (
    <WorkFlowContext.Provider value={values}>
      {children}
    </WorkFlowContext.Provider>
  )
}

export default WorkFlowProvider
