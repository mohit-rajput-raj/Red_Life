import Appontment from '@/components/appointments-docs/appointment'
import { AppontmentDataTableDemo } from '@/components/appointments-docs/appointments_tables'
import { ChartBarInteractive } from '@/components/chart/donations-bar-chart'
import React from 'react'

type Props = {}

const Appointment = async(props: Props) => {
  return (
    <div>
      <Appontment/>
      </div>
  )
}

export default Appointment


