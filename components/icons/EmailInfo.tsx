'use client'

import { useContactDetails } from '@/context/AppSettingsContext'
import { Mail } from 'lucide-react'
import React from 'react'

const EmailInfo = () => {
  const details = useContactDetails()
  return (
    <a href = {`mailto:${details.email}`} className='flex items-center gap-2 text-sm'>
      <Mail size={'1rem'} color='var(--color-gold)' />

      <p>{details.email}</p>
    </a>
  )
}

export default EmailInfo