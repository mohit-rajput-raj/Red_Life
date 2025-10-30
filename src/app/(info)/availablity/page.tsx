"use client"

import React from 'react'


import InstCard from '@/components/availablity/instCards';
import { NavBarSignout } from '@/components/navbar/nav-bar';


type Props = {}



const availability = (props: Props) => {
  return (
    <div>

      <div className='p-20 flex flex-col gap-5  dark:bg-zinc-800 bg-zinc-100 min-h-screen'>
        {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
          <div key={item} className=' w-full  p-5 rounded-lg shadow-lg flex px-20 justify-between  dark:bg-zinc-700 bg-white overflow-hidden'>
            <InstCard />
          </div>
        ))}
      </div>
      </div>
  )
}

export default availability