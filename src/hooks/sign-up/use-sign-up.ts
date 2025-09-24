'use client'
import { UserRegistrationProps, UserRegistrationSchema } from "@/schemas/auth.schemas"
import { useSignUp } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation"
import { onCompleteUserRegistration } from "@/actions/auth"


export const useSignUpForm = () => {
    const [loading , setLoading] = useState<boolean>(false)
    const {signUp , isLoaded, setActive} = useSignUp()
    const router = useRouter()
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues:{
          user_type:'docs'
        },
        mode: 'onChange',
    })
//     useEffect(() => {
//   const subscription = methods.watch((value) => {
//     console.log("Watched user_type:", value.user_type)
//   })
//   return () => subscription.unsubscribe()
// }, [methods])

    const showUser_type = ()=>{
      console.log(methods.getValues('user_type'));
    }
    

      const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) return

    try {
      setLoading(true)
      await signUp.create({
        emailAddress: email,
        password: password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      onNext((prev) => prev + 1)
      setLoading(false)
    } catch (error: any) {
      console.log(error);
      
      // toast({
      //   title: 'Error',
      //   description: error.errors[0].longMessage,
      // })
    }
  }   
     const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return
      // console.log(values);
      




      //commit

      try {
        setLoading(true)
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp , 
        })

        if (completeSignUp.status !== 'complete') {
          return { message: 'Something went wrong!' }
        }

        if (completeSignUp.status == 'complete') {
          if (!signUp.createdUserId) return
            console.log(values);
            
          const registered = await onCompleteUserRegistration(
            values.fullname,
            signUp.createdUserId,
            values.user_type
          )

          if (registered?.status == 200 && registered.user) {
            await setActive({
              session: completeSignUp.createdSessionId,
            })

            setLoading(false)
            router.push('/dashboard')
          }

          if (registered?.status == 400) {
            console.log({
              title: 'Error',
              description: 'Something went wrong!',
            });
            
            // toast({
            //   title: 'Error',
            //   description: 'Something went wrong!',
            // })
          }
        }
      } catch (error: any) {
        console.log(error);
        
        // toast({
        //   title: 'Error',
        //   description: error.errors[0].longMessage,
        // })
      }
    }
  )
    return {
       showUser_type,
      onGenerateOTP,
        methods,
        onHandleSubmit,
        loading,
    }
}
