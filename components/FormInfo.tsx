import { IInfo } from '@/models/models'
import clsx from 'clsx'
import { useState } from 'react'

interface IFormInfoProps {
  info: IInfo
  removeInfo: (arg0: number) => void
  updateInfoInput: (arg0: IInfo) => void
}


export default function FormInfo({ info, removeInfo, updateInfoInput }: IFormInfoProps) {
  const [state, setState] = useState<IInfo>({
    id: info.id,
    title: info.title,
    description: info.description,
  })
  const [infoError, setInfoError] = useState<string>('')
  const checkInfoInput = () => {
    if(state.title.length > 250  || state.description.length > 250) {
      setInfoError('в поле можно ввести не более 250 символов')
    }else{
      updateInfoInput(state)
      setDisabled(true)
      setInfoError('')
    }

  }

  const [disabled, setDisabled] = useState(false)

  return (
    <div>
      <div className="flex mx-2 gap-4  flex-col ">
        <label htmlFor='infoINPUT' className="flex flex-col">
          <p className="ml-2 mb-2">Заголовок:</p>
          <input
            id='infoINPUT'
            disabled={disabled}
            className={clsx(
              !!state.title && 'bg-green-100',
              disabled && 'bg-gray-400 ',
              'border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5'
            )}
            value={state.title}
            onChange={(e) =>
              setState({
                ...state,
                title: e.target.value,
              })
            }
            type="text"
            maxLength={250}
            required
          />
        </label>

        <label className="flex flex-col ">
          <p className="ml-2 mb-2">Описание:</p>
          <input
            disabled={disabled}
            className={clsx(
              !!state.description && 'bg-green-100',
              disabled && 'bg-gray-400 ',
              ' border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5'
            )}
            value={state.description}
            onChange={(e) =>
              setState({
                ...state,
                description: e.target.value,
              })
            }
            type="text"
            maxLength={250}
            required
          />
          <p className='text-red-500'>{infoError}</p>
          
        </label>
        <div className="flex gap-5">
          <button
            onClick={() => {
              if(info.id) removeInfo(info.id)}}
            className={clsx(
              disabled
                ? 'bg-red-200 hover:bg-red-200'
                : 'bg-red-500 hover:bg-red-600',
              'text-white    font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center '
            )}
          >
            Удалить
          </button>
          <button
            disabled={disabled}
            className={clsx(
              disabled
                ? 'bg-blue-200 hover:bg-blue-200'
                : 'bg-blue-500 hover:bg-blue-600',
              'text-white    font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center '
            )}
            onClick={(e) => {
              e.preventDefault()
              checkInfoInput()
            }}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  )
}
