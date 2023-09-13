import { registration, login, logout, check, getCookie } from '@/store/fakeHTTP'
import { useEffect, useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import Footer from '@/components/Footer'



 export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx)
      const userData = await check(token)
      store.dispatch(setUserState(userData))
    } catch (e) {
      console.log(e)
      return { props: {} }
    }
    return { props: {} }
  })






export default function Auth({}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disable, setDisable] = useState(true)
  const user = useTypedSelector((state) => state.user)
  console.log(user)
  const dispatch = useDispatch()
  const router = useRouter()


  
  useEffect(() => {
    if (user.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [user.role, router])



  const signIn = async (e: any) => {
    e.preventDefault()
    try {
      const data = await login(email, password) 
      dispatch(setUserState(data))
    } catch (e) {
      alert(e.response.data.message.toUpperCase())
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <section className="flex flex-col flex-1 ">
        <form className="flex flex-col w-[280px] sm:w-[400px] self-center pt-[35vh] ">
          <div>
            <label>
              email:
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5 "
                placeholder="введите ваш email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              password:
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="hellomisterNguyen541810"
                type="password"
                name="password"
                value={password}
                
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button
              className="mt-6  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
              onClick={signIn}
            >
              ОТПРАВИТЬ
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </div>
  )
}
