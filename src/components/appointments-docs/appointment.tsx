'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
// import { ChartBarInteractive } from '../chart/donations-bar-chart'
const ChartBarInteractive = dynamic(() => import('../chart/donations-bar-chart').then(mod => mod.ChartBarInteractive), { ssr: false })
const AppontmentDataTableDemo = dynamic(() => import('./appointments_tables').then(mod => mod.AppontmentDataTableDemo), { ssr: false })
import { useGetBlood_requests } from '@/actions/queries/user-queries'
import { generateBloodRequestsRecords } from './generateRandomAppontments'
import { SkeletonCard } from '../spinner/profile-skeleton'
import { useusersdataHook } from '@/context/user-values-updations'

type Props = {}

const Appontment = (props: Props) => {
    const [loading, setLoading] =  useState<boolean>(false);
    const {InstituteData:inst} = useusersdataHook();
    const {data , isLoading, refetch , isRefetching} = useGetBlood_requests({id:inst?.res[0]?.institution_id || 0});
    if(isLoading){
        return <div>...loading</div>
    }
  const handelGenerate =async()=>{
    try {
        setLoading(true)
    await generateBloodRequestsRecords({id:inst?.res[0]?.institution_id || 0});
    refetch();
    setLoading(false);
    } catch (error) {
        console.log(error);
        
    }
  }  
  if(loading)return <SkeletonCard/>
  return (
    <div>
        <div className='flex justify-between'>
          {loading?".../loading":<button onClick={handelGenerate}>generate 3000</button> }
        <button disabled={isRefetching} onClick={()=>refetch()}>{isRefetching?"refetching...":"refetch"}</button>
        {/* <ChartBarInteractive/> */}
        </div>
{!isRefetching &&<AppontmentDataTableDemo req={data?.res}/> }
{isRefetching &&<SkeletonCard/>}
    
    </div>
  )
}

export default Appontment