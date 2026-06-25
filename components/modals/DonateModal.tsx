'use client'

import React from 'react'
import Popup from '../Popup'
import { useModal } from '@/context/ModalContext'
import SanityTextBlock from '../SanityTextBlock'
import Donate from '../Donate'

type Props = {}

const DonateModal = (props: Props) => {
  const { isOpen, types, handleModalClose, data } = useModal()

  const isModalOpen = isOpen && types.includes('donate')
  return (
    <Popup fade isOpen = {isModalOpen} opacity={60} className='items-center justify-center'>
      <Donate />
    </Popup>
  )
}

export default DonateModal