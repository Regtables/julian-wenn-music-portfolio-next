import FullBioModal from '@/components/modals/FullBioModal'
import UpcomingShowsPosterModal from '@/components/modals/UpcomingShowsPosterModal'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const ModalProvider = ({ children }: Props) => {
  return (
    <div>
      <UpcomingShowsPosterModal />
      <FullBioModal />
    </div>
  )
}

export default ModalProvider