import React, { useState } from 'react'
import { useActions } from '@/hooks/redux'




const initialState = {
  id: Date.now(),
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0
  }
}



export default function Admin() {
  const [cartState, setCartState] = useState(initialState);
  const {addItem, removeItem, } = useActions()

  function handleSubmit(event: React.SyntheticEvent) {
    event?.preventDefault()
    addItem(cartState)
    setCartState(initialState)
  }
  return (
    <div>
      ADMIN PANEL

      <div>
      <form className='flex' onSubmit={handleSubmit}>
      <label className='border-2 border-red-300 mr-5' >Enter title:
        <input 
          type="text" 
          value={cartState.title}
          onChange={(e) => setCartState({...cartState, title: e.target.value})}
        />
      </label>
      <label className='border-2 border-red-300 mr-5' >Enter price:
        <input 
          type="number" 
          value={cartState.price}
          onChange={(e) => setCartState({...cartState, price: +( e.target.value)})}
        />
      </label>
      <label className='border-2 border-red-300 mr-5' >Enter description:
        <input 
          type="text" 
          value={cartState.description}
          onChange={(e) => setCartState({...cartState, description: e.target.value})}
        />
      </label>
      <input type="submit" />
    </form>
      </div>
    </div>
  )
}
