import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import { ModalBrand } from '@/components/ModalBrand'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { createBrand, fetchBrands, deleteBrand } from '@/store/typesApi'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { check } from '@/store/fakeHTTP'
import { setUserState } from '@/store/reducers/userSlice'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'


interface IAddBrandFormInput {
  addNewBrand: string
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



export default function Brands() {
  const [brands, setBrands] = useState([])
  const [addBrand, setAddBrand] = useState(false)
  const [modalVisible, setModalVisible] = useState<number | false>(false)
  const [refresh, setRefresh] = useState(false)
  const user = useTypedSelector(state => state.user)

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isValid },
} = useForm<IAddBrandFormInput>({
  mode: 'onChange',
  defaultValues: {
    addNewBrand: '',
  },
})
const onSubmit = async (data: IAddBrandFormInput) => {
  const { addNewBrand } = data
  createBrand({ name: addNewBrand })
  .then((data) => {
    reset({
      addNewBrand: '',
    })
    setRefresh(!refresh)
  })
  .catch((e) => alert(e.response.data.message))
}

  

  useEffect(() => {
    if (modalVisible === false) {
      fetchBrands().then((data) => setBrands(data))
    }
  }, [modalVisible, refresh])

  if(user.role !== 'ADMIN')   return (
    <div className='flex flex-col  justify-center items-center h-screen bg-black'>
      <div className='flex flex-col gap-4'>
      <h3 className='text-2xl text-white'>Войдите как администратор!</h3>
      <Link href="/auth" passHref legacyBehavior>
          <button
          className=' bg-white p-2 border-4 rounded-lg cursor-pointer hover:border-white hover:bg-gray-300 hover:border-4'
          type="button" >
            Return to authorization page
          </button>
        </Link>
      </div>
  </div>
  )

  return (
    <div className='flex flex-col h-screen'>
      <AdminHeader />
      <section className="pt-[20vh] mb-[5vh] grow">
        <div className="flex flex-col justify-center items-center  ">
          <button
            onClick={() => setAddBrand(!addBrand)}
            className="text-white bg-blue-500 hover:bg-blue-800 
        font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
        text-center"
          >
            {`${addBrand ? 'Скрыть' : 'Добавить магазин'}`}
          </button>

          {addBrand && (
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[800px] flex flex-col justify-between items-baseline gap-1 mt-3 ">
              <input
                type="text"
                className="bg-gray-50 border grow border-gray-300 w-full
              text-gray-900 text-sm rounded-lg p-2.5
                "
                {...register('addNewBrand', {
                  required: 'Please enter text',
                })}
                placeholder="Добавьте магазин"
              />
              {errors.addNewBrand && (
                    <p className="text-red-500">Поле не может быть пустым</p>
                  )}

              <button
                type='submit'
                disabled={!isValid}
                className={clsx(isValid ? "bg-blue-500 hover:bg-blue-800" : "bg-gray-200" , "text-white mt-2  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center")}
              >
                Применить
              </button>
            </div>
            </form>
          )}

          <ul className=" mt-10 w-[800px] text-lg font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {!!brands.length &&
              brands.map((brand) => (
                <li
                  key={brand.id}
                  className="gap-2 w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 flex justify-between items-baseline"
                >
                  <p>{brand.name}</p>

                  <div className="flex gap-2 ">
                    <button
                    onClick={() => {
                      deleteBrand(brand.id)
                      setRefresh(!refresh)
                    }}
                      className="text-white my-2 bg-red-400 hover:bg-red-600 
                    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                    text-center "
                    >
                      Удалить
                    </button>
                    <button
                      onClick={() => setModalVisible(brand.id)}
                      className="text-white my-2 bg-blue-500 hover:bg-blue-800 
                      font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                      text-center"
                    >
                      Редактировать
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <ModalBrand isVisible={modalVisible} onClose={setModalVisible} />
      </section>
      <Footer/>
    </div>
  )
}
