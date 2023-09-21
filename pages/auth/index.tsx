import { login, check } from '@/store/typesApi'
import { useId } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { AxiosError } from 'axios'
import type { GetServerSideProps } from 'next'

interface ILoginFormInput {
  email: string
  password: string
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

export default function Auth({}) {
  const id = useId()
  const user = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ILoginFormInput>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: ILoginFormInput) => {
    const { email, password } = data
    try {
      const data = await login(email, password)
      dispatch(setUserState(data))
      reset({
        email: '',
        password: '',
      })
    } catch (e: unknown) {
      console.log(e)
      if (e instanceof AxiosError) {
        alert(e.message)
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {user.role === 'ADMIN' ? (
        <div className="grow mt-[20vh] flex flex-col justify-center items-center">
          <h3>Hello {user.email}</h3>
          <Link
            className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  "
            href={'/admin'}
          >
            НА СТРАНИЦУ АДМИНИСТРАТОРА
          </Link>
        </div>
      ) : (
        <section className="flex flex-col flex-1 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[280px] sm:w-[400px] self-center pt-[35vh] "
          >
            <div>
              <label htmlFor={`${id}--email`}>
                email:
                <input
                  id={`${id}--email`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5 "
                  placeholder="example123@mail.com"
                  type="text"
                  {...register('email', {
                    required: 'Please enter your email',
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                      message: 'Введите корректный email',
                    },
                  })}
                />
                {errors.email && errors.email.type === 'required' && (
                  <p className="text-red-500">Email - обязательное поле.</p>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <p className="text-red-500">Не валидный email.</p>
                )}
              </label>
              <label htmlFor={`${id}--password`}>
                password:
                <input
                  id={`${id}--password`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">Введите пароль</p>
                )}
              </label>
              <button
                disabled={!isValid}
                className={clsx(
                  isValid ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-200',
                  'mt-6  text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  '
                )}
                type="submit"
              >
                ОТПРАВИТЬ
              </button>
            </div>
          </form>
        </section>
      )}
      <Footer />
    </div>
  )
}
