'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FormGenerator from '../form-generatoe'
import { USER_LOGIN_FORM } from '@/constants/forms'

type Props = {}

const LoginForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <h2 className="text-gray-200 md:text-4xl font-bold">Login</h2>
      <p className="text-gray-400 md:text-sm">
        You will receive a one time password
      </p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  )
}

export default LoginForm
