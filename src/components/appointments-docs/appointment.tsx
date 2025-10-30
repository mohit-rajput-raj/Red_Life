'use client'
import React, { useState } from 'react'
import { ChartBarInteractive } from '../chart/donations-bar-chart'
import { AppontmentDataTableDemo } from './appointments_tables'
import { useGetBlood_requests } from '@/actions/queries/user-queries'
import { generateBloodRequestsRecords } from './generateRandomAppontments'
import { SkeletonCard } from '../spinner/profile-skeleton'

type Props = {}

const Appontment = (props: Props) => {
    const [loading, setLoading] =  useState<boolean>(false);
    const {data , isLoading, refetch , isRefetching} = useGetBlood_requests({id:11});
    if(isLoading){
        return <div>...loading</div>
    }
    console.log(data);
  const handelGenerate =async()=>{
    try {
        setLoading(true)
    await generateBloodRequestsRecords();
    refetch();
    setLoading(false);
    } catch (error) {
        console.log(error);
        
    }
  }  
  if(loading || isRefetching)return <SkeletonCard/>
  return (
    <div>
        {loading?".../loading":<button onClick={handelGenerate}>generate 3000</button> }
        <ChartBarInteractive/>
<AppontmentDataTableDemo data={data?.res}/> 
    
    </div>
  )
}

export default Appontment