import DonateModal from '@/components/modals/DonateModal'
import FullBioModal from '@/components/modals/FullBioModal'
import GalleryPreviewModal from '@/components/modals/GalleryPreviewModal'
import UpcomingShowsPosterModal from '@/components/modals/UpcomingShowsPosterModal'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const ModalProvider = ({ children }: Props) => {
  return (
    <div>
      <UpcomingShowsPosterModal />
      <FullBioModal />
      <GalleryPreviewModal />
      <DonateModal />
    </div>
  )
}

export default ModalProvider