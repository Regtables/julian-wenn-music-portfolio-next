import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{}>

const DrawerProvider = ({ children }: Props) => {
  return (
    <div>DrawerProvider</div>
  )
}

export default DrawerProvider