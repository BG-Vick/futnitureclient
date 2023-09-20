import {
  fetchTypes,
  fetchBrands,
  deleteBrand,
  deleteType,
  updateBrand,
  updateType,
} from '@/store/typesApi'
import { useEffect, useState } from 'react'

export default function DeleteUpdateBrandsTypes() {
  const [types, setTypes] = useState([{ id: 0, name: '' }])
  const [brands, setBrands] = useState([{ id: 0, name: '' }])
  const [state, setState] = useState('')
  const [select, setSelect] = useState<number | string>('')

  useEffect(() => {
    fetchTypes().then((data) => setTypes(data))
    fetchBrands().then((data) => setBrands(data))
  }, [])

  return (
    <div>
      <div className="mt-2">
        <input
          className="mb-2 border-4 border-pink-300"
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <button
          onClick={() => updateType(state, Number(select))}
          className="mb-2 border-4 border-black"
        >
          Отправить
        </button>
      </div>
      <div>
        {types.map((type) => (
          <div
            onClick={() => setSelect(type.id)}
            className="border border-red-400"
            key={type.id}
          >
            {type.name}
          </div>
        ))}
      </div>
      <div className="mt-7 border border-teal-400 mb-9">
        {brands.map((brand) => (
          <div
            onClick={() => setSelect(brand.id)}
            className="border border-blue-400"
            key={brand.id}
          >
            {brand.name}
          </div>
        ))}
      </div>
    </div>
  )
}
