import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import { useTypedSelector } from '@/hooks/useTypedSelector'



const Products = () => {


  return (
    <>
      <Layout>
        <Hero />
        <section className="py-16">
          <div className="container mx-auto">
            About uss
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro pariatur saepe quasi deleniti a modi cumque beatae repudiandae alias fugit dolorum, et est aliquid numquam! Placeat nulla nostrum magnam nemo aspernatur quis laborum adipisci voluptate, autem, quam vero officia? Nobis, similique? Sit vitae magnam, quia velit impedit consequatur omnis laboriosam!
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit rem tempora minima maxime, adipisci nostrum. Aut tenetur vitae nobis fugiat doloribus modi iusto. Quos vel, voluptatum qui excepturi veniam delectus id debitis nisi distinctio totam quia neque. Sequi illo velit porro alias iure cupiditate nihil error expedita autem repellendus quibusdam eos enim vero, quam, ut corporis nisi itaque quas quia sint! Eligendi sapiente reiciendis eum illum laudantium tenetur! Deleniti delectus dolorem veritatis nisi hic placeat voluptas doloribus, maiores ullam et eveniet blanditiis magnam in repellendus quae quam consectetur natus! Fugit autem laboriosam doloribus! Sequi suscipit minus consequuntur veniam mollitia? Veritatis?
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Products












/*     <Head>
        <title>Мебель 08 | ОДИН ДЕВАЙС</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/next.svg" />
      </Head>



import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Product from '@/components/Product'
import { getAllProducts } from '@/store/fakeHTTP'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import path from 'path'
import Pagination from '@/components/Pagination'
import { useState, useEffect } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { setProductState } from '@/store/reducers/productSlice'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'



export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const data = await getAllProducts({typeId: '', brandId:'', page: 1, limit:10})
      store.dispatch(setProductState(data.rows))
      return { props: {
        count: data.count
      } }
    } catch (e) {
      console.log(e)
      return { props: {} }
    }
    
    return { props: {} }
  })


const Products = ({ count }: any) => {
  
  const products = useTypedSelector(state => state.product)

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

*/











