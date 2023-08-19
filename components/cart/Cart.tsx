import { useActions } from '@/hooks/redux'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { IProduct } from '@/models/models'
import React, { useState } from 'react'
import Image from 'next/image'


export function Cart() {
  const { removeItem } = useActions()
  const cart = useTypedSelector(state => state.cart)

  return (
    <>
    <div>CART</div>
    <div>{cart.map((product) => (
      <div className='border-2 border-teal-400' key={product.id}>
        <h1>{product.id}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <div className='w-10 h-10 ml-44'><Image
          src={product.image}
          width={500}
          height={500}
          alt="Picture of the author"
        /></div>
        <button onClick={() => removeItem(product)} > ROMOVE </button>
      </div>
    ))}</div>
    </>
    
  )
}
