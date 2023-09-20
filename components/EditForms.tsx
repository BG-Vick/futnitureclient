import { fetchBrands, fetchTypes, updateDevice } from '@/store/typesApi'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai'
import FormInfo from './FormInfo'
import { useRouter } from 'next/router'
import { IBrand, IInfo, IType } from '@/models/models'
import { useForm } from 'react-hook-form'

interface IEditFormProps {
  setEdit: (edit: boolean) => void
  edit: boolean
  name: string
  price: string 
  types: IType[]
  brands: IBrand[]
  actualType: IType 
  actualBrand: IBrand 
  info: IInfo[] | undefined
  id: number
}

interface IEditDeviceFotmInput {
  name: string
  price: string
  brandId: string
  typeId: string
}

export default function EditForms({
  setEdit,
  name,
  price,
  types,
  brands,
  actualType,
  actualBrand,
  info,
  id,
}: IEditFormProps) {
  const [infoInput, setInfoInput] = useState<IInfo[] | undefined>(info)

  const router = useRouter()

  const removeInfo = (id: number) => {
    if(infoInput)
    setInfoInput(infoInput.filter((i) => i.id !== id))
  }

  const updateInfoInput = (state: IInfo) => {
    if(infoInput)
    setInfoInput(
      infoInput.map((item) =>
        item.id === state.id
          ? { ...item, title: state.title, description: state.description }
          : item
      )
    )
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IEditDeviceFotmInput>({
    mode: 'onBlur',
    defaultValues: {
      name,
      price,
      brandId: actualBrand.id.toString(),
      typeId: actualType.id.toString(),
    },
  })

  const onSubmit = async (data: IEditDeviceFotmInput) => {
    const { name, price, brandId, typeId } = data
    const formData = new FormData()

    formData.append('name', name)
    formData.append('id', id.toString())
    formData.append('price', price)
    formData.append('brandId', brandId)
    formData.append('typeId', typeId)
    formData.append('info', JSON.stringify(infoInput))

    updateDevice(formData)
      .then((data) => {
        setEdit(false)
        router.push(`/admin/${id}`)})
      .catch((e) => console.log(e))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pt-8 mb-5 grow flex flex-col content-center"
    >
      <div className="flex flex-col  w-[800px] self-center  ">
        <div>
          <label className="block mb-2 mt-6" htmlFor={`typeId`}>
            Выберите категорию
          </label>
          <select
            id={`typeId`}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
            {...register('typeId', { required: true })}
          >
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.typeId && (
            <p className="text-red-600">поле должно быть заполнено</p>
          )}
        </div>
      </div>

      <div className="flex flex-col  w-[800px] self-center ">
        <div>
          <label className="block mb-2 mt-6" htmlFor={`brandId`}>
            Выберите магазин
          </label>
          <select
            id={`brandId`}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
            {...register('brandId', { required: true })}
          >
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
          {errors.brandId && (
            <p className="text-red-600">поле должно быть заполнено</p>
          )}
        </div>
      </div>
      <div className="flex flex-col  w-[800px] self-center mt-6">
        <div>
          <label htmlFor="name" className="block mb-2">
            <p className="mb-1 ml-1">Название</p>
            <input
              id="name"
              type="text"
              className="bg-white  border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  "
              {...register('name', {
                required: 'Please enter name',
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
              })}
            />
            {errors.price && (
              <p className="text-red-600">поле должно быть заполнено</p>
            )}
          </label>
        </div>

        {!!infoInput && (
          <div className="my-8 ml-8 font-semibold">
            Редактировать информацию о продукте
            <button></button>
          </div>
        )}
        {!!infoInput &&
          infoInput.map((i) => (
            <FormInfo
              key={i.id}
              info={i}
              removeInfo={removeInfo}
              updateInfoInput={updateInfoInput}
            />
          ))}

        <button
          disabled={!isValid}
          type="submit"
          className={clsx(isValid ? 'bg-red-600 hover:bg-red-800': 'bg-gray-200',
            'text-white  focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-8'
          )}
        >
          Отправить
        </button>
      </div>
    </form>
  )
}
