import UpcomingShowsPosterModal from '@/components/modals/UpcomingShowsPosterModal'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const ModalProvider = ({ children }: Props) => {
  return (
    <div>
      <UpcomingShowsPosterModal />
    </div>
  )
}

export default ModalProvider