/*  import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useEffect, useState } from 'react'
import { createDevice, fetchBrands, fetchTypes } from "@/store/typesApi"
import { ProductForm } from "./ProductForm"


export default function ModalAddProduct({ isVisible, onClose}: any) {

  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  console.log(file)
  const [info, setInfo] = useState<any>([])
  
  const handleClose = (e) => {
      if(e.target.id === 'wrapper') onClose(false)
  }
  
  const selectFile = e => {
    console.log(e.target.files)
      setFile(e.target.files[0]);
    };



    const addDevice = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', selectedBrand.id)
      formData.append('typeId', selectedType.id)
      formData.append('info', JSON.stringify(info))
      createDevice(formData).then(data => {
          setName('')
          setPrice(0)
          onClose(false)
          alert(`создан : ${data.name} `)
      }).catch(e => console.log(e))
    }

  if(!isVisible) return null

  return (
    <div onClick={handleClose} id="wrapper" className="overflow-y-auto fixed inset-0 bg-slate-900/60 
    backdrop-blur-sm  flex justify-center items-center z-50">
      <div className="w-[600px] flex flex-col">
        <button onClick={() => onClose(false)} className="text-white text-xl place-self-end">X</button>
        <div className="bg-white p-2 rounded">
        <div className='p-6'>
        <h3 className='text-xl font-semibold text-gray-900'>MODAL Device</h3>
        <ProductForm 
            info={info} setInfo={setInfo}
            selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
            selectedType={selectedType} setSelectedType={setSelectedType}
            name={name} setName={setName}
            price={price} setPrice={setPrice}
            addDevice={addDevice} selectFile={selectFile}
            />
        </div>
        </div>
      </div>
    </div>
  )
}




















/* 

import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useEffect, useState } from 'react'
import { createDevice, fetchBrands, fetchTypes } from "@/store/typesApi"



export default function ModalAddProduct({ isVisible, onClose}: any) {
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchTypes().then(data => setTypes(data))
    fetchBrands().then(data => setBrands(data))
  },[])


  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [info, setInfo] = useState<any>([])
  


    const handleClose = (e) => {
      if(e.target.id === 'wrapper') onClose(false)
  }
  


    const selectFile = e => {
      setFile(e.target.files[0]);
    };

    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}])
    }



    const removeInfo = (number: number) => {
      setInfo(info.filter(i => i.number !== number))
    }


    const changeInfo = (key: string, value: string, number: number) => {
      setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const addDevice = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('name', name)
      formData.append('price', `${price}`)
      formData.append('img', file)
      formData.append('brandId', selectedBrand.id)
      formData.append('typeId', selectedType.id)
      formData.append('info', JSON.stringify(info))
      createDevice(formData).then(data => {
          setName('')
          setPrice(0)
          onClose(false)
          alert(`создан : ${data.name} `)
      }).catch(e => console.log(e))
    }

  if(!isVisible) return null

  return (
    <div onClick={handleClose} id="wrapper" className="overflow-y-auto fixed inset-0 bg-slate-900/60 
    backdrop-blur-sm  flex justify-center items-center z-50">
      <div className="w-[600px] flex flex-col">
        <button onClick={() => onClose(false)} className="text-white text-xl place-self-end">X</button>
        <div className="bg-white p-2 rounded">
        <div className='p-6'>
        <h3 className='text-xl font-semibold text-gray-900'>MODAL Device</h3>
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
        {
          brands.map((brand) =>
            <div onClick={() => setSelectedBrand(brand)} className="border border-red-400" key={brand.id}>{brand.name}</div>
          )
        }
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

            <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">Изображение</label>
            <input onChange={selectFile} type="file" 
            className="bg-gray-50 border border-gray-300 text-gray-900 
            " placeholder="Название продукта" required />

            <hr />




            <button className="mt-4 border border-teal-400 p-2 w-full mb-8" onClick={addInfo}>
              Новая характеристика
            </button>
            {
              info.map(info => (
                <div key={info.id} className="flex mt-4 mb-4 gap-4 border-2">


                <label >Заголовок
                <input value={info.title} onChange={(e) => changeInfo('title', e.target.value, info.number)} type="text" placeholder="заголовок" required />
                </label>

                <label >Описание
                <input  value={info.description} onChange={(e) => changeInfo('description', e.target.value, info.number)} type="text" placeholder="описание" required />
                </label>
                
                <button onClick={() => removeInfo(info.number)} className="border p-1">Удалить</button>
                </div>
              ))
            }
            <button
                onClick={(e) => addDevice(e)}
                className="text-white mt-2 bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Отправить
              </button>
        </div>
        </div>
        </form>
        </div>
        </div>
      </div>
    </div>
  )
}



*/ 