import { DeviceComponent } from '@/components/DeviceComponent'
import { useGetAllDevicesQuery, useGetOneDeviceQuery } from '@/store/api/DevicesService'
import Head from 'next/head'




export default function Device() {


  return (
    <DeviceComponent/>
  )
}

