 import AdminHeader from '@/components/AdminHeader'
import Footer from '@/components/Footer'
import { ModalType } from '@/components/ModalType'
import {
  createDevice,
  createType,
  fetchBrands,
  fetchTypes,
} from '@/store/typesApi'
import clsx from 'clsx'
import { type } from 'os'
import { useEffect, useState } from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'



export default function AddProduct() {
  console.log('render')
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [visibleTypes, setVisibleTypes] = useState(false)
  const [visibleBrand, setVisibleBrand] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState('')
  console.log(file)
 
  const [info, setInfo] = useState<any>([])

 // const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [])



  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
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

    createDevice(formData)
      .then((data) => {
        alert(`создан : ${data.name} `)
        stateRefresh()
      })
      .catch((e) => alert(e?.response?.data?.message || e))
  }
  function stateRefresh(){
    setName("")
    setPrice("")
    setFile('')
    setSelectedBrand(null)
    setSelectedType(null)
    setInfo([])
  }



  return (
    <div onClick={() => console.log(file)} className="flex flex-col h-screen">
      <AdminHeader />
      <form className="pt-[15vh] mb-5 grow flex flex-col content-center">
        <div className="flex flex-col  w-[800px] self-center mt-6 ">
          <p className='mb-1 ml-1'>Выбери тип</p>
          <div
            onClick={() => setVisibleTypes(!visibleTypes)}
            className={clsx(selectedType && "bg-green-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-blue-50 relative")}
          > 
            {selectedType?.name || '*'}
            <div className="absolute rounded-lg w-full mt-3  ml-3 z-10">
              {visibleTypes &&
                types.map((type) => (
                  <div
                    onClick={() => {
                      setSelectedType(type)
                    }}
                    key={type.id}
                    className={clsx('hover:bg-blue-400 bg-blue-100 border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300')}
                  >
                    {type.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[800px] self-center mt-6 ">
        <p className='mb-1 ml-1'>Выбери бренд</p>
          <div
            onClick={() => setVisibleBrand(!visibleBrand)}
            className={clsx(selectedBrand &&  "bg-green-100","border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-blue-50 relative")}
          >
            {selectedBrand?.name || 'Выбери бренд'}
            <div className="absolute rounded-lg w-full mt-3  ml-3">
              {!visibleTypes && visibleBrand &&
                brands.map((brand) => (
                  <div
                    onClick={() => {
                      setSelectedBrand(brand)
                    }}
                    key={brand.id}
                    className="hover:bg-blue-400 bg-blue-100  border border-gray-300 text-gray-900  text-sm p-2.5 rounded-lg duration-300 "
                  >
                    {brand.name}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col  w-[800px] self-center mt-6">
          <div>
            <label className="block mb-2">
              <p className='mb-1 ml-1'>Название</p>
              <input
                onChange={(e) => setName(e.target.value)} 
                type="text"
                className={clsx(name && "bg-green-100","bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:bg-gray-50 focus:border-blue-500 block w-full p-2.5  ")}
                value={name} 
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 ">
            <p className='mb-1 ml-1'>Цена</p>
              <input
              onChange={(e) => setPrice(Number(e.target.value))} 
                type="number"
                className={clsx(!!price &&"bg-green-100","bg-blue-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  ")}
                 value={price}
                required
              />
            </label>
          </div>

          <label className="block mb-2 ">
          <p className='mb-1 ml-1'>Изображение</p>
            <input
            onChange={(e) => selectFile(e)}
              className={clsx("relative  bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:bg-blue-50 focus:border-blue-500 block w-full p-2.5 cursor-pointer")}
              type="file"
              placeholder='выбери изображение'
              required
            />
            <p className='absolute w-60 h-10 bg-blue-50 -mt-11 ml-1' >
            <AiOutlineCloudUpload className='w-10 h-10 absolute ml-4  '/>
            </p>
          </label>

          <div className="bg-blue-50 mt-6 rounded-lg">
            {!!info &&
              info.map((info) => (
                <div
                  key={info.id}
                  className="rounded-lg sm:w-auto px-5 py-2.5 mt-6 flex flex-col"
                >
                  <label>
                    Заголовок
                    <input
                      className={clsx(info.title &&   "bg-green-100"  , "border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5  mb-4")}
                      value={info.title}
                      onChange={(e) =>
                        changeInfo('title', e.target.value, info.number)
                      }
                      type="text"
                      placeholder="заголовок"
                      required
                    />
                  </label>
                  <label>
                    Описание
                    <input
                      className={clsx(info.description && "bg-green-100"  , " border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500  focus:bg-gray-50 block w-full p-2.5 ")}
                      value={info.description}
                      onChange={(e) =>
                        changeInfo('description', e.target.value, info.number)
                      }
                      type="text"
                      placeholder="описание"
                      required
                    />
                  </label>
                  <button
                    onClick={() => removeInfo(info.number)}
                    className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-6 self-end"
                  >
                    Удалить
                  </button>
                </div>
              ))}
              <button
              className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none 
            focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center "
              onClick={addInfo}
            >
              Добавить характеристику
            </button>
          </div>

          <button
            onClick={(e) => {
              if(selectedType && selectedBrand && name && price && file){
                addDevice(e)
              }else {
                alert('Заполните все поля!')
              }
            }}
            className={clsx(selectedType && selectedBrand && name && price && file && "bg-red-700 hover:bg-red-700" ,"text-white bg-red-200  focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center mt-20")}
          >
            Отправить
          </button>
        </div>
      </form>
      <Footer />
    </div>
  )
}
 