import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Product from '@/components/Product'
import { getAllProducts } from '@/store/fakeHTTP'
import axios from 'axios'
import Link from 'next/link'

export const getStaticProps = async () => {
  const data = await getAllProducts()
  return { props: { data } }
}

const Products = ({ data }: any) => {
  const products = data.rows

  if (!products) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Layout>
        <Hero />
        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {products.map((product: any) => {
                return <Product key={product.id} product={product} />
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Products


























/*
export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const { token } = parseCookies(ctx)
      const userData = await check(token)
      store.dispatch(setUserState(userData))
      const { rows } = await getAllProducts()
      store.dispatch(setProductState(rows))
    } catch (e) {
      console.log(e)
      return { props: {} }
    }

    return { props: {} }
  }) */
