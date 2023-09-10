import { useGetAllDevicesQuery } from '@/store/api/DevicesService'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Devices() {
  // ВРЕМЕННЫЙ КОСТЫЛЬ ДЛЯ brandId and typeId нужно решить чтобы они по умолчанию не передавались
  const { data, error, isLoading } = useGetAllDevicesQuery({limit: 20, page: 1, brandId: "", typeId: ""})
  const devices = data?.rows
  console.log( devices)
  console.log(devices)
  const router = useRouter()


  return (
    <>
      <Head>
        <title>Мебель 08 | ДЕВАЙСЫ</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/next.svg" />
      </Head>
      <div>Devices </div>
      
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong!</div>}
      <div>
      <div className="bg-white">
<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
  <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
    {devices?.map((device) => (
      <div key={device.id} className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={`http://localhost:7000/${device.img}`}
            alt={`http://localhost:7000 + ${device.img}`}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              
                <span aria-hidden="true" className="absolute inset-0" />
                {device.name}

            </h3>
          
          </div>
          <p className="text-sm font-medium text-gray-900">{device.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

        <div className='border-2 border-teal-950 mt-4 w-16'>
        <Link href='/devices/device' legacyBehavior passHref> ОДИН ДЕВАЙС</Link>
        </div>
      </div>
    </>
  )
}

