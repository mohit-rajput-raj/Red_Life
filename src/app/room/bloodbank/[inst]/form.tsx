"use client"
import { RequestFormInputes } from '@/components/forms/request/Request-form'
import RequestFormProvider from '@/components/forms/request/requestFormProvider'
import { Button } from '@/components/ui/button'
import { useRequestForm } from '@/hooks/requestBlood/use-request'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Forme = ({id}:{id:number}) => {
  const router  = useRouter();
  return (
    <RequestFormProvider id={id} >

     <div className="w-full p-20 flex justify-center items-center">
       <div className="w-full max-w-md">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-2xl mx-auto w-full space-y-6 p-4 border rounded-md px-10 flex-wrap">
                <RequestFormInputes />
              </div>
            </div>
             <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
              <div className="max-w-2xl mx-auto w-full flex gap-3">
                <button  className="text-black dark:text-white flex-1"
                // onClick={show}
                type="submit"
                >
                  send request
                </button>
                  <Button variant="outline" size="lg" className="w-full" onClick={()=>router.push(`/room/bloodbank`)}>
                    Cancel
                  </Button>
               
                
              </div>
            </div>
    </div>
    </div>
                </RequestFormProvider>
  )
}

export default Forme