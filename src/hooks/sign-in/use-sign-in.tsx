"use client"
import { UserLoginProps, UserLoginSchema } from '@/schemas/auth.schemas'
import { useSignIn } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs/server'
import { zodResolver } from '@hookform/resolvers/zod'
import { el } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
//   const { toast } = useToast()
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'onChange',
  })
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return

      try {
        setLoading(true)
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        if (authenticated.status === 'complete') {
          await setActive({ session: authenticated.createdSessionId })
        //   toast({
        //     title: 'Success',
        //     description: 'Welcome back!',
        //   })
        
          router.push('/auth-redirect')
          
        }
      } catch (error: any) {
        setLoading(false)
        if (error.errors[0].code === 'form_password_incorrect')
          {
            toast.message('Incorrect password. Please try again.')
        }else if (error.errors[0].code === 'form_identifier_not_found') {
            toast.message('No account found with this email.')
        }
      }
    }
  )

  return {
    methods,
    onHandleSubmit,
    loading,
  }
}
