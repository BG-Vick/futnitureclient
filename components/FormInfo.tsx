import clsx from 'clsx'
import { useState } from 'react'

export default function FormInfo({ info, removeInfo, updateInfoInput }: any) {
  const [state, setState] = useState({
    'id': info.id,
    'title': info.title,
    'description': info.description
  })
  const [disabled, setDisabled] = useState(false)
  

  return (
    <div>
    <div className="flex mx-2 gap-4  flex-col ">
       <label className='flex flex-col'>
        <p className='ml-2 mb-2'>Заголовок:</p>
        <input
        disabled={disabled}
        className={clsx(!!state.title && "bg-green-100" , disabled && "bg-gray-400 ", "border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5")}
          value={state.title}
          onChange={(e) => setState({
            ...state,
            'title': e.target.value
          })}
          type="text"
          required
        />
      </label>

      <label className='flex flex-col '>
        <p className='ml-2 mb-2'>Описание:</p>
        <input
        disabled={disabled}
        className={clsx(!!state.description && "bg-green-100" , disabled && "bg-gray-400 ",  ' border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5')} 
          value={state.description}
          onChange={(e) => setState({
            ...state,
            'description': e.target.value
          })}
          type="text"
          required
        />
      </label>
<div className='flex gap-5'>
       <button
       onClick={() => removeInfo(info.id)} 
       className={clsx(disabled ? "bg-red-200 hover:bg-red-200": "bg-red-500 hover:bg-red-600", "text-white    font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center ")}>
        Удалить
      </button>
      <button 
      disabled={disabled}
      className={clsx(disabled ? "bg-blue-200 hover:bg-blue-200": "bg-blue-500 hover:bg-blue-600", "text-white    font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center ")}
      onClick={(e) => {
        e.preventDefault()
        updateInfoInput(state)
        setDisabled(true)
      }}>Применить</button>

</div>

    </div>
    </div>
  )
}
