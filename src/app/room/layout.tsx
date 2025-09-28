import pool from '@/lib/db'
import { currentUser } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = async (props: Props) => {
    
  return (
    <div>{props.children}</div>
  )
}

export default layout