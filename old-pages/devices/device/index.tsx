import { DeviceComponent } from '@/components/DeviceComponent'
import { useGetAllDevicesQuery, useGetOneDeviceQuery } from '@/store/services/DevicesService'
import Head from 'next/head'




export default function Device() {


  return (
    <DeviceComponent/>
  )
}

