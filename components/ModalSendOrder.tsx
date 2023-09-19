import { useActions } from '@/hooks/redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setSidebarState } from '@/store/reducers/sidebarSlice'
import { updateBrand } from '@/store/typesApi'
import axios from 'axios'
import clsx from 'clsx'
import { useState } from 'react'
import { BiLogoTelegram } from 'react-icons/bi'
import { useDispatch } from 'react-redux'




export function ModalSendOrder({ isVisible, onClose, cart }: any) {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [communication, setCommunication] = useState('')
  const URL_ENV = 'http://localhost:3000/api'
  const  { clearCard } = useActions()

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose(false)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
     const orederJSON = JSON.stringify(cart)
      try {
        const res = await axios.post(`${URL_ENV}/order`, {
          order: orederJSON,
          phoneNumber,
          communication,
        })
        if(res.status === 200){
            setPhoneNumber('')
            clearCard()
            alert(res.data.message)
            dispatch(setSidebarState())
            
        }
      } catch (e) {
        alert(e.response.data.message)
      } 

    onClose(false)
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
            <p className='mb-6'>Пожалуйста заполните форму обратной связи</p>
            <form>
              <div>
                 <div>
                <p>Выберите способ связи</p>
                  <select
                  className='mt-2 outline-none block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
                  name='select'
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  >
                    <option value="Telegram">Telegram</option>
                    <option value="Whatsapp">Whatsapp</option>
                    <option value="Viber">Viber</option>
                    <option value="Звонок">Звонок</option>
                </select>
                </div> 
                <div>
                <p>Введите номер телефона</p>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="text"
                    id="first_name"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={phoneNumber}
                    placeholder="Введите номер телефона"
                    required
                  />
                </div>
              </div>
              <button
                disabled={!phoneNumber || !communication || !cart.length}
                onClick={(e) => handleSubmit(e)}
                className={clsx(phoneNumber && communication && cart.length && "bg-blue-600 hover:bg-blue-800 ", "bg-gray-200 text-white mt-2   focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center")}
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
