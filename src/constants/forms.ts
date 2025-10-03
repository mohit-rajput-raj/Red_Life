type UserRegistrationProps ={
    id: string
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' 

  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}
export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Full name',
    name: 'fullname',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'Confirm Email',
    name: 'confirmEmail',
    type: 'email',
  },
  {
    id: '4',
    inputType: 'input',
    placeholder: 'Password',
    name: 'password',
    type: 'password',
  },
  {
    id: '5',
    inputType: 'input',
    placeholder: 'Confrim Password',
    name: 'confirmPassword',
    type: 'password',
  },
]

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Enter your email',
    name: 'email',
    type: 'email',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Password',
    name: 'password',
    type: 'password',
  },
]


type UsresProfileProps = {
  id: string
  type: 'email' | 'text' | 'date'
  inputType: 'select' | 'input'|'image'| 'date'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}

export const USER_PROFILE_FORM: UsresProfileProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'gender',
    name: 'gender',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'date',
    placeholder: 'date of birth',
    name: 'dob',
    type: 'date',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'phone number',
    name: 'phone',
    type: 'text',
  },
  {
    id: '4',
    inputType: 'image',
    placeholder: 'profile image',
    name: 'profile_image',
    type: 'text',
  }
]