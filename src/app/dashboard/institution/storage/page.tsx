'use client'
import Hero from '@/components/forms/Institute/hospital-form'
import { SkeletonCard } from '@/components/spinner/profile-skeleton'
import { useusersdataHook } from '@/context/user-values-updations'
import React from 'react'

type Props = {}

const Storage = (props: Props) => {
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
  imageSrc="https://t3.ftcdn.net/jpg/00/49/31/24/360_F_49312453_37Zgpnq5RVY6pQWXjX51U1qHzYfZQ8IK.jpg"
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
    ))}

    </div>
  )
}

export default Storage