import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

const Custom404 = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      //router.push('/devices')
    }, 3000)
  }, [router])

  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <Link href="/" passHref legacyBehavior>
          <button type="button" name="button">
            Return To Home
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Custom404
