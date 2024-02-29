import React from 'react'
import { ChevronRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Card = ({ className, firstName, lastName, phoneNumber, image, id }) => {
    return (
        <Link to={`/Contact/${id}`}  className={`${className} w-full h-max border-b border-gray-400 cursor-pointer group relative`}>
            <div className='bg-black/10 absolute rounded w-full h-full opacity-0 transition-all duration-150 group-hover:opacity-100'></div>
            <div className='flex justify-start items-center p-4'>
                <LazyLoadImage effect='blur' className='w-24 h-24 rounded-full object-cover rounded-full' src={image ? image : '/images/user.png'} alt='...' />
                <div className='w-full flex justify-between ml-3'>
                    <div>
                        <h1 className='text-xl'>{firstName + ' ' + lastName}</h1>
                        <span className='text-sm text-gray-300'>{phoneNumber}</span>
                    </div>
                    <div className={`w-9 h-9 bg-black/30 rounded-full flex items-center justify-center transition duration-150 group-hover:translate-x-2`}>
                        <ChevronRight className='font-bold' />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card