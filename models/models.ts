//   JSON2ts    create interface

/*************************************** */


export interface IDevices {
  count: number;
  rows: IDevice[];
}

export interface IDevice {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  createdAt: string;
  updatedAt: string;
  typeId: number;
  brandId: number;
}


/************************************ */

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: IRating
}

export interface IRating {
  rate: number
  count: number
}