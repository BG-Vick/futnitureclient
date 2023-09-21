import { updateType } from '@/store/typesApi'
import { useForm } from 'react-hook-form'
import clsx from 'clsx'

interface IEditTypeFormInput {
  type: string
}


interface IModalBrandProps {
  isVisible: number | false
  onClose: (arg0:number | false) => void
}


export function ModalType({ isVisible, onClose }: IModalBrandProps) {
  const handleClose = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement
    if (target.id === 'wrapper') onClose(false)
  }



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IEditTypeFormInput>({
    mode: 'onChange',
    defaultValues: {
      type: '',
    },
  })
  const onSubmit = async (data: IEditTypeFormInput) => {
    const { type } = data
    if(isVisible){
      updateType(type, isVisible).then(data => {
        reset({
          type: '',
        })
        onClose(false)
      }).catch (e => alert(e.response.data.message || e)) 
    }
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
            <p>Редактирование категорий</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="text">
                  <input
                    id="text"
                    type="text"
                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Добавьте магазин"
                    {...register('type', {
                      required: 'Please enter text',
                      maxLength: 250,
                    })}
                  />
                  {errors.type && (
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
