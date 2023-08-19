import { useGetAllProductsQuery } from '@/services/PostService'
import { Product } from '@/components/Product'
import { Cart } from '@/components/cart/Cart'



export default function Products() {
  
  

  const { data, error, isLoading } = useGetAllProductsQuery(5)
  return (
    <div className=''>
      {isLoading && <h1>Loading...</h1>}
      {!!error && <h1>ERROR!!!   SOMETHING WENT WRONG!</h1>}
      {data?.map((product: any) => (
        <Product key={product.id} product={product}/>
      )) 
      }
      <div className=' inline-block text-left z-10 '>
        <Cart/>
      </div>
      </div>
  )
}
