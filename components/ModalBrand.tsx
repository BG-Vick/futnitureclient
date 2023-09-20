import { updateBrand } from '@/store/typesApi'
import { registration, login, logout, check, getCookie } from '@/store/fakeHTTP'
import { useEffect, useState, useId } from 'react'
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
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

interface IEditBrandFormInput {
  brand: string
}

export function ModalBrand({ isVisible, onClose }: any) {
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose(false)
  }



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IEditBrandFormInput>({
    mode: 'onChange',
    defaultValues: {
      brand: '',
    },
  })
  const onSubmit = async (data: IEditBrandFormInput) => {
    const { brand } = data
      updateBrand(brand, isVisible).then((data) => {
        reset({
          brand: '',
        })
        onClose(false)
      }).catch (e => alert(e.response.data.message || e)) 
  }

  if (!isVisible) return null
  
  return (
    <div
      onClick={handleClose}
      id="wrapper"
      className="z-50 fixed inset-0 bg-slate-900/60 backdrop-blur-sm  flex justify-center items-center"
    >
      <div className="w-[600px] flex flex-col">
        <button
          onClick={() => onClose(false)}
          className="text-white text-xl place-self-end"
        >
          X
        </button>
        <div className="bg-white p-2 rounded">
          <div className="p-6">
            <p>Редактирование магазинов</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="text">
                  <input
                    id="text"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Добавьте магазин"
                    {...register('brand', {
                      required: 'Please enter text',
                    })}
                  />
                  {errors.brand && (
                    <p className="text-red-500">Поле не может быть пустым</p>
                  )}
                </label>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className={clsx(
                  isValid ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-200',
                  'text-white mt-2  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                )}
              >
                Изменить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
