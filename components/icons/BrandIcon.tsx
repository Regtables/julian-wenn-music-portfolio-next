'use client'

import { cn } from '@/app/lib/utils'
import { useBrandLinks,  } from '@/context/AppSettingsContext'
import { PropsWithClassName } from '@/types'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type BrandIconProps = PropsWithClassName<{
  brand: string,
  size?: number,
  iconColor: string
}>

const BrandIcon = ({ size = 48, brand, className }: BrandIconProps) => {
  const { brands, brandIconPaths } = useBrandLinks()

  const link = brands[brand]
  const icon = brandIconPaths[brand]

  const iconElement = (
    <div className= {cn(className)}>
      <Image
        src={icon}
        alt = {`${brand} icon`}
        height={size}
        width={size}
        className=''
      />
    </div>
  )
  return (
    <Link href= {''}>
      {iconElement}
    </Link>
  )
}

export default BrandIcon