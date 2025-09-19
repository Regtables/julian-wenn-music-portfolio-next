'use client'

import { Phone } from 'lucide-react'
import React from 'react'

const PhoneInfo = () => {
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Phone fill='var(--color-gold)' size={'1rem'} />

      <p>012345678</p>
    </div>
  )
}

export default PhoneInfo