import clsx from "clsx"

interface IPaginationProps {
  limit: number
  page: number
  setPage: (arg0: number) => void
  count: number
}


export default function Pagination({ limit, page, setPage, count }: IPaginationProps) {
    const pageCount = Math.ceil(count / limit)
    const pages = []
    for(let i = 1; i <= pageCount; i++){
      pages.push(i)
    }
  return (
<nav aria-label="Page navigation example" className="mt-5">
  <ul className="flex items-center -space-x-px h-10 text-base justify-center gap-1 ">
    <li>
      <a 
          onClick={() => {
            if(page > 1){
            setPage(page - 1)
            }
          }}
          href="#" 
          className={clsx(page <= 1 && "opacity-20", "flex  items-center justify-center px-10  md:px-4 h-10 ml-0 leading-tight text-gray-700 bg-gray-300  border border-gray-800 rounded-l-lg hover:bg-white hover:text-gray-900 border-l-black")}>
        <span className="sr-only">Previous</span>
        <svg className="w-3 h-3" aria-hidden ="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
        </svg>
      </a>
    </li>
    <li className="hidden md:flex md:gap-1 ">
        {pages && pages.map(pageNumber => (
          <a 
          onClick={() => {
            setPage(pageNumber)}}
          key={pageNumber}
          href="#" 
          className={clsx(page === pageNumber ? "bg-black text-white border-y-black border-x-gray-300 border-4" : "bg-gray-300 text-gray-700 ",  " border-gray-800 flex items-center justify-center px-4 h-10 leading-tight  border  hover:bg-white hover:text-gray-900 ")}>
          {pageNumber}
      </a>
        ))}
    </li> 
    <li>
      <a
          onClick={() => {
            if(page < pages.length){
              setPage(page + 1)
            }
          }}
      href="#" 
      className={clsx(page >= pages.length && "opacity-20", "flex items-center justify-center px-10     md:px-4  h-10 ml-0 leading-tight text-gray-700  border border-gray-800 rounded-r-lg bg-gray-300 hover:bg-white hover:text-gray-900 ")}>
        <span className="sr-only">Next</span>
        <svg className="w-3 h-3" aria-hidden ="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </li>
  </ul>
</nav>
  )
}
