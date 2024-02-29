import React from 'react'
import { Search } from 'react-bootstrap-icons'

const SearchInput = ({ value, setValue }) => {
    return (
        <div className='bg-black/40 rounded-lg flex items-center'>
            <input placeholder='Search...' className='outline-none border-none text-white py-2 px-2 bg-transparent w-full shrink' type='text' value={value} onChange={setValue} />
            <Search className='mx-3' size={18} />
        </div>
    )
}

export default SearchInput