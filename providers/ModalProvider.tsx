import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const ModalProvider = ({ children }: Props) => {
  return (
    <div>ModalProvider</div>
  )
}

export default ModalProvider