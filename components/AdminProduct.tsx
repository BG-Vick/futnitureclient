import { BsPlus, BsEyeFill } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { useActions } from '@/hooks/redux'
import { ICart } from '@/models/models'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AiFillDelete } from 'react-icons/ai'



const AdminProduct = ({ product, handleRemoveProduct }: any) => {


  const { id, img, brandId, name, price } = product
  return (
<div >
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition ">
        <div className="w-full h-full flex justify-center items-center ">
           <div className="w-[200px]  mx-auto flex justify-center items-center ">
            <Image
              className="group-hover:scale-110 transition duration-300 object-cover"
              src={'http://localhost:7000/' + img}
              width={400}
              height={400}
              alt="product"
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
          <Link
            href={`/admin/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category & title & price */}
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {brandId === 1 ? 'Samsung' : 'Apple'}
        </div>
        <Link href={`admin/${id}`} >
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  )
}

export default AdminProduct


















/* 


    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full flex justify-center items-center ">
           <div className="w-[200px]  mx-auto flex justify-center items-center ">
            <Image
              className="group-hover:scale-110 transition duration-300 object-cover"
              src={'http://localhost:7000/' + img}
              width={400}
              height={400}
              alt="product"
              
            />
          </div>
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
          <Link
            href={`/admin/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">
          {brandId === 1 ? 'Samsung' : 'Apple'}
        </div>
        <Link href={`admin/${id}`} >
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>


*/