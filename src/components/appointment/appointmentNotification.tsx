"use client"
import { useQueriesAppointments, useQueriesInstitutes } from '@/actions/queries/user-queries'
import { useusersdataHook } from '@/context/user-values-updations'
import React from 'react'
import { SkeletonCard } from '../spinner/profile-skeleton'

type Props = {}

const Appointments = (props: Props) => {
    const {usersData} = useusersdataHook();
    const {data , isLoading , refetch , isRefetching} = useQueriesAppointments({id: usersData?.res?.user_id ?? 0});
    if(isLoading || isRefetching){
        return <SkeletonCard />
    }
console.log(data);

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm flex flex-col p-3  rounded-md dark:bg-zinc-800 bg-slate-100 ">
        <div className="card-body w-full flex lg:flex-row flex-col items-center items-between px-10">
            {data?.res?.length===0 ? <p>No Appointments Found</p> : data?.res?.map((appointment:any)=>(
                <div key={appointment.id} className='border-b w-full p-2 flex justify-between'>
                    <div>
                        <p>{appointment.institute_name}</p>
                        <p>{new Date(appointment.date).toLocaleDateString()}</p>
                        <p>{appointment.date}</p>
                    </div>
                    <div>
                        <p>Status: {appointment.status}</p>
                    </div>
                </div>
            ))}
            </div></div>
  )
}

export default Appointments