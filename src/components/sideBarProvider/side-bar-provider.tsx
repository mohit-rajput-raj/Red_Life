'use client'
import NavBar from '@/components/navbar/nav-bar'
import { Sidebar, SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

type Props = {children:React.ReactNode}
interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}
const SideBarProvider = ({children}: Props) => {
  const [open , set] = React.useState<boolean>(false);

  return (
    <div className='flex flex-col gap-1 w-full '>
      
      <Sidebar   open={open} setOpen={set}>
    {children}

      </Sidebar >
    </div>
  )
}

export default SideBarProvider 