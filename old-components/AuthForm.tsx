import { registration, login, logout } from '@/store/fakeHTTP'
import axios from 'axios'
import { useState } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { data } from 'autoprefixer'



export function AuthForm() {

  function handleLogout() {
    logout();
    dispatch(setUserState({
      id: null,
      email: '',
      role: ''
    }))
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()


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
    <div className='container'>
      {user.id ? (
        <>
        <div>{user.email}</div>
        <button className='border-2 border-teal-400 mt-3' onClick={handleLogout}>LOG OUT</button>
        </>
      ) : (
        <form>
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
          <button className='mb-1 border-2 border-teal-400' onClick={signIn}>ОТПРАВИТЬ</button>
        </form>
      )}
    </div>
  )
}
