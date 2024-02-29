import React from 'react'
import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'

const PaginationHandler = ({ data, recordsPerPage, currentPage, setCurrentPage }) => {
    const nPage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(nPage + 1).keys()].slice(1)


    return (
        <div className='flex items-center' color="dark">
            <button className='bg-black/50 w-9 h-9 rounded-full flex items-center justify-center' onClick={() => currentPage !== 1 ? setCurrentPage(currentPage - 1) : []} ><ChevronLeft /></button>
            {numbers.map((item) => {
                if (currentPage === item || item === currentPage + 1 || item === currentPage - 1) {
                    return <button onClick={() => setCurrentPage(item)} className={`${currentPage === item ? 'bg-black/50' : ''} rounded-full w-9 h-9 flex-items-center justify-center mx-1`} key={item}>{item}</button>
                }
            })}
            <button className='bg-black/50 w-9 h-9 rounded-full flex items-center justify-center' onClick={() => currentPage !== nPage ? setCurrentPage(currentPage + 1) : []} ><ChevronRight /></button>
        </div>
    )
}

export default PaginationHandler