import { useState } from 'react'
import { AiOutlineCaretUp,  AiOutlineCaretDown} from 'react-icons/ai'
export default function index() {
    

    return(
        <div className="h-screen grid place-items-center bg-blue-600">
            <DropDown>
                {list.map((item, i) =>(
                    <div key={item.city} 
                    className='flex w-full justify-between p-4 hover:bg-blue-100 cursor-pointer rounded-r-lg border-l-transparent
                                hover:border-l-white border-l-4
                    '>
                        <h3 className='font-bold' >{item.city}</h3>
                        <h3>{item.emoticon}</h3>
                    </div>
                ))}
            </DropDown>
        </div>
    )
}

export function DropDown({children, isOpen, setIsOpen}) {
    
  return (
    <div className="relative flex flex-col items-center w-[340px] h-[340px] rounded-lg ">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-pink-400 p-4 w-full flex items-center justify-between font-bold 
        text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300
         active:text-white
      ">dropdown
      {!isOpen ? (
        <AiOutlineCaretDown className='h-8'/>
      ): (
        <AiOutlineCaretUp className='h-8'/>
      )}
      </button>
      {isOpen && (
        <div className='bg-pink-400 absolute top-20 flex flex-col items-start rounded-lg p-2 w-full'>
            {children}
        </div>
      )}
    </div>
  )
}














const list = 
[
    {
        "city" : "NYC",
        "emoticon": "+"
    },
    {
        "city" : "LA",
        "emoticon": "+"
    },
    {
        "city" : "CHICAGO",
        "emoticon": "+"
    },
    {
        "city" : "NJ",
        "emoticon": "+"
    }
]