import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Box from '../components/Box/Box'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loading from '../components/Loading/Loading'

const Contact = () => {

    const userContext = useContext(UserContext)

    const param = useParams()
    const navigate = useNavigate()
    const date = new Date()
    const [data, setData] = useState([])

    useEffect(() => {
        if (param.id) {
            userContext.getSpecificUser(param.id)
        } else {
            navigate('/')
        }
    }, [navigate, param.id, userContext])

    useEffect(() => {
        setData(userContext.specificUser)
    }, [userContext.specificUser])

    return (
        <Loading condition={data}>
            <div className='w-full h-screen flex items-start'>
                <Box className={'mt-8 md:mt-16 mx-5 md:mx-10 lg:mx-32'}>
                    <Link className='flex' to={'/'}><ArrowLeft className='mr-2' size={25} />Go Back</Link>
                    <div className='flex flex-col mt-4'>
                        <div className='flex'>
                            <LazyLoadImage effect='blur' src={data?.avatar ? data.avatar : '/images/user.png'} className='w-64 h-64 object-cover rounded-full' alt='...' />
                            <div className='w-full flex flex-col flex-wrap ml-7 mt-3 leading-10'>
                                <h2 className='text-xl'>{data?.first_name + ' ' + data?.last_name}</h2>
                                <p>{data?.gender}</p>
                                <p>Phone: {data?.phone}</p>
                                <p>{data?.email}</p>
                                <p>Telegram: <a href={`https://t.me/${data?.telegram}`}>@{data?.telegram}</a></p>
                                <p>Created at: {date.getFullYear(data?.createdAt)} / {date.getMonth(data?.createdAt)} / {date.getDate(data?.createdAt)}</p>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <p className='text-lg'>{data?.note}</p>
                        </div>
                    </div>
                </Box>
            </div>
        </Loading>
    )
}

export default Contact