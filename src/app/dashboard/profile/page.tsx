'use client'
import ProfileForm from '@/components/forms/profileForm/profile-form'
import UsersProfileData from '@/components/profile/usersdata-profile'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div>
       
      
      <ProfileForm/>
       

    </div>
  )
}

export default Profile