// @ts-nocheck
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'
import Product from '@/components/Product'
import { getAllProducts } from '@/store/typesApi'
import { useState, useEffect, useRef } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { wrapper } from '@/store/store'
import { setProductState } from '@/store/reducers/productSlice'
import { useDispatch } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiFilter } from 'react-icons/bi'
import { fetchBrands, fetchTypes } from '@/store/typesApi'
import clsx from 'clsx'
import Head from 'next/head'
import { IBrand, IProduct, IProducts, IType } from '@/models/models'
import type { GetServerSideProps } from 'next'

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
      const initialTypes = await fetchTypes()
      const initialBrands = await fetchBrands()
      return {
        props: {
          count: data.count,
          propsTypes: initialTypes,
          propsBrands: initialBrands
        },
      }
    } catch (e) {
      return { props: {} }
    }
    return { props: {} }
  })

interface IProductsPage {
  count: number
  propsTypes: IType[]
  propsBrands: IBrand[]
}

const Products = ({ count, propsTypes, propsBrands}: IProductsPage) => {
  const [countState, setCountState] = useState(count)
  const [typeIdState, setTypeIdState] = useState<string | number>('')
  const [brandIdState, setBrandIdState] = useState<string | number>('')
  const [search, setSearch] = useState('')
  const [types, setTypes] = useState<IType[]>(propsTypes)
  const [brands, setBrands] = useState<IBrand[]>(propsBrands)
  const [screen, setScreen] = useState(0)
  const [typesActive, setTypesActive] = useState(false)
  const [brandsActive, setBrandsActive] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [dropdownActive, setDropdownActive] = useState(false)
  const [refreshPage, setRefreshPage] = useState(true)
  const products: IProduct[] = useTypedSelector((state) => state.product)
  const dispatch = useDispatch()
  const ref = useRef(1)

  useEffect(() => {
    setScreen(window.innerWidth)
  }, [])

  useEffect(() => {
    if (ref.current > 2) {
      if (search) {
        setRefreshPage(false)
        setTypeIdState('')
        setBrandIdState('')
        setPage(1)
        const debounce = setTimeout(() => {
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
      if (page === 1 && refreshPage === false) {
        return
      } else {
        setRefreshPage(true)
        if (!brandIdState && !typeIdState && !search) {
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

        if (!brandIdState && !typeIdState && search) {
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

        if (!typeIdState && !search && brandIdState) {
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

        if (!brandIdState && !search && typeIdState) {
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
    // eslint-disable-next-line
  }, [page])

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
    setCountState(data.count)
    dispatch(setProductState(data.rows))
  }

  if (!products) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Head>
        <title>Одежда Элиста | купить одежду в Элисте</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
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
                <BiFilter 
                onClick={() => {
                  if(types && brands)setDropdownActive(!dropdownActive)
                  }} 
                className="w-10 h-10" />
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
                          {types.map((type) => {
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
                          {brands.map((brand) => {
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
                      <p className=" text-center my-6">Категории товаров</p>
                      <div className="flex gap-4 justify-center mt-4 flex-wrap ">
                        {types.map((type) => {
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
                      <p className=" text-center my-6">Магазины</p>
                      <div className="flex gap-4 justify-center flex-wrap ">
                        {brands.map((brand) => {
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
              {products.map((product) => {
                return (
                  <Product
                    types={types}
                    brands={brands}
                    key={product.id}
                    product={product}
                  />
                )
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
