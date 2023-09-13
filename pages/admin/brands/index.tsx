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
  const [addBrand, setAddBrand] = useState(false)
  const [brandState, setBrandState] = useState('')
  const [modalVisible, setModalVisible] = useState<number | false>(false)
  const [refresh, setRefresh] = useState(false)

  const user = useTypedSelector(state => state.user)
  const router = useRouter()

  

useEffect(() => {
  if(user.role !== 'ADMIN'){
    router.push('/auth')
  }
},[router, user.role])

  const [brands, setBrands] = useState([])

  useEffect(() => {
    if (modalVisible === false) {
      fetchBrands().then((data) => setBrands(data))
    }
  }, [modalVisible, refresh])

  const handleSubmit = (e) => {
    e.preventDefault()
    createBrand({ name: brandState })
      .then((data) => {
        setBrandState('')
        setRefresh(!refresh)
      })
      .catch((e) => alert(e.response.data.message))
  }

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
            {`${addBrand ? 'Скрыть' : 'Добавить бренд'}`}
          </button>

          {addBrand && (
            <div className="w-[800px] flex justify-between items-baseline gap-1 mt-3">
              <input
                onChange={(e) => setBrandState(e.target.value)}
                type="text"
                id="first_name"
                className="bg-gray-50 border grow border-gray-300 
            text-gray-900 text-sm rounded-lg p-2.5
            "
                value={brandState}
                placeholder="Добавьте тип"
                required
              />

              <button
                onClick={(e) => handleSubmit(e)}
                className="text-white mt-2 bg-blue-500 hover:bg-blue-800 
                font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center"
              >
                Применить
              </button>
            </div>
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
