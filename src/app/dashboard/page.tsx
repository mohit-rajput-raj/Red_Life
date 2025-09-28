// import { BentoGridDemo } from '@/components/anmetedUI/bentoGrid'
// import { FollowingPointerDemo } from '@/components/anmetedUI/followin-pointer'
// import { InfiniteMovingCardsDemo } from '@/components/anmetedUI/infinite-moving-cards'
// import { DataTableDemo } from '@/components/datatable/data-table'
import { DrawerDemo } from '@/components/sdcn/drawer'
import { clerkClient, currentUser } from '@clerk/nextjs/server'
import React from 'react'

// import {useUser} from '@clerk/nextjs'
type Props = {}

const page = (props: Props) => {
  // const f = clerkClient()
  // console.log("//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////",f);
  
  return (
    <div className='flex flex-col gap-3 h-auto w-full p-3'>
        <header>
            <div>
                <DrawerDemo/>
                {/* {user?.emailAddresses?.[0]?.emailAddress} */}
        This is auth layout
        </div>
        </header>
        
           
           
        
            {/* <InfiniteMovingCardsDemo/> */}
       
    </div>
  )
}

export default page