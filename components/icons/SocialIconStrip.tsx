import React from 'react'
import BrandIcon from './BrandIcon'

type Props = {
  iconSize?: number
}

const SocialIconStrip = ({ iconSize = 48 }: Props) => {
  return (
    <div className='flex gap-8'>
      <BrandIcon brand='facebook' size={iconSize} />
      <BrandIcon brand='instagram' size={iconSize}  />
      <BrandIcon brand='spotify' size={iconSize} />
      <BrandIcon brand='appleMusic' size={iconSize} />
      <BrandIcon brand='youtube' size={iconSize-24} className='size-18 flex bg-custom-black justify-center items-center rounded-full text-custom-gold' />
    </div>
  )
}

export default SocialIconStrip