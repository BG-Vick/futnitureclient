import Hero from '@/components/Hero'
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'
import Product from '@/components/Product'
import { getAllProducts } from '@/store/fakeHTTP'
import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { wrapper } from '@/store/store'
import { setProductState } from '@/store/reducers/productSlice'
import { setUserState } from '@/store/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { fetchBrands, fetchTypes } from '@/store/typesApi'
import clsx from 'clsx'
import Head from 'next/head'
import Logo from '../../public/logo (1).svg'

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (ctx) => {
    try {
      const data = await getAllProducts({
        typeId: '',
        brandId: '',
        name: '',
        page: 1,
        limit: 10,
      })
      store.dispatch(setProductState(data.rows))
      return {
        props: {
          count: data.count,
        },
      }
    } catch (e) {
      return { props: {} }
    }

    return { props: {} }
  })

const Products = ({ count }: any) => {
  const [countState, setCountState] = useState(count)
  const [typeIdState, setTypeIdState] = useState('')
  const [brandIdState, setBrandIdState] = useState('')
  const [search, setSearch] = useState('')
  const [types, setTypes] = useState([])
  const [brands, setBrands] = useState([])
  const [screen, setScreen] = useState(0)
  const [typesActive, setTypesActive] = useState(false)
  const [brandsActive, setBrandsActive] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [dropdownActive, setDropdownActive] = useState(false)
  const [refreshPage, setRefreshPage] = useState(true)
  const products = useTypedSelector((state) => state.product)
  const dispatch = useDispatch()
  const ref = useRef(1)

  useEffect(() => {
    setScreen(window.innerWidth)
  }, [])

  useEffect(() => {
    if (ref.current > 2) {
      // ref > 2 prevent fetching when component mounted first time
      if (search) {
        setRefreshPage(false)
        setTypeIdState('')
        setBrandIdState('')
        setPage(1)
        const debounce = setTimeout(() => {
          console.log('Поисковая строка в деле')
          getAllProducts({
            typeId: '',
            brandId: '',
            page: 1,
            limit: 10,
            name: search,
          })
            .then((data) => {
              setCountState(data.count)
              dispatch(setProductState(data.rows))
            })
            .catch((e) => console.log(e))
        }, 500)
        return () => clearTimeout(debounce)
      }
    }
    ref.current++
  }, [search, dispatch])




  useEffect(() => {
    if (ref.current > 2) {
      if( page === 1 && refreshPage === false ){
        return
      } else {
        setRefreshPage(true)
      // ref > 2 prevent fetching when component mounted first time
      if (!brandIdState && !typeIdState && !search) {
        console.log(`ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ без других параметров`)
        getAllProducts({
          typeId: '',
          brandId: '',
          page: page,
          limit: 10,
          name: '',
        })
          .then((data) => {
            setCountState(data.count)
            dispatch(setProductState(data.rows))
          })
          .catch((e) => console.log(e))
      }

      ///////////////////////////////////////////////////////////////////////////////////////

      if (!brandIdState && !typeIdState && search) {
        console.log(' ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ с учетом поисковой строки')
        getAllProducts({
          typeId: '',
          brandId: '',
          page: page,
          limit: 10,
          name: search,
        })
          .then((data) => {
            setCountState(data.count)
            dispatch(setProductState(data.rows))
          })
          .catch((e) => console.log(e))
      }
      //////////////////////////////////////////////////////////////////////////////////////////

      if (!typeIdState && !search && brandIdState) {
        console.log('ПЕРЕХОД ПО СТРАНИЦАМ с учетом бренда!')
        getAllProducts({
          typeId: '',
          brandId: brandIdState,
          page: page,
          limit: 10,
          name: '',
        })
          .then((data) => {
            setCountState(data.count)
            dispatch(setProductState(data.rows))
          })
          .catch((e) => console.log(e))
      }

      //////////////////////////////////////////////////////////////////////////////////////
      if (!brandIdState && !search && typeIdState) {
        console.log('ПЕРЕХОД ПО СТРАНИЦАМ с учетом типа')
        getAllProducts({
          typeId: typeIdState,
          brandId: '',
          page: page,
          limit: 10,
          name: '',
        })
          .then((data) => {
            setCountState(data.count)
            dispatch(setProductState(data.rows))
          })
          .catch((e) => console.log(e))
      }
    }
  }
    ref.current++
  }, [page])

  console.log(`page >> ${page}`)
  console.log(`brandId >> ${brandIdState}`)
  console.log(`typedId >> ${typeIdState}`)
  console.log(`search >> ${search}`)

  const handleType = async (id: number) => {
    setRefreshPage(false)
    setSearch('')
    setPage(1)
    setTypeIdState(id)
    const data = await getAllProducts({
      typeId: id,
      brandId: '',
      name: '',
      page: 1,
      limit: 10,
    })
    console.log(`запрос продуктов по типу`)
    setCountState(data.count)
    dispatch(setProductState(data.rows))
  }

  const handleBrand = async (id: number) => {
    setRefreshPage(false)
    setTypeIdState('')
    setSearch('')
    setPage(1)
    setBrandIdState(id)
    const data = await getAllProducts({
      typeId: '',
      name: '',
      brandId: id,
      page: 1,
      limit: 10,
    })
    console.log(`запрос продуктов по бренду`)
    setCountState(data.count)
    dispatch(setProductState(data.rows))
  }

  ////////////////////////////////////////////////////
  const handleDropdown = () => {
    setDropdownActive(!dropdownActive)
    if (!dropdownActive) {
      fetchTypes()
        .then((data) => setTypes(data))
        .catch((e) => console.log(e))
      fetchBrands()
        .then((data) => setBrands(data))
        .catch((e) => console.log(e))
    }
  }

  if (!products) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Head>
        <title>Одежда 08 | Все модели</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="../../public/logo (1).svg"
        />
      </Head>
      <Layout>
        <section className="pt-[20vh]  min-h-screen pb-5">
          <div className="container mx-auto ">
            <div className="flex flex-col gap-2 ">
              <div className="flex relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-none  outline-none w-full cursor-pointer text-center "
                  type="text"
                  placeholder="поиск"
                />
                <AiOutlineSearch className="w-6 h-6 absolute mt-2" />
                <BiFilter onClick={handleDropdown} className="w-10 h-10" />
              </div>

              <div className="h-[2px] w-full bg-gray-300 mb-2"></div>
              {dropdownActive && (
                <div className="w-full py-10 ">
                  {screen < 768 ? (
                    <>
                      <div
                        className={clsx('flex gap-4 justify-center  flex-wrap')}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setTypesActive(!typesActive)
                          }}
                          className={clsx(
                            brandsActive && 'hidden',
                            'border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white '
                          )}
                        >
                          Типы
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setBrandsActive(!brandsActive)
                          }}
                          className={clsx(
                            typesActive && 'hidden',
                            'border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white '
                          )}
                        >
                          Бренды
                        </button>
                      </div>
                      <div className="h-[2px] w-full bg-gray-300 my-8"></div>
                      {typesActive && (
                        <div className="flex gap-4 justify-center mt-4 flex-wrap ">
                          {types.map((type: any) => {
                            return (
                              <button
                                onClick={() => {
                                  handleType(type.id)
                                  setDropdownActive(false)
                                }}
                                className={clsx(
                                  'block border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white'
                                )}
                                key={type.id}
                              >
                                {type.name}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      {brandsActive && (
                        <div className="flex gap-4 justify-center flex-wrap ">
                          {brands.map((brand: any) => {
                            return (
                              <button
                                onClick={() => {
                                  handleBrand(brand.id)
                                  setDropdownActive(false)
                                }}
                                className={clsx(
                                  'block border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white'
                                )}
                                key={brand.id}
                              >
                                {brand.name}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <p className=" text-center my-6">Types</p>
                      <div className="flex gap-4 justify-center mt-4 flex-wrap ">
                        {types.map((type: any) => {
                          return (
                            <button
                              onClick={() => {
                                handleType(type.id)
                                setDropdownActive(false)
                              }}
                              className={clsx(
                                'block border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white'
                              )}
                              key={type.id}
                            >
                              {type.name}
                            </button>
                          )
                        })}
                      </div>
                      <div className="h-[2px] w-full bg-gray-300 my-8"></div>
                      <p className=" text-center my-6">Brands</p>
                      <div className="flex gap-4 justify-center flex-wrap ">
                        {brands.map((brand: any) => {
                          return (
                            <button
                              onClick={() => {
                                handleBrand(brand.id)
                                setDropdownActive(false)
                              }}
                              className={clsx(
                                'block border-2 border-black p-2 min-w-[200px] rounded-sm hover:bg-black hover:text-white'
                              )}
                              key={brand.id}
                            >
                              {brand.name}
                            </button>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {products.map((product: any) => {
                return <Product key={product.id} product={product} />
              })}
            </div>
            <Pagination
              limit={limit}
              count={countState}
              page={page}
              setPage={setPage}
            />
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Products

/* import Hero from '@/components/Hero'
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
        <section className="pt-[20vh]">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {products.map((product: any) => {
                return <Product key={product.id} product={product} />
              })}
            </div>
          </div>
        </section>
        <div className='mb-10 bg-pink-100'></div>
      </Layout>
    </>
  )
}

export default Products


 */

/*     <Head>
        <title>Мебель 08 | ОДИН ДЕВАЙС</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/next.svg" />
      </Head> */
