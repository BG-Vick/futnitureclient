import { registration, login, logout, check, getCookie } from '@/store/fakeHTTP'
import { useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'

export default function Home({}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const router = useRouter()


  if(user.role === 'USER'){
    router.push('/products')
  } 
  
  function handleLogout() {
    logout()
    dispatch(
      setUserState({
        id: null,
        email: '',
        role: '',
      })
    )
  }

  const signIn = async (e: any) => {
    e.preventDefault()
    //const data = await registration(email, password)    // REGISTRATION
    try {
      const data = await login(email, password) // LOGIN
      dispatch(setUserState(data))
    } catch (e) {
      alert(e.response.data.message.toUpperCase())
    }
    setEmail('')
    setPassword('')
  }


  return (
    <div>
      {user.id ? (
        <>
          <div>{user.email}</div>
          <button
            className="border-2 border-teal-400  mt-96"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        </>
      ) : (
        <form className="container mt-96 mb-96 z-50">
          <label>
            email:
            <input
              placeholder="введите ваш email"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            password:
            <input
              placeholder="введите ваш пароль"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="mb-1 border-2 border-teal-400" onClick={signIn}>
            ОТПРАВИТЬ
          </button>
        </form>
      )}
    </div>
  )
}

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
