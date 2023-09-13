/* import { fetchBrands, fetchTypes, } from '@/store/typesApi'
import { useState, useEffect } from 'react'
import FormInfo from './FormInfo'
import { DropDown } from '@/pages/dropdown'
export function EditForm({
  infoInput, updateInfoInput,
  selectedBrand, setSelectedBrand, 
  selectedType, setSelectedType,
  price, setPrice, name, setName,
  addDevice, selectFile, setInfoInput,
  id

}: any) {
    console.log(infoInput)
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])

  const [brandDropdownIsOpen, setBrandDropdownIsOpen] = useState(false)
  console.log(brandDropdownIsOpen)

  const [newCharacteristic, setNewCharacteristic] = useState({
    title: '',
    description: ''
  })
  const [showCharacteristic, setShowCharacteristic] = useState(false)
  useEffect(() => {
    fetchTypes().then(data => setTypes(data))
    fetchBrands().then(data => setBrands(data))
  },[])



  const removeInfo = (id: number) => {
    console.log('remove')
    console.log(id)
    setInfoInput(infoInput.filter(i => i.id !== id))
  }




return(
  <form action="submit">
  <div className="border border-teal-400 mb-3">
  <p className="mt-4 text-center font-bold bg-blue-800 text-white py-1">{selectedType?.name || 'Выбери тип'}</p>
  {
    types.map(type => 
      <div onClick={() => {setSelectedType(type)}} className="border border-red-400" key={type.id}>{type.name}</div>
    )
  }
  </div>
  <div className="border border-teal-400">
  <p className="mt-4 text-center font-bold bg-blue-800 text-white py-1" >{selectedBrand?.name || 'Выбери бренд'}</p>














            <DropDown isOpen={brandDropdownIsOpen} setIsOpen={setBrandDropdownIsOpen} >
                {brands.map((brand) =>(
                    <div key={brand.id} 
                    onClick={() => {
                        setSelectedBrand(brand)
                        setBrandDropdownIsOpen(false)
                        }}
                    className='flex w-full justify-between p-4 hover:bg-blue-100 cursor-pointer rounded-r-lg border-l-transparent
                                hover:border-l-white border-l-4
                    '>
                        <h3 className='font-bold' >{brand.name}</h3>
                    </div>
                ))}
            </DropDown>

  </div>
  <div >
  <div>
      <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">Название продукта</label>
      <input onChange={(e) => setName(e.target.value)} type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 " value={name} 
        placeholder="Название продукта" required />

      <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">Стоимость</label>
      <input onChange={(e) => setPrice(Number(e.target.value))} type="number" 
      className="bg-gray-50 border border-gray-300 text-gray-900 
      "value={price} placeholder="Название продукта" required />

      <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">Изображение
      <input 
            onChange={selectFile} type="file" 
            className="bg-gray-50 border border-gray-300 text-gray-900 
            " placeholder="изображение" required />
      </label>

      
      <hr />

      {
       !!infoInput && infoInput.map(i => (
            <FormInfo key={i.id} info={i} removeInfo={removeInfo} updateInfoInput={updateInfoInput} />
        ))
      }
        <div>
        <button
        className='p-2 m-2 border'
        onClick={() => setShowCharacteristic(!showCharacteristic)}
      >
        Добавить характеристику
      </button>
      {showCharacteristic && (
        <div>
    <label>
        Заголовок
        <input
          value={newCharacteristic.title}
          onChange={(e) => setNewCharacteristic({
            ...newCharacteristic,
            'title': e.target.value
          })}
          type="text"
          required
        />
      </label>

      <label>
        Описание
        <input
          value={newCharacteristic.description}
          onChange={(e) => setNewCharacteristic({
            ...newCharacteristic,
            'description': e.target.value
          })}
          type="text"
          required
        />
      </label>
      <button
      onClick={() => {
        updateInfo(newCharacteristic, id)
        setNewCharacteristic({
            title: '',
            description: ''
          })
          setShowCharacteristic(!showCharacteristic)
    }}
      >
        Применить
    </button>
        </div>
      )

      }
      
        </div>
      <button
          onClick={(e) => addDevice(e)}
          className="text-white mt-2 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
        >
          Отправить
        </button>
  </div>
  </div>
  </form>
)
}
 */