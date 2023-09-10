/*  import { fetchBrands, fetchTypes } from '@/store/typesApi'
import { useState, useEffect } from 'react'

export function ProductForm({
  info,
  setInfo,
  selectedBrand,
  setSelectedBrand,
  selectedType,
  setSelectedType,
  price,
  setPrice,
  name,
  setName,
  addDevice,
  selectFile,
}: any) {
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const removeInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number))
  }

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  return (
    <form action="submit">
      <div className="border border-teal-400 mb-3">
        <p className="mt-4 text-center font-bold bg-blue-800 text-white py-1">
          {selectedType?.name || 'Выбери тип'}
        </p>
        {types.map((type) => (
          <div
            onClick={() => {
              setSelectedType(type)
            }}
            className="border border-red-400"
            key={type.id}
          >
            {type.name}
          </div>
        ))}
      </div>
      <div className="border border-teal-400">
        <p className="mt-4 text-center font-bold bg-blue-800 text-white py-1">
          {selectedBrand?.name || 'Выбери бренд'}
        </p>
        {brands.map((brand) => (
          <div
            onClick={() => setSelectedBrand(brand)}
            className="border border-red-400"
            key={brand.id}
          >
            {brand.name}
          </div>
        ))}
      </div>
      <div>
        <div>
          <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">
            Название продукта
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 "
            value={name}
            placeholder="Название продукта"
            required
          />

          <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">
            Стоимость
          </label>
          <input
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 
      "
            value={price}
            placeholder="Название продукта"
            required
          />

          <label className="mt-8 block mb-2 text-sm font-medium text-gray-900 ">
            Изображение
            <input
              onChange={selectFile}
              type="file"
              className="bg-gray-50 border border-gray-300 text-gray-900 
            "
              placeholder="изображение"
              required
            />
          </label>

          <hr />

          <button
            className="mt-4 border border-teal-400 p-2 w-full mb-8"
            onClick={addInfo}
          >
            Новая характеристика
          </button>
          {!!info &&
            info.map((info) => (
              <div key={info.id} className="flex mt-4 mb-4 gap-4 border-2">
                <label>
                  Заголовок
                  <input
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
                  className="border p-1"
                >
                  Удалить
                </button>
              </div>
            ))}
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