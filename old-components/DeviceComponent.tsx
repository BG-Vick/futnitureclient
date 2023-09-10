import { useGetAllDevicesQuery, useGetOneDeviceQuery } from '@/store/api/DevicesService'
import Head from 'next/head'

export function DeviceComponent() {
  const { data, error, isLoading } = useGetOneDeviceQuery(32)  //32 ;33 ; 34/ 35
  

  return (
    <>
      <Head>
        <title>Мебель 08 | ОДИН ДЕВАЙС</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/next.svg" />
      </Head>
      <div>ONE DEVICE </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong!</div>}
      {data &&
          <div className='border-2 border-teal-300' key={data.id}>
            <p>{data.name}</p>
            <p>{data.price}</p>
          </div>
        }
    </>
  )
}


