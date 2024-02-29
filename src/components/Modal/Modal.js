import React, { useEffect, useState } from 'react'
import { X } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router'

const Modal = ({ changeShow, show, children }) => {

    const [isModal, setModal] = useState(show)
    const navigate = useNavigate()

    useEffect(() => {
        if (show !== null && show !== false) {
            setModal(true)
        }
    }, [show])

    return (
        isModal && (
            <div className='fixed w-full h-full top-0 left-0'>
                <div className='fixed bg-white rounded-xl w-[60%] min-h-32 h-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 z-10'>
                    <div className='border-b border-gray-200 w-full flex justify-between pb-2'>
                        <h2 className='text-xl'>Error</h2>
                        <button className='text-gray-600 hover:text-gray-300 transition duration-200' onClick={() => { changeShow(false); setModal(false); navigate('/'); }}><X size={22} /></button>
                    </div>
                    <div className='w-full h-max'>
                        <p className='text-lg pt-1'>{children}</p>
                    </div>
                </div>
                <div className='fixed w-full h-full top-0 left-0 bg-black/40 z-1' ></div>
            </div>
        )
    )
}

export default Modal