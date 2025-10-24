'use client'
import Home from '@/components/chat/open-ai'
import InstituteFormProvider from '@/components/forms/Institute/formProvider'
import Hero from '@/components/forms/Institute/hospital-form'
import { SkeletonCard } from '@/components/spinner/profile-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { useusersdataHook } from '@/context/user-values-updations'
import { useQueryInstituteData, useQueryUsersData } from '@/actions/queries/user-queries'
import React, { useEffect } from 'react'

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
     <Hero title="Build faster with Mohit's UI"
  subtitle="Beautiful components, tiny bundle size — made with Tailwind & React."
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
    something is exists
    {data?.res?.map((item: any) => (
      <div key={item.institution_id}>{item.name}</div>
    ))}

    </div>
  )
}

export default hospital