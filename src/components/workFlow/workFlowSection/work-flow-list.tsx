'use client'
import React from 'react'
import { CardDemo } from '../workspace_card/workspace-card'

import { useusersdataHook } from '@/context/user-values-updations'
import { useGetAllCampWorkFlow } from '@/actions/queries/user-queries'

type Props = {}

const WorkFlowList = (props: Props) => {
   const { usersData } = useusersdataHook();
    const userId = usersData?.res?.user_id;
if (!userId) {
  return <div>Loading user data...</div>;
}

const { data, refetch , isLoading, isRefetching } = useGetAllCampWorkFlow(userId ?? 0);

if (isLoading || isRefetching) {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
}
  return (
    <>
    {data?.res && data.res.length > 0 ? (
        [...data.res].reverse().map((item , i) => (
          <CardDemo
          serial ={i + 1}
          step = {item.step_name}
          id={item.workflow_id}
           key={item.workflow_id} 
           status={item.status}
           pending={item.pending}
           camp_id={item.camp_id}
           />
        ))
      ) : (
        <div className='text-muted-foreground md:text-2xl min-w-full h-full flex items-center justify-center'>
          no camps found
        </div>
      )}
</>
  )
}

export default WorkFlowList

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      {/* <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div> */}
    </div>
  )
}
