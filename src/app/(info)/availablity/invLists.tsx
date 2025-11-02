"use client"
import { useQueryAllInventory, useQueryInstituteData } from '@/actions/queries/user-queries';
import InstCard from '@/components/availablity/instCards';
import React from 'react'
import { useInventoryValues } from './generateObjectsInvemtory';
import { SkeletonCard } from '@/components/forms/profileForm/profile-form';
import { useAuthContextHook } from '@/context/use-auth-context';
import { useusersdataHook } from '@/context/user-values-updations';
import { useRouter } from 'next/navigation';

type Props = {}

const InventoryList = (props: Props) => {
  const router = useRouter();
  const {inventoryObj:list,refetch,isRefetching , isLoading} = useInventoryValues();
    if(list){
        console.log(list  , "are bhiya");
        
    }
    if(isLoading){
      return <SkeletonCard/>
    }
    const handelrefatch = ()=>{
      try {
        refetch();
      } catch (error) {
        console.log(error);
        
      }
    }
    // console.log(list);
 
  
  return (
     <div className='p-20 flex flex-col gap-5  dark  dark:bg-zinc-900 min-h-screen'>
      <button disabled={isRefetching} onClick={handelrefatch}>{isRefetching?"refetching...":"refetch"}</button>
        {list && Object.values(list).map(({ institute_id, blood })=>(
          <div key={institute_id} className=' w-full  p-5 rounded-lg shadow-lg flex px-20 justify-between  dark:bg-zinc-800 bg-white overflow-hidden'>
            <InstCard item={blood} institute_id={institute_id } />
          </div>
        ))}
      </div>
  )
}

export default InventoryList