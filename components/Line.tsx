import { cn } from '@/app/lib/utils'
import { PropsWithClassName } from '@/types'
import React from 'react'

type LineProps = PropsWithClassName<{
  direction?: 'hor' | 'vert',
  ref?: any
}>

const Line = ({ direction = 'hor', className, ref }: LineProps) => {
  return (
    <div ref = {ref}>
      {direction === 'hor' ? (
        <div className={cn('h-[4px] w-full bg-custom-gold', className)} />
      ) : (
        <div className={cn('w-[4px] bg-custom-gold', className)} />
      )}
    </div>
  )
}

export default Line