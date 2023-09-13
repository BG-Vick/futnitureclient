/* import { deleteOneDevice, fetchAllDevice } from '@/store/typesApi'
import { useState, useEffect } from 'react'
import EditProduct from './EditProduct'

export default function ModalEditProducts({ 
  isVisible, onClose,
}: any) {


  const [products, setProducts] = useState([])
  const [count, setCount] = useState(5)

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose(false)
  }

  useEffect(() => {
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }, [count])


  const handleRemoveProduct = async (id: number) => {
    await deleteOneDevice(id)
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }


  const handleRefreshProduct = () => {
    fetchAllDevice({ limit: count })
      .then((data) => {
        setProducts(data.rows)
        setCount(data.count)
      })
      .catch((e) => console.log(e))
  }


  if (!isVisible) return null
  

  return (
    <div
      onClick={handleClose}
      id="wrapper"
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm  flex justify-center items-center overflow-scroll z-50"
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
            <p>MODAL Product</p>
            <div>
            {!!products.length && products.map((product) => (
                    <EditProduct
                      key={product.id}
                      product={product}
                      handleRemoveProduct={handleRemoveProduct}
                      handleRefreshProduct={handleRefreshProduct}
                    />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 */