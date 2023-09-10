import { updateBrand } from '@/store/typesApi'
import { useState } from 'react'

export function ModalBrand({ isVisible, onClose }: any) {
  console.log(isVisible)
  const [brand, setBrand] = useState('')
  
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose(false)
  }
  if (!isVisible) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    updateBrand(brand, isVisible).then(data => {
      setBrand('')
      onClose(false)
    })
  }

  return (
    <div onClick={handleClose} id="wrapper" className="z-50 fixed inset-0 bg-slate-900/60 backdrop-blur-sm  flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button onClick={() => onClose(false)} className="text-white text-xl place-self-end">X</button>
        <div className="bg-white p-2 rounded">
        <div className='p-6'>
        <p>MODAL BRAND</p>
        <form>
        <div >
        <div>
            <input 
            onChange={(e) => setBrand(e.target.value)} 
            type="text" id="first_name" 
            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
            value={brand} placeholder="Добавьте тип" required />
        </div>
        </div>
        <button onClick={(e) => handleSubmit(e)} className="text-white mt-2 bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
        text-center">Добавить тип</button>
        </form>
        </div>
        </div>
      </div>
    </div>
  )
}
