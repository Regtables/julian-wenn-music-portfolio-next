import { SanityMusicVideo } from '@/app/lib/sanity/types'
import { cn } from '@/app/lib/utils'
import React from 'react'

type MusicVideosProps = {
  heading: string,
  musicVideos: SanityMusicVideo[]
}

const MusicVideos = ({ heading, musicVideos }: MusicVideosProps) => {
  return (
    <section className='flex flex-col gap-12'>
      <h2 className='section-heading !text-center'>{heading}</h2>

      <div className='flex flex-col items-center'>
        <div className='text-custom-gold flex'>
          {musicVideos.map((item, i) => (
            <div key={i} className={cn('border-y border-r hover:bg-custom-gold/20 border-custom-gold/40 h-[35px] min-w-[150px] flex items-center cursor-pointer justify-center', i === 0 && 'border-l')}>
              {item.name}
            </div>
          ))}
        </div>

        <iframe>

        </iframe>
      </div>
    </section>
  )
}

export default MusicVideos