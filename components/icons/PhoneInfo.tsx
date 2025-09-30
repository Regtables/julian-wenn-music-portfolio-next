'use client'

import { useContactDetails } from '@/context/AppSettingsContext'
import { Phone } from 'lucide-react'
import React from 'react'

const PhoneInfo = () => {
  const { phone } = useContactDetails()
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Phone fill='var(--color-gold)' size={'1rem'} />

      <p>{phone}</p>
    </div>
  )
}

export default PhoneInfo