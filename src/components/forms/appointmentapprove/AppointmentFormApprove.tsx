import { Loader } from '@/components/loader'
import { useApproveAppointment } from '@/hooks/approveFormhook/useApproveForm'
import { useCampsCreator } from '@/hooks/camps/use-camps'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {}

const AppontmentFormProvider = ({children}: {children:React.ReactNode}) => {
   const { methods, onHandleSubmit, loading , created } =   useApproveAppointment()
  return (
   <FormProvider {...methods}>
           <form
             onSubmit={onHandleSubmit}
             className="h-full"
           >
             <div className="flex flex-col justify-between gap-3 h-full">
               <Loader loading={loading} created={created}>{children}</Loader>
             </div>
           </form>
         </FormProvider>
  )
}

export default AppontmentFormProvider