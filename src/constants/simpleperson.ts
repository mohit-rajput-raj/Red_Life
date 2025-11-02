import { inputProps } from "./doctor-worker-form";

export const simplepersonForm :inputProps[]=[
   { id: '1',
    type: 'text',
    inputType: 'input',
    label: 'medical conditions',
    placeholder: 'Enter your medical conditions',
    name: 'medical_conditions',
    disabled:false},
    { id: '2',
    type: 'text',
    inputType: 'select',
    label: 'blood type',
    placeholder: 'Enter your blood type',
    name: 'blood_type',
    disabled:false}
]