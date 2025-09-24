import { SidebarDemo } from '@/components/acercinityUI/sidebar-demo'
import NavBar from '@/components/navbar/nav-bar'
import SideBarProvider from '@/components/sideBarProvider/side-bar-provider'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const layout = (props: Props) => {
  return (
    
      <div className='flex h-screen w-screen  '>
        <SidebarDemo>
        {props.children}
      </SidebarDemo>
      </div>
      
  )
}

export default layout