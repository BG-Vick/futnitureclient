import axios from 'axios'
import { useState, useRef } from 'react'

const initialState = {
  name: '',
  price: 0,
  rating: 0,
  img: null,
  brandId: 0,
  typeId: 0,
}

export function Form() {
  const [deviceState, setDeviceState] = useState(initialState)
  const [image, setImage] = useState()
  console.log(image)
  const inputRef = useRef(null)

  /*     setSelectedFile(e.target.files[0])
   */

  async function handleSubmit(e: any) {

    e.preventDefault()
    console.log(deviceState)
    //post  { body: form-data: post  { body: form-data: name, price, rating, img, brandId, typeId}
    /*     const formData = new FormData()
    formData.append('name', 'MY NDUYEN NAME FOR HUZEMBA')
    formData.append('price', '345677')
    formData.append('rating', '0')
    formData.append('img', selectedFile)
    formData.append('brandId', '1')
    formData.append('typeId', '1')

    const config = {
      headers: { 'content-type': 'multipart/form-data' },
    }

    axios
      .post('http://localhost:7000/api/device', formData, config)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      }) */
  }
  
  
  return (
    <>
      <label className="border-2 border-red-300 mr-5">
        <input
          accept="image/gif, image/jpeg, image/png"
          type="file"
          onChange={(e: any) => {
           console.log(e.target.files)
        }}
        />{' '}
      </label>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="border-2 border-red-300 mr-5">
          Enter name:
          <input
            type="text"
            value={deviceState.name}
            onChange={(e) =>
              setDeviceState({ ...deviceState, name: e.target.value })
            }
          />
        </label>
        <label className="border-2 border-red-300 mr-5">
          Enter price:
          <input
            type="number"
            value={deviceState.price}
            onChange={(e) =>
              setDeviceState({ ...deviceState, price: +e.target.value })
            }
          />
        </label>
        <label className="border-2 border-red-300 mr-5">
          Enter brandId:
          <input
            type="number"
            value={deviceState.brandId}
            onChange={(e) =>
              setDeviceState({ ...deviceState, brandId: +e.target.value })
            }
          />
        </label>
        <label className="border-2 border-red-300 mr-5">
          Enter typeId:
          <input
            type="number"
            value={deviceState.typeId}
            onChange={(e) =>
              setDeviceState({ ...deviceState, typeId: +e.target.value })
            }
          />
        </label>
        <input type="submit" />
      </form>
    </>
  )
}
