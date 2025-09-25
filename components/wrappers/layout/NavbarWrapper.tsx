import Nav from '@/components/navigation/Nav'
import React, { PropsWithChildren } from 'react'

type Props = PropsWithChildren

const NavbarWrapper = ({ children }: Props) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  )
}

export default NavbarWrapper