import { USER_ADDRESS_FORM } from '@/constants/forms';
import React from 'react'
import { useForm, useFormContext } from 'react-hook-form';
import countryList from 'react-select-country-list';
import FormGenerator from '../form-generatoe';
import { CompleteUserAddressProps } from '@/schemas/usersschemas';

type Props = {}

const EditableAddressForm = (props: Props) => {
    // const { register, formState: { errors }} = useForm<usersaddressdata>();
  const { register, handleSubmit, watch, formState:{errors} } =useFormContext<CompleteUserAddressProps>();

  // const {methods} = useUsersAddressForm();
  
    const countries = countryList().getData();
  return (
    <>
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg dark:bg-zinc-800 shadow-md bg-white"

      >
        {USER_ADDRESS_FORM.map((field) => (
          <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
          options={countries}
        />
        ))}
      </div>

      
    </>
  )
}

export default EditableAddressForm