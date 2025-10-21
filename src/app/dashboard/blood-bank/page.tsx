// import { WobbleCardDemo } from '@/components/bank/wobblecard'
import React from 'react'
import { CardHoverEffectDemo } from '../../../components/bank/instution-cards'
import { SelectInstituteType } from '../../../components/bank/type-select'

type Props = {}

const BloodBank = (props: Props) => {
  return (
    <div>
      <SelectInstituteType/>
      <CardHoverEffectDemo/>
    </div>
  )
}

export default BloodBank