export type inputProps ={
  id:string,
  type: 'email' | 'text' | 'password' | 'date'
  inputType: 'select' | 'input'|'date'| 'image'

  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  name: string
  disabled?: boolean
}

export const ApprovedForm: inputProps[] = [
  {
    id: '1',
    type: 'text',
    inputType: 'input',
    label: 'request id',
    placeholder: 'Enter your name',
    name: 'request_id',
    disabled:false
  },
  {
    id: '2',
    type: 'date',
    inputType: 'input',
    label: 'date',
    placeholder: 'Enter  date',
    name: 'date',
    disabled: true
  },
 
]

export const DoctorForm: inputProps[] = [
  {
    id: '1',
    type: 'text',
    inputType: 'input',
    label: 'specialization',
    placeholder: 'Enter your name',
    name: 'specialization',
    disabled:false
  },
  {
    id: '2',
    type: 'text',
    inputType: 'input',
    label: 'user id',
    placeholder: 'Enter your id',
    name: 'doctor_id',
    disabled: true
  },
  {
    id: '3',
    type: 'text',
    inputType: 'input',
    label: 'Identification Id',
    placeholder: 'Enter your Identification id',
    name: 'identification_id',
    disabled: false
  },
  
  
]

export const WorkerForm: inputProps[] = [
  {
    id: '1',
    type: 'text',
    inputType: 'select',
    label: 'role',
    placeholder: 'Enter your role',
    name: 'role',
    disabled:false
  },
   {
    id: '2',
    type: 'text',
    inputType: 'input',
    label: 'staff id',
    placeholder: 'Enter your id',
    name: 'staff_id',
    disabled: true
  },
]