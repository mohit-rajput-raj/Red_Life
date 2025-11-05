'use client'
import Hero from '@/components/forms/Institute/hospital-form'
// const Hero = dynamic(() => import("@/components/forms/Institute/hospital-form").then(mod => mod.Hero), { ssr: false })
import { SkeletonCard } from '@/components/spinner/profile-skeleton'
import { useusersdataHook } from '@/context/user-values-updations'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {}

const hospital = (props: Props) => {
  const { InstituteData:data,instituteLoading, refetchInstituteData} = useusersdataHook();
 

  
  if(instituteLoading){
    return (
      <div className='flex justify-center items-center h-screen w-full'><SkeletonCard/></div>
    )
  }
  if(!data?.res?.length){
    return (
     <Hero title="Help the citizens of India"
  subtitle="save lives , donate blood and help those in need."
  ctaText="Get started"
  ctaHref="/signup"
  secondaryCtaText="Live demo"
  secondaryCtaHref="/demo"
  imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-AETYstL7FtwX13yjawKPiNsdOJZrsFpEQ&s"
  imageAlt="Product mockup"
  variant="centered" 
  refetch={refetchInstituteData || (()=>{})}
  />

        
        

    )
  }

  return (
    <div>
    {data?.res?.map((item: any) => (
       <div key={item.institution_id}>
          <h1>{item.institution_name}</h1>
        <h1>{item.institution_address}</h1>
      </div>
    )
        
    )}

    </div>
  )
}

export default hospital