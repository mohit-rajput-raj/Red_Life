import { Loader } from '@/components/loader'
import { useDonationRecords } from '@/hooks/donation_record/use_donationRecords'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {}

const DonarFormProvider = ({children , id , c}:{children:React.ReactNode , id:number , c:number}) => {
   const { methods, onHandleSubmit, loading } = useDonationRecords({id , c})
  return (
   <FormProvider {...methods}>
           <form
             onSubmit={onHandleSubmit}
             className="h-full"
           >
             <div className="flex flex-col justify-between gap-3 h-full">
               <Loader loading={loading}>{children}</Loader>
             </div>
           </form>
         </FormProvider>
  )
}

export default DonarFormProvider