import React, { Dispatch, SetStateAction } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import UserTypeCard from './user-type-card'

type Props = {
    register: UseFormRegister<FieldValues>
    user_type: 'docs' | 'user'
    setUserType: Dispatch<SetStateAction<'docs' | 'user'>>
}

 const TypeSelectionForm = ({ register, setUserType, user_type }: Props) => {
  return (
    <>
    <h2 className='text-white md:text-4xl font-bold'>create an account</h2>
    <p className="text-gray-400 md:text-sm">
        Tell us about yourself! What do you do? Let’s tailor your
        <br /> experience so it best suits you.
      </p>
    <UserTypeCard
        register={register}
        setUserType={setUserType}
        user_type={user_type}
        value="docs"
        title="I am a Phlebotomist"
        text="Setting up my account for my hospital or camp."
      />
      <UserTypeCard
        register={register}
        setUserType={setUserType}
        user_type={user_type}
        value="user"
        title="Im a donar  or reciver"
        text="Looking to donate or  recive blood."
      />
    </>
  )
}
export default TypeSelectionForm