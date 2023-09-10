import { BsPlus, BsEyeFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { ICart } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { deleteOneDevice, fetchBrands, fetchOneDevice, fetchTypes, updateDevice } from '@/store/typesApi'
import { useState, useEffect } from 'react'
import { EditForm } from './EditForm'



const EditProduct = ({ product, handleRemoveProduct, handleRefreshProduct }: any) => {
  const [edit, setEdit] = useState(false)

  const { id, brandId, typeId, name, price, img } = product
  const [infoInput, setInfoInput] = useState<any>([])
  const [nameInput, setNameInput] = useState(name)
  const [priceInput, setPriceInput] = useState(price)
  const [file, setFile] = useState(img)

  const [selectedBrand, setSelectedBrand] = useState(brandId)
  const [selectedType, setSelectedType] = useState(typeId)



  const updateProduct = (e) => {
      e.preventDefault()
      const formData = new FormData()

      formData.append('name', nameInput)
      formData.append('id', id)
      formData.append('price', `${priceInput}`)
      formData.append('img', file)
      formData.append('brandId', selectedBrand.id)
      formData.append('typeId', selectedType.id)
      formData.append('info', JSON.stringify(infoInput))

      updateDevice(formData).then(data => 
        setEdit(false)
        ).catch(e => console.log(e)) 
        handleRefreshProduct()
  }

  const selectFile = e => {
    setFile(e.target.files[0]);
  }; 

  const updateInfoInput = (state:any) =>{
    console.log('updII')
    setInfoInput(infoInput.map(item => (
      item.id === state.id ? {...item, 'title': state.title, 'description': state.description} : item
    )))
  }

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Image
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              width={160}
              height={160}
              alt="Picture of the author"
              priority
            />
          </div>
        </div>
        <div
          className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col 
                        items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
        >
          <button>
            <div
              onClick={() => handleRemoveProduct(id)}
              className={`bg-red-500 text-black flex justify-center items-center  w-12 h-12 `}
            >
              <AiFillDelete className="text-3xl" />
            </div>
          </button>
          <button
            onClick={() => {
              setEdit(!edit)
              fetchOneDevice(id)
              .then(data => setInfoInput(data.info))
              .catch(e => console.log(e))
            }}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <AiFillEdit />
          </button>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {brandId === 1 ? 'Samsung' : 'Apple'}
        </div>
          <h2 className="font-semibold mb-1">{name}</h2>
        <div className="font-semibold">$ {price}</div>
            {edit && <EditForm
                infoInput={infoInput} updateInfoInput={updateInfoInput}
                selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}
                selectedType={selectedType} setSelectedType={setSelectedType}
                name={nameInput} setName={setNameInput}
                price={priceInput} setPrice={setPriceInput}
                addDevice={updateProduct} selectFile={selectFile}
                setInfoInput={setInfoInput} id={id}
            />}
      </div>
    </div>
  )
}

export default EditProduct

































/* 

import { BsPlus, BsEyeFill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { ICart } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { deleteOneDevice, fetchBrands, fetchOneDevice, fetchTypes, updateDevice } from '@/store/typesApi'
import { useState, useEffect } from 'react'



const EditProduct = ({ product, handleRemoveProduct, handleRefreshProduct }: any) => {
  const [edit, setEdit] = useState(false)

  const { id, img, brandId, typeId, name, price } = product

  const [info, setInfo] = useState<any>([])
  const [nameInput, setNameInput] = useState(name)
  const [priceInput, setPriceInput] = useState(price)
  const [brandIdInput, setBrandIdInput] = useState(brandId)
  const [typeIdInput, setTypeIdInput] = useState(typeId)


  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchTypes().then(data => setTypes(data))
    fetchBrands().then(data => setBrands(data))
  },[])



  const updateProduct = (e) => {
    e.preventDefault()
      updateDevice({
        id, 
        name: nameInput, 
        price: priceInput, 
        brandId: brandIdInput, 
        typeId: typeIdInput
      }).then(data => 
        setEdit(false)
        ).catch(e => console.log(e)) 
        handleRefreshProduct()
  }


  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }


  const removeInfo = (number: number) => {
    setInfo(info.filter(i => i.number !== number))
  }
  
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
        
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <Image
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
              width={160}
              height={160}
              alt="Picture of the author"
              priority
            />
          </div>
        </div>
       
        <div
          className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col 
                        items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
        >
          <button>
            <div
              onClick={() => handleRemoveProduct(id)}
              className={`bg-red-500 text-black flex justify-center items-center  w-12 h-12 `}
            >
              <AiFillDelete className="text-3xl" />
            </div>
          </button>
          <button
            onClick={() => {
              setEdit(!edit)
              fetchOneDevice(id)
              .then(data => setInfo(data.info))
              .catch(e => console.log(e))
            }}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <AiFillEdit />
          </button>
        </div>
      </div>
      
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {brandId === 1 ? 'Samsung' : 'Apple'}
        </div>
          <h2 className="font-semibold mb-1">{name}</h2>
        <div className="font-semibold">$ {price}</div>
        {edit && (
          <form className='border border-teal-400 p-4 flex flex-col gap-2'>
            <label className='mr-3 flex justify-between' >Name
              <input className='border border-teal-300' type="text" value={nameInput} onChange={e => setNameInput(e.target.value)}/>
            </label>
            <label className='mr-3 flex justify-between' >Price
              <input className='border border-teal-300' type="text" value={priceInput} onChange={e => setPriceInput(e.target.value)}/>
            </label>
        {
          types.map(type => 
            <div onClick={() => {setTypeIdInput(type)}} className="border border-red-400" key={type.id}>{type.name}</div>
          )
        }
        {
          brands.map((brand) =>
            <div onClick={() => setBrandIdInput(brand)} className="border border-blue-500" key={brand.id}>{brand.name}</div>
          )
        }
        <div className='flex flex-col gap-2'>Редактировать описание
        {info.map((i) =>
          (<div className='border' key={i.title}>
            <label className='mr-3 flex justify-between'> Заголовок:
            <input className='border border-teal-300' type="text" value={i.title} />
            </label>
            <label className='mr-3 flex justify-between'> Описание:
            <input className='border border-teal-300' type="text" value={i.description}/>
            </label>
          </div>)
        )
        }
        </div>
        <button onClick={(e) => updateProduct(e)}>ОТПРАВИТЬ</button>
          </form>
        )
        }
      </div>
    </div>
  )
}

export default EditProduct



*/