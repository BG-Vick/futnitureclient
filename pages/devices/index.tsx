import { useGetAllDevicesQuery } from '@/services/DevicesService'
import Head from 'next/head'

export default function Devices() {

  const { data, error, isLoading } = useGetAllDevicesQuery(2)
  const devices = data?.rows
  if(devices) {
   console.log( devices[0].img)
  }
  return (
    <>
      <Head>
        <title>Мебель 08 | ГЛАВНАЯ СТРАНИЦА</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/next.svg" />
      </Head>
      <div>AUTH PAGE </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong!</div>}
      <div>
        {devices?.map((device) => (
          <div className='border-2 border-teal-300' key={device.id}>
            <p>{device.name}</p>
            <p>{device.price}</p>
            <p>{device.id}</p>
          </div>
        ))}
      </div>
    </>
  )
}

