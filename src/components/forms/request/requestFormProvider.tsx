import { Loader } from '@/components/loader'
import { useRequestForm } from '@/hooks/requestBlood/use-request'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {}

const RequestFormProvider = ({children , id}: {children:React.ReactNode , id:number}) => {
    const { methods, onHandleSubmit, loading } = useRequestForm({id})
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

export default RequestFormProvider