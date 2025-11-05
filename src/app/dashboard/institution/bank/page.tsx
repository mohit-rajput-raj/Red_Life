'use client'
import Hero from '@/components/forms/Institute/hospital-form'
// const Hero = dynamic(() => import("@/components/forms/Institute/hospital-form").then(mod => mod.Hero), { ssr: false })
import { SkeletonCard } from '@/components/spinner/profile-skeleton'
import { useusersdataHook } from '@/context/user-values-updations'
import dynamic from 'next/dynamic'
import React from 'react'

type Props = {}

const Bloodbank = (props: Props) => {
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
  imageSrc="https://content.jdmagicbox.com/comp/indore/c2/0731px731.x731.171206100642.e7c2/catalogue/shri-indore-cloth-market-hospital-blood-bank-dhar-road-indore-blood-banks-TNllrDqZl8.jpg"
  imageAlt="Product mockup"
  variant="centered" 
  refetch={refetchInstituteData || (()=>{})}
  />

        
        

    )
  }

  return (
    <div>
    {data?.res?.map((item: any) => {
       
    return(
      <div key={item.institution_id}>
{item.institution_name}
      </div>
    )})}

    </div>
  )
}

export default Bloodbank