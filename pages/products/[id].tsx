/* eslint-disable @next/next/no-img-element */
import axios from "axios"
import Image from "next/image"



export const getStaticPaths = async () => {
  const res = await axios.get('http://localhost:7000/api/device')
  console.log(res)
  const data = res.data.rows
  const paths = data.map(({ id }: any) => ({
    params: {id: id.toString()},
  })) 
return { 
  paths,
  fallback: false  // Error handling
}
}

export const getStaticProps = async (ctx: any) => {
  const { id } = ctx.params
  const res = await axios.get(`http://localhost:7000/api/device/${id}`)
  const product = res.data
  
return { props: { product }
}
} 


const OneProduct = ({product}: any) => {
    console.log(product)
    return (
      <div>
        {product.name}
      </div>
    )
  };
  
  export default OneProduct;



  /* 
  
  <div>NAME: {product.name}</div>
      <div>PRICE: {product.price}</div>
      <img
      src={`http://localhost:7000/${product.img}`}
      width={100}
      height={100}
      alt={product.img}
    />
  
  */