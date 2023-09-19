 import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import { ModalType } from '@/components/ModalType'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
  createDevice,
  createType,
  fetchBrands,
  fetchTypes,
} from '@/store/typesApi'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { type } from 'os'
import { useEffect, useState } from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { check } from '@/store/fakeHTTP'
import { setUserState } from '@/store/reducers/userSlice'
import Link from 'next/link'



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










export default function AddProduct() {
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [visibleTypes, setVisibleTypes] = useState(false)
  const [visibleBrand, setVisibleBrand] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | string>('')
  const [art, setArt] = useState<number | string>('')
  const [file, setFile] = useState('')
  const [info, setInfo] = useState<any>([])

  const user = useTypedSelector(state => state.user)
  const router = useRouter()




  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [])



  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const addDevice = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('art', art)
    formData.append('brandId', selectedBrand.id)
    formData.append('typeId', selectedType.id)
    formData.append('info', JSON.stringify(info))

    createDevice(formData)
      .then((data) => {
        alert(`создан : ${data.name} `)
        stateRefresh()
      })
      .catch((e) => alert(e?.response?.data?.message || e))
  }
  function stateRefresh(){
    setArt("")
    setName("")
    setPrice("")
    setFile('')
    setSelectedBrand(null)
    setSelectedType(null)
    setInfo([])
  }
  if(user.role !== 'ADMIN')   return (
    <div className='flex flex-col  justify-center items-center h-screen bg-black'>
      <div className='flex flex-col gap-4'>
      <h3 className='text-2xl text-white'>Войдите как администратор!</h3>
      <Link href="/auth" passHref legacyBehavior>
          <button
          className=' bg-white p-2 border-4 rounded-lg cursor-pointer hover:border-white hover:bg-gray-300 hover:border-4'
          type="button" >
            Return To Home
          </button>
        </Link>
      </div>
  </div>
  )

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <form className="pt-[15vh] mb-5 grow flex flex-col content-center">
        <div className="flex flex-col  w-[800px] self-center mt-6 ">
          <p className='mb-1 ml-1'>Выбери тип</p>
          <div
            onClick={() => setVisibleTypes(!visibleTypes)}
            className={clsx(selectedType && "bg-green-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-blue-50 relative")}
          > 
            {selectedType?.name || 'не выбран'}
            <div className="absolute rounded-lg w-full mt-3  ml-3 z-10">
              {visibleTypes &&
                types.map((type) => (
                  <div
                    onClick={() => {
                      setSelectedType(type)
                    }}
                    key={type.id}
                    className={clsx(' hover:bg-blue-400  bg-blue-100 border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300')}
                  >
                    {type.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[800px] self-center mt-6 ">
        <p className='mb-1 ml-1'>Выбери бренд</p>
          <div
            onClick={() => setVisibleBrand(!visibleBrand)}
            className={clsx(selectedBrand &&  "bg-green-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-blue-50 relative")}
          >
            {selectedBrand?.name || 'не выбран'}
            <div className="absolute rounded-lg w-full mt-3  ml-3">
              {!visibleTypes && visibleBrand &&
                brands.map((brand) => (
                  <div
                    onClick={() => {
                      setSelectedBrand(brand)
                    }}
                    key={brand.id}
                    className="hover:bg-blue-400 bg-blue-100  border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300 "
                  >
                    {brand.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[800px] self-center mt-6">
          <div>
            <label className="block mb-2">
              <p className='mb-1 ml-1'>Название</p>
              <input
                onChange={(e) => setName(e.target.value)} 
                type="text"
                className={clsx(name && "bg-green-100","bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  ")}
                value={name} 
                required
              />
            </label>
          </div>
          <div>
            <label className="block mb-2 ">
            <p className='mb-1 ml-1'>Цена</p>
              <input
              onChange={(e) => setPrice(Number(e.target.value))} 
                type="number"
                className={clsx(!!price &&"bg-green-100","bg-blue-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  ")}
                 value={price}
                required
              />
            </label>
          </div>

          {/* art */}
          <div>
            <label className="block mb-2 ">
            <p className='mb-1 ml-1'>Артикул</p>
              <input
              onChange={(e) => setArt(Number(e.target.value))} 
                type="number"
                className={clsx(!!art &&"bg-green-100","bg-blue-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  ")}
                 value={art}
                 placeholder='должен быть уникальным'
                required
              />
            </label>
          </div>

          {/* art */}

          <label className="block mb-2 ">
          <p className='mb-1 ml-1'>Изображение</p>
            <input
            onChange={(e) => selectFile(e)}
              className={clsx("opacity-0 max-w-[100px] relative  bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:bg-bluej-50 focus:border-blue-500 block w-full p-2.5 cursor-pointer")}
              type="file"
              placeholder='выбери изображение'
              required
            />
            <p className='absolute w-[95px] h-10  -mt-11 ml-1' >
            <AiOutlineCloudUpload className='w-11 h-11 absolute ml-4  cursor-pointer'/>
            </p>
          </label>

          <div className="bg-blue-50 mt-6 rounded-lg">
            {!!info &&
              info.map((info) => (
                <div
                  key={info.number}
                  className="rounded-lg sm:w-auto px-5 py-2.5 mt-6 flex flex-col"
                >
                  <label>
                    Заголовок
                    <input
                      className={clsx(info.title &&   "bg-green-100"  , "border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  mb-4")}
                      value={info.title}
                      onChange={(e) =>
                        changeInfo('title', e.target.value, info.number)
                      }
                      type="text"
                      placeholder="заголовок"
                      required
                    />
                  </label>
                  <label>
                    Описание
                    <input
                      className={clsx(info.description && "bg-green-100"  , " border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5 ")}
                      value={info.description}
                      onChange={(e) =>
                        changeInfo('description', e.target.value, info.number)
                      }
                      type="text"
                      placeholder="описание"
                      required
                    />
                  </label>
                  <button
                    onClick={() => removeInfo(info.number)}
                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-6 self-end"
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <button
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center "
              onClick={addInfo}
            >
              Добавить характеристику
            </button>
          </div>

          <button
            onClick={(e) => {
              if(selectedType && selectedBrand && name && price && file){
                addDevice(e)
              }else {
                alert('Заполните все поля!')
              }
            }}
            className={clsx(selectedType && selectedBrand && name && price && file && "bg-red-700 hover:bg-red-700" ,"text-white bg-red-200  focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-20")}
          >
            Отправить
          </button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
 