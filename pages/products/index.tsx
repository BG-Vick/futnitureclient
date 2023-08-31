import Product from '@/components/Product'
import { IDevice } from '@/models/models'
import axios from 'axios'
import Link from 'next/link'

export const getStaticProps = async () => {
  const res = await axios.get('http://localhost:7000/api/device')
  const data = res.data

  return { props: { data } }
}



const Products = ({ data }: any) => {
  const products = data.rows
  // BrandId === samsung
  const filteredProducts = products.filter((product: any) => {
    return product.brandId === 1
  })
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
          {filteredProducts.map((product: any) => {
            return <Product key={product.id} product={product}/>
          })}
        </div>
      </div>
    </section>
  )
}

export default Products
