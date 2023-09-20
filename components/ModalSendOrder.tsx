import { useActions } from '@/hooks/redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { updateBrand } from '@/store/typesApi'
import axios from 'axios'
import clsx from 'clsx'
import { useId, useState, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { BiLogoTelegram } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

enum CommunicationEnum {
  Telegram = 'Telegram',
  Watsapp = 'Watsapp',
  Viber = 'Viber',
  Phone = 'Phone',
}

interface IOrderFormInput {
  tel: string
  communication: CommunicationEnum
}

export function ModalSendOrder({ isVisible, onClose, cart }: any) {
  const dispatch = useDispatch()
  const { clearCard } = useActions()
  const id = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IOrderFormInput>({
    mode: 'onChange',
  })


  const handleClose = (e: MouseEvent) => {
    if (e.target.id === 'wrapper') onClose(false)
  }
  const onSubmit = async (data: IOrderFormInput) => {
    const { communication, tel } = data
    const orederJSON = JSON.stringify(cart)
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/order`, {
        order: orederJSON,
        tel,
        communication,
      })
      if (res.status === 200) {
        reset({
          tel: '',
        })
        clearCard()
        alert(res.data.message)
        dispatch(setSidebarState())
      }
    } catch (e) {
      console.log(e)
      
        alert(e.message)
      
      
    }
    onClose(false)
  }

  if (!isVisible) return null

  return (
    <div
      onClick={(e) => handleClose(e)}
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
            <p className="mb-6">Пожалуйста заполните форму обратной связи</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div>
                  <label htmlFor={`${id}--select`}>Выберите способ связи</label>
                  <select
                  id={`${id}--select`}
                    className="mt-2 outline-none block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    {...register('communication', { required: true })}
                  >
                    <option value="Telegram">Telegram</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Viber">Viber</option>
                    <option value="Phone">Phone</option>
                  </select>
                  {errors.communication && (
                    <p className="text-red-600">
                      поле должно быть заполнено
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor={`${id}--tel`}>Введите номер телефона</label>
                  <input
                    {...register('tel', {
                      required: true,
                      pattern:
                        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                    })}
                    type="text"
                    id={`${id}--tel`}
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="9618444155"
                    required
                  />
                  {errors.tel && (
                    <p className="text-red-600">
                      Поле должно содержать 10 цифровых символов
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className={clsx(
                  isValid
                    ? 'bg-blue-600 hover:bg-blue-800'
                    : 'bg-gray-200',
                  '  text-white mt-2   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                )}
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
