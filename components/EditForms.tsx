import { fetchBrands, fetchTypes, updateDevice } from '@/store/typesApi'
import clsx from 'clsx'
import { useState,useEffect } from 'react'
import { AiOutlineCaretDown,AiOutlineCaretUp } from 'react-icons/ai'
import FormInfo from './FormInfo'
import { useRouter } from 'next/router'



export default function EditForms({setEdit, name, price, types, brands, actualType, actualBrand, info, id} : any) {

    const [nameInput, setNameInput] = useState(name)
    const [priceInput, setPriceInput] = useState(price)
    const [infoInput, setInfoInput] = useState<any>(info)
    console.log(infoInput)
    const [selectedType, setSelectedType] = useState(actualType)
    const [selectedBrand, setSelectedBrand] = useState(actualBrand)
    const [visibleTypes, setVisibleTypes] = useState(false)
    const [visibleBrand, setVisibleBrand] = useState(false)
    
    
    const router = useRouter()



    const removeInfo = (id: number) => {
        console.log('remove')
        setInfoInput(infoInput.filter(i => i.id !== id))
      }

      const updateInfoInput = (state:any) =>{
        setInfoInput(infoInput.map(item => (
          item.id === state.id ? {...item, 'title': state.title, 'description': state.description} : item
        )))
      }

      const updateProduct = (e) => {
        e.preventDefault()
        const formData = new FormData()
    
        formData.append('name', nameInput)
        formData.append('id', id)
        formData.append('price', `${priceInput}`)
        formData.append('brandId', selectedBrand.id)
        formData.append('typeId', selectedType.id)
        formData.append('info', JSON.stringify(infoInput))
    
        updateDevice(formData).then(data => 
          router.push(`/admin/${id}`)
          ).catch(e => console.log(e)) 
    }






  return (
    
    <form className="pt-8 mb-5 grow flex flex-col content-center">
    <div className="flex flex-col  w-[800px] self-center  ">
      <div
        onClick={() => setVisibleTypes(!visibleTypes)}
        className={clsx(selectedType && "bg-gray-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  relative")}
      >
        {selectedType?.name || 'Выбери тип'}
        <div className="absolute rounded-lg w-full mt-3  ml-3 z-10">
          {visibleTypes &&
            types.map((type) => (
              <div
                onClick={() => {
                  setSelectedType(type)
                }}
                key={type.id}
                className={clsx('hover:bg-blue-400 bg-gray-100 border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300')}
              >
                {type.name}
              </div>
            ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col  w-[800px] self-center mt-6 bg-green-100">
      <div
        onClick={() => setVisibleBrand(!visibleBrand)}
        className={clsx(selectedBrand &&  "bg-gray-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-blue-50 relative ")}
      >
        {selectedBrand?.name || 'Выбери бренд'}
{/*         {!visibleBrand ? (
        <AiOutlineCaretDown className='h-8'/>
      ): (
        <AiOutlineCaretUp className='h-8'/>
      )} */}
        <div className="absolute rounded-lg w-full mt-3  ml-3">
          { visibleBrand &&
            brands.map((brand) => (
              <div
                onClick={() => {
                  setSelectedBrand(brand)
                }}
                key={brand.id}
                className="hover:bg-blue-400 bg-gray-100  border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300 "
              >
                {brand.name}
              </div>
            ))}
        </div>
      </div>
    </div>












    <div className="flex flex-col  w-[800px] self-center mt-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Название
          <input
            onChange={(e) => setNameInput(e.target.value)} 
            type="text"
            className={clsx(nameInput && "bg-gray-100"," border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  ")}
            value={nameInput} 
            required
          />
        </label>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Цена
          <input
          onChange={(e) => setPriceInput(Number(e.target.value))} 
            type="number"
            className={clsx(!!priceInput &&"bg-gray-100","bg-white border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  ")}
             value={priceInput}
            required
          />
        </label>
      </div>
       {!!infoInput && <div className='my-8 ml-8 font-semibold'>Редактировать информацию о продукте
       <button>
        
       </button>
       </div>  }      
      {
       !!infoInput && infoInput.map(i => (
            <FormInfo key={i.id} info={i} removeInfo={removeInfo} updateInfoInput={updateInfoInput} />
        ))
      }

      <button
        onClick={(e) => {
            //e.preventDefault()
          if(selectedType && selectedBrand && nameInput && priceInput ){
            updateProduct(e)
          }else {
            alert('Заполните все поля!')
          }
        }}
        className={clsx(nameInput && priceInput && "bg-red-600 hover:bg-red-800", "text-white bg-red-200  focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-8")}
      >
        Отправить
      </button>
    </div>
  </form>












  )
}
