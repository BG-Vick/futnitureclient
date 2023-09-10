import Hero from "@/components/Hero"
import { useRouter } from "next/router"
import { useEffect } from "react"
export default function Home() {
  const router = useRouter()
/*   useEffect(() => {
    router.push('/products')
  },[router]) */
  return (
    <div className="h-[90vh]">
          <p>Loading ...</p>
    </div>
  )
}
