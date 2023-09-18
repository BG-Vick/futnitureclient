//   JSON2ts    create interface

/************************** */
//    КОСТЫЛЬ ПЕРЕДАЮ ПУСТУЮ СТРОКУ ЧТОБЫ НА СЕРВЕРЕ ОНА БЫЛА FALSE
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