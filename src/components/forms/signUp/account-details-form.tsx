'use client'
import { USER_REGISTRATION_FORM } from '@/constants/forms'
import { error } from 'console'
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generatoe'

type Props = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

const AccountDetailsForm = (props: Props) => {
  return (
    <>
    <h2>account details</h2>
    <p>enter your email or password</p>
    <div id="clerk-captcha"></div>
    {USER_REGISTRATION_FORM.map((field)=>(
        <FormGenerator
          key={field.id}
          {...field}
          errors = {props.errors}
          register={props.register}
          name={field.name}

        />
    ))}
    </>
  )
}

export default AccountDetailsForm