import { useActions } from '@/hooks/redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import Image from 'next/image'

export function Product({ product }: any) {
  const { addItem } = useActions()
  const cart = useTypedSelector((state) => state.cart)

  const isExistInCart = cart.some((item) => item.id === product.id)
  function handleAddIntoCart() {
    if (!isExistInCart) {
      addItem(product)
    }
  }

  return (
    <div className="border-2 border-teal-600">
      <h1>{product.id}</h1>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <p>{product.category}</p>
      <div className="w-20 h-20 ml-44 mb-4">
        <Image
          src={product.image}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <button className="border-2 border-red-400" onClick={handleAddIntoCart}>
        {isExistInCart ? 'Already in cart' : 'ADD INTO CART'}
      </button>
    </div>
  )
}
