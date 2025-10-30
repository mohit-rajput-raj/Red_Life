import { NavBarSignout } from '@/components/navbar/nav-bar'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({children}: Props) => {
  return (
    <div><NavBarSignout />{children}</div>
  )
}

export default layout