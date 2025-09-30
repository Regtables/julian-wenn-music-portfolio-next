'use client'

import React from 'react'
import Popup from '../Popup'
import { useModal } from '@/context/ModalContext'
import SanityTextBlock from '../SanityTextBlock'

type Props = {}

const FullBioModal = (props: Props) => {
  const { isOpen, types, handleModalClose, data } = useModal()

  const isModalOpen = isOpen && types.includes('fullBio')
  return (
    <Popup isOpen = {isModalOpen} opacity={60} className='items-center justify-center'>
      <div className='bg-custom-black text-custom-gold lg:w-8/12 w-11/12 p-8 my-4 rounded-lg flex flex-col gap-4'>
        <h3 className='text-3xl font-heading'>Full Biography</h3>
        <SanityTextBlock text={data.fullBio}  />
      </div>
    </Popup>
  )
}

export default FullBioModal