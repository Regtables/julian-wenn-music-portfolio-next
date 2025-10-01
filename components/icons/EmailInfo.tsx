'use client'

import { useContactDetails } from '@/context/AppSettingsContext'
import { Mail } from 'lucide-react'
import React from 'react'

const EmailInfo = () => {
  const details = useContactDetails()
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Mail size={'1rem'} color='var(--color-gold)' />

      <p>{details.email}</p>
    </div>
  )
}

export default EmailInfo