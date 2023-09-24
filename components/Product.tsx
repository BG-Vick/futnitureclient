import { BsPlus, BsEyeFill } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { IBrand, ICart, IProduct, IType } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { types } from 'util'

interface IProductProps {
  product: IProduct
  types: IType[]
  brands: IBrand[]
}

const Product = ({ product, types, brands }: IProductProps) => {
  const cart = useTypedSelector((state) => state.cart)

  const alreadyInCart = cart.some((item) => item.id === product.id)
  function handleAddIntoCart(product: ICart) {
    if (!alreadyInCart) {
      addItem(product)
    } else {
      return
    }
  }

  const { addItem } = useActions()
  const { id, img, brandId, typeId, name, price } = product
  const productBrand = brands?.find((brand) => brand.id === brandId)
  const productType = types?.find((type) => type.id === typeId)

  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition ">
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-[200px] mx-auto flex justify-center items-center ">
{/*             <Image
              className="group-hover:scale-110 transition duration-300 object-cover"
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/` + img}
              width={400}
              height={400}
              alt="product"
              priority
            /> */}
            <img src={`${process.env.NEXT_PUBLIC_DB_HOST}` + img} alt="img" />
          </div>
        </div>

        <div
          className="absolute top-6 -right-11 group-hover:right-5  p-2 flex flex-col 
                        items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 
                        transition-all duration-300"
        >
          <button onClick={() => handleAddIntoCart({ ...(product as ICart) })}>
            <div
              className={`${
                alreadyInCart
                  ? 'bg-gray-300 text-gray-200'
                  : 'bg-red-500 text-white'
              } flex justify-center items-center  w-12 h-12 `}
            >
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            href={`/products/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm  text-gray-500 mb-1">
          <p>
            магазин:{' '}
            <span className="capitalize">
              {productBrand && productBrand.name}{' '}
            </span>
          </p>
          <p>
            категория:{' '}
            <span className="capitalize">
              {productType && productType.name}
            </span>
          </p>
        </div>
        <Link href={`/products/${id}`}>
          <h2 className="font-semibold mb-1 overflow-hidden capitalize">
            {name}
          </h2>
        </Link>
        <div className="font-semibold">{price} ₽</div>
      </div>
    </div>
  )
}

export default Product
