import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { wrapper } from '@/store/store'
import { parseCookies } from 'nookies'
import { check } from '@/store/typesApi'
import { setUserState } from '@/store/reducers/userSlice'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { IAddDeviceFormInput, IBrand, IType, IInfo } from '@/models/models'
import { createDevice, fetchBrands, fetchTypes } from '@/store/typesApi'
import type { GetServerSideProps } from 'next'

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
  const [types, setTypes] = useState<IType[]>([])
  const [brands, setBrands] = useState<IBrand[]>([])
  const [infoArr, setInfo] = useState<IInfo[]>([])
  const user = useTypedSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddDeviceFormInput>({
    mode: 'onBlur',
  })
  const onSubmit = (data: IAddDeviceFormInput) => {
    const { selectedType, selectedBrand, name, price, art, file } = data
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('img', file[0])
    formData.append('art', art)
    formData.append('brandId', selectedBrand)
    formData.append('typeId', selectedType)
    formData.append('info', JSON.stringify(infoArr))
    createDevice(formData)
      .then((data) => {
        setInfo([])
        reset({
          name: '',
          price: '',
          art: '',
          file: '',
          selectedBrand: '',
          selectedType: '',
        })
        alert(`создан : ${data.name} `)
      })
      .catch((e) => alert(e?.response?.data?.message || e))
  }

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...infoArr, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number: number) => {
    setInfo(infoArr.filter((i) => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(
      infoArr.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    )
  }

  if (user.role !== 'ADMIN')
    return (
      <div className="flex flex-col  justify-center items-center h-screen bg-black">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl text-white">Войдите как администратор!</h3>
          <Link href="/auth" passHref legacyBehavior>
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

  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pt-[15vh] mb-5 grow flex flex-col content-center"
      >
        <div className="flex flex-col  w-[800px] self-center mt-6 ">
          <div>
            <label className="block mb-2 mt-6" htmlFor={`selectType`}>
              Выберите категорию
            </label>
            <select
              id={`selectType`}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
              {...register('selectedType', { required: true })}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.selectedType && (
              <p className="text-red-600">поле должно быть заполнено</p>
            )}
          </div>

          <div>
            <div>
              <label className="block mb-2 mt-6" htmlFor={`selectBrand`}>
                Выберите магазин
              </label>
              <select
                id={`selectBrand`}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
                {...register('selectedBrand', { required: true })}
              >
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.selectedBrand && (
                <p className="text-red-600">поле должно быть заполнено</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[800px] self-center mt-6 ">
          <div>
            <label htmlFor="name" className="block mb-2">
              <p className="mb-1 ml-1">Название</p>
              <input
                id="name"
                type="text"
                className="bg-white  border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
                {...register('name', {
                  required: 'Please enter name',
                  maxLength: 250,
                })}
              />
              {errors.name && (
                <p className="text-red-600">поле должно быть заполнено</p>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 ">
              <p className="mb-1 ml-1">Цена</p>
              <input
                id="price"
                type="number"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
                {...register('price', {
                  required: 'Please enter text',
                  maxLength: 250,
                })}
              />
              {errors.price && (
                <p className="text-red-600">поле должно быть заполнено</p>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="art" className="block mb-2 ">
              <p className="mb-1 ml-1">Артикул</p>
              <input
                id="art"
                type="number"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
                {...register('art', {
                  required: 'Please enter articul number',
                  maxLength: 250,
                })}
              />
              {errors.art && (
                <p className="text-red-600">поле должно быть заполнено</p>
              )}
            </label>
          </div>

          <label htmlFor="file" className="block mb-2 ">
            <p className="mb-1 ml-1">Изображение</p>
            <input
              id="file"
              {...register('file', {
                required: 'Please enter articul number',
                maxLength: 250,
              })}
              className="opacity-0 max-w-[100px] relative   border border-gray-300 text-gray-900 text-sm rounded-lg  focus:bg-bluej-50 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              type="file"
            />
            {errors.file && (
              <p className="text-red-600  ml-20">добавьте изображение</p>
            )}
            <p className="absolute w-[95px] h-10  -mt-11 ml-1">
              <AiOutlineCloudUpload className="w-11 h-11 absolute ml-4  cursor-pointer" />
            </p>
          </label>

          <div className="bg-blue-50 mt-6 rounded-lg">
            {!!infoArr.length &&
              infoArr.map((info) => (
                <div
                  key={info.number}
                  className="rounded-lg sm:w-auto px-5 py-2.5 mt-6 flex flex-col"
                >
                  <label>
                    Заголовок
                    <input
                      className={clsx(
                        info.title && 'bg-green-100',
                        'border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  mb-4'
                      )}
                      value={info.title}
                      onChange={(e) =>
                        changeInfo(
                          'title',
                          e.target.value,
                          info.number as number
                        )
                      }
                      type="text"
                      placeholder="заголовок"
                      maxLength={30}
                      required
                    />
                  </label>
                  <label>
                    Описание
                    <input
                      className={clsx(
                        info.description && 'bg-green-100',
                        ' border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5 '
                      )}
                      value={info.description}
                      onChange={(e) =>
                        changeInfo(
                          'description',
                          e.target.value,
                          info.number as number
                        )
                      }
                      type="text"
                      placeholder="описание"
                      maxLength={30}
                      required
                    />
                  </label>
                  <button
                    onClick={() => removeInfo(info.number as number)}
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
            disabled={!isValid}
            type="submit"
            className={clsx(
              isValid ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-200',
              'text-white  focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-20'
            )}
          >
            Отправить
          </button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
