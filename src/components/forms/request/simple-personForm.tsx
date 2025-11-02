import { Loader } from '@/components/loader'
import { useRequestForm } from '@/hooks/requestBlood/use-request'
import { useSimplePerson } from '@/hooks/requestBlood/use-simpleperson'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {}

const SimpleFormProvider = ({children}: {children:React.ReactNode}) => {
    const { methods, onHandleSubmit, loading } = useSimplePerson()
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

export default SimpleFormProvider