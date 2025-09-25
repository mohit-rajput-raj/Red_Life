'use client'
import React, { use } from 'react'
import { CardDemo } from '../workspace_card/workspace-card'
import { useWorkFlowContext } from '@/providers/workFlow/work-flow-provider'
import { CreateCard } from '../workspace_card/create-card'

type Props = {}

const WorkFlowList = (props: Props) => {
    const {setFlows, flows} = useWorkFlowContext()
  return (
    <>
    
    {flows>0? [...Array(flows)].map((_, index) =>(
        <CardDemo id={index.toString()} key={index}/>
      ) ).reverse(): <div className='text-muted-foreground md:text-2xl min-w-full h-full flex items-center justify-center'>no camps found</div>}</>
  )
}

export default WorkFlowList