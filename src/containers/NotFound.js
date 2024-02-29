import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '../components/Box/Box'

const NotFound = () => {


    const navigate = useNavigate()
    const [timer, setTimer] = useState(5)

    setTimeout(() => {
        setTimer((timer) => timer > 0 ? timer - 1 : timer)
    }, 1000)

    useEffect(() => {
        setTimeout(() => {
            setTimeout(() => {
                navigate('/')
            }, 500)
        }, 5000)
    }, [navigate])

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <Box className={'flex flex-col mt-8 md:mt-16 mx-5 md:mx-10 lg:mx-32 py-32'}>
                <div className='text-center'>
                    <h1 className='text-5xl mb-10'>Not Found!</h1>
                    <span className='text-xl'>Click <Link to={'/'} className='text-blue-700'>here</Link> to go to homepage!</span>
                    <br />
                    <span className='mt-3'>Or you will be redirected in {timer}</span>
                </div>
            </Box>
        </div>

    )
}

export default NotFound