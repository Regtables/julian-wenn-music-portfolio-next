'use client'

import { Mail } from 'lucide-react'
import React from 'react'

const EmailInfo = () => {
  return (
    <div className='flex items-center gap-2 text-sm'>
      <Mail size={'1rem'} color='var(--color-gold)' />

      <p>julianwenn@gmail.com</p>
    </div>
  )
}

export default EmailInfo