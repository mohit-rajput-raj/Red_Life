import NavBar from '@/components/navbar/nav-bar'
import React from 'react'

type Props = {children:React.ReactNode}

const layout = (props: Props) => {
  return (
    <div className='flex flex-col gap-1 w-full '><NavBar/>{props.children}</div>
  )
}

export default layout