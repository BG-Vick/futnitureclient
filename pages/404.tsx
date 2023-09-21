import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Custom404 = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [router])

  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="text-center flex flex-col gap-10">
        <h3 className="text-white text-xs">СТРАНИЦА НЕ НАЙДЕНА</h3>
        <h1 className="text-white font-primary text-9xl">404</h1>
        <Link href="/" passHref legacyBehavior>
          <button
            className=" bg-white p-2 border-4 rounded-lg cursor-pointer hover:border-white hover:bg-gray-300 hover:border-4"
            type="button"
          >
            Return To Home
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Custom404
