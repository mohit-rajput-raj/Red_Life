'use client'

import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schemas"
import { useSignUp } from "@clerk/nextjs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"
import { onCompleteUserRegistration } from "@/actions/auth"
import { updateUserRole } from "@/actions/metadataupdate/updateUserRole"

export const useSignUpForm = () => {
  const [loading, setLoading] = useState(false)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: { user_type: 'docs' },
    mode: 'onChange',
  })

  const showUserType = () => {
    console.log(methods.getValues('user_type'))
  }

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return

    try {
      setLoading(true)
      await signUp.create({ emailAddress: email, password })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      onNext(prev => prev + 1)
    } catch (error: any) {
      console.error("OTP generation error:", error)
    } finally {
      setLoading(false)
    }
  }

  const onHandleSubmit = methods.handleSubmit(async (values: UserRegistrationProps) => {
    if (!isLoaded) return

    try {
      setLoading(true)

      const completeSignUp = await signUp.attemptEmailAddressVerification({ code: values.otp })

      if (completeSignUp.status !== 'complete') {
        console.error("OTP verification failed")
        return
      }

      const userId = signUp.createdUserId
      const sessionId = completeSignUp.createdSessionId

      if (!userId || !sessionId) {
        console.error("Missing userId or sessionId")
        return
      }

      const registered = await onCompleteUserRegistration(
        values.fullname,
        userId,
        values.user_type
      )

      if (registered?.status === 200 && registered.user) {
        await setActive({ session: sessionId })

        await updateUserRole(userId, values.user_type as "docs" | "user")

        router.push('/auth-redirect')
      } else {
        console.error("Registration failed", registered)
      }
    } catch (error: any) {
      console.error("Signup submit error:", error)
    } finally {
      setLoading(false)
    }
  })

  return {
    showUserType,
    onGenerateOTP,
    methods,
    onHandleSubmit,
    loading,
  }
}
