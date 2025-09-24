

import ButtonHandler from '@/components/forms/signUp/button-handlers'
import SignUpFormProvider from '@/components/forms/signUp/form-provider'
import ReagistrationFormSteps from '@/components/forms/signUp/registration-steps'
import React from 'react'

type Props = {}

const SignUp = (props: Props) => {
  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <SignUpFormProvider>
          

          <div className="flex flex-col gap-3 text-white">
            <ReagistrationFormSteps />
            <ButtonHandler />
          </div>
          {/* <HighLightBar /> */}
        </SignUpFormProvider>
      </div>
    </div>
  )
}

export default SignUp
