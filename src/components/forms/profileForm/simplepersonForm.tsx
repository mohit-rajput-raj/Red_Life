import React from 'react'
import FormGenerator from '../form-generatoe';
import { simplepersonForm } from '@/constants/simpleperson';
import { useFormContext } from 'react-hook-form';
import { RequestBloodProps } from '@/schemas/request.schemas';
import SimpleFormProvider from '../request/simple-personForm';
import { useSimplePerson } from '@/hooks/requestBlood/use-simpleperson';

type Props = {}

const SimplePersonForm = (props: Props) => {
    const {op , setop}= useSimplePerson();
  return (
    


    <div>
        {op ? <SimpleFormProvider><div  className='w-screen h-screen absolute flex top-0 left-0 bg-black bg-opacity-50 justify-center items-center'>
            <div className='w-[80%] h-1/2 dark:bg-zinc-800 p-5'> 
            <div className='flex justify-end'>
                <button onClick={()=>setop(false)}>Close</button>

            </div>
            <div className='w-full p-10 rounded-sm'>
                <div className='flex flex-col gap-2 px-2 py-4'>
                    <SimpleForm/>
                </div>
            </div>
            <div className='flex justify-center'>
                <button
                    // onClick={show}
                    type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                    >
                    submit
                  </button>
            </div>
             
            </div>
    </div></SimpleFormProvider>: <button onClick={()=>setop(true)}>Complete Profile</button> }
  
    </div>
  )
}

export default SimplePersonForm


const SimpleForm = () => {
    const {
        register,
        getValues,
        formState: { errors },
      } = useFormContext<RequestBloodProps>();
    return (<>
    {simplepersonForm.map((form) => (
        <FormGenerator
        options={bloodTypes}
          disabled={form.disabled}
          key={form.id}
          name={form.name}
          label={form.label}
          placeholder={form.placeholder}
          type={form.type}
          register={register}
          errors={errors}
          inputType={form.inputType}
        />
      ))}</>)
}
export const bloodTypes = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];