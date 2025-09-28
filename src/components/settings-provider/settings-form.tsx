import React from 'react'
import { Input } from '../ui/input'

type Props = {}

const SettingsProvider = (props: Props) => {
  return (
    <div className='p-10 rounded-md border-spacing-1'>
      <Input type="email" placeholder="Email" />
      <Input type="email" placeholder="Email" />
    </div>
  )
}

export default SettingsProvider