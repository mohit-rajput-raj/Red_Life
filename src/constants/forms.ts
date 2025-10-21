type UserRegistrationProps ={
    id: string
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' 

  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}
type InstituteBuildingFormProps ={
  id:string,
  type: 'email' | 'text' | 'password'
  inputType: 'select' | 'input' 

  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
}
export const instituteForm: InstituteBuildingFormProps[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Building Name',
    name: 'name',
    label: 'Building Name',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Building Address',
    label: 'Building Address',
    name: 'address_line1',
    type: 'text',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'Building City',
    label: 'Building City',
    name: 'city',
    type: 'text',
  },
  {
    id: '4',
    inputType: 'input',
    placeholder: 'Building State',
    label: 'Building State',
    name: 'state',
    type: 'text',
  },
  {
    id: '5',
    inputType: 'input',
    placeholder: 'Building Country',
    label: 'Building Country',
    name: 'country',
    type: 'text',
  },
  {
    id: '6',
    inputType: 'input',
    placeholder: 'Building Postal Code',
    label: 'Building Postal Code',
    name: 'postal_code',
    type: 'text',
  },
  {
    id: '7',
    inputType: 'input',
    placeholder: 'Building Contact Number',
    label: 'Building Contact Number',
    name: 'contact_no',
    type: 'text',
  },
  // {
  //   id: '8',
  //   inputType: 'input',
  //   placeholder: 'Building Website',
  //   label: 'Building Website',
  //   name: 'website',
  //   type: 'text',
  // }
]
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
export const USER_ADDRESS_FORM: UsresProfileProps[] = [
  {
    id: '4',
    inputType: 'select',
    placeholder: 'Country',
    name: 'country',
    type: 'text',
  },
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Address',
    name: 'address_line1',
    type: 'text',
  },
  {
     id: '6',
    inputType: 'input',
    placeholder: 'Address 2',
    name: 'address_line2',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'City',
    name: 'city',
    type: 'text',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'State',
    name: 'state',
    type: 'text',
  },
  
  {
    id: '5',
    inputType: 'input',
    placeholder: 'Postal Code',
    name: 'postal_code',
    type: 'text', 
  },
  
]

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