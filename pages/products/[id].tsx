import { useTypedSelector } from '@/hooks/useTypedSelector'
import Image from 'next/image'
import { ICart, IProduct } from '@/models/models'
import { useActions } from '@/hooks/redux'
import Layout from '@/components/Layout'
import { fetchOneDevice } from '@/store/typesApi'
import { GetServerSideProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

interface PageProps {
  product: IProduct
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  ctx
) => {
  const { id } = ctx.params as Params
  const product = await fetchOneDevice(Number(id))
  return { props: { product } }
}

const OneProduct: NextPage<PageProps> = ({ product }) => {
  const cart = useTypedSelector((state) => state.cart)
  const { addItem } = useActions()

  const alreadyInCart = cart.some((item) => item.id === product?.id)
  function handleAddIntoCart(product: ICart) {
    if (!alreadyInCart) {
      addItem(product)
    } else {
      return
    }
  }

  const { name, price, img, info } = product
  return (
    <>
      <Head>
        <title>Одежда Элиста {name}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <Layout>
        <section className=" pt-[15vh] min-h-screen mb-20 flex items-center">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-5 ">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <Image
                  className="w-full h-full   max-w-[300px] lg:max-w-md sm:max-w-[350px] object-cover"
                  src={
                    `http://${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_PORT}/` +
                    img
                  }
                  width={400}
                  height={400}
                  alt="product"
                  priority
                />
              </div>

              <div className=" text-center lg:text-left flex-1 ">
                <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0 overflow-hidden capitalize/*  */">
                  {name}
                </h1>
                <div className="text-xl text-red-500 font-medium mb-6">
                  {price} ₽
                </div>
                <div className="mb-8">
                  {info &&
                    info.map((i) => (
                      <div className="bg-gray-100 mb-2" key={i.id}>
                        <p>{i.title}</p>
                        <p className='uppercase '>{i.description}</p>
                      </div>
                    ))}
                </div>
                <button
                  onClick={() => handleAddIntoCart({ ...(product as ICart) })}
                  className={`${
                    alreadyInCart
                      ? 'bg-gray-300 text-gray-200'
                      : 'bg-primary py-4 px-8 text-white'
                  }bg-primary py-4 px-8 text-white`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default OneProduct
