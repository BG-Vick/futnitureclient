

/************************** */

export interface IQuery {
  limit: number
  page: number
  brandId: number | ""
  typeId: number | ""
  name: string
}

/******************************************************************* */

export interface IUser {
  id: number | null
  email: string
  role: string
}



/************************** */
export interface IProducts {
  count: number;
  rows: IProduct[];
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  createdAt: string;
  updatedAt: string;
  typeId: number;
  brandId: number;
  info?: IInfo[] 
}


/************************************ */
export interface ICart {
  count: number
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


export interface IAddDeviceFormInput {
  selectedType: string
  selectedBrand: string
  name: string
  price: string
  art: string
  file: any
}

export interface IBrand {
  id: number
  name: string
}

export interface IType {
  id: number
  name: string
}

export interface IInfo {
  title: string
  description: string
  number?: number 
  id?: number 
}