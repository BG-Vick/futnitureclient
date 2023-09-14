import WomanImg from '@/public/woman_hero.png'
import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      <div className="container mx-auto flex justify-around h-full">
        {/* text */}
        <div className="flex flex-col justify-center">
          {/** pretitle */}
          <div className='font-semibold flex items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>
            New Trend
          </div>
          {/* title */}
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>Elista clothes <br />
          <span className='font-semibold'>WOMENS</span>
          </h1>
          <Link href={'/'} className='self-start uppercase font-semibold border-b-2 border-primary'>
            Discover more
          </Link>
        </div>
        {/* image */}
        <div className='hidden lg:block'>
          <Image
            src={WomanImg}
            alt="Picture of the author"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
