import Appointments from '@/components/appointment/appointmentNotification'
import AddressForm from '@/components/forms/addressForms/test-form'
import ProfileForm from '@/components/forms/profileForm/profile-form'
import React from 'react'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div className='flex flex-col gap-5 p-4'>
      <ProfileForm />
      <AddressForm />
      <Appointments /></div>
  )
}

export default Profile